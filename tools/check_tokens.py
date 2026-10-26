#!/usr/bin/env python3
"""Check styles/tokens.css and print its contrast list (archive/2026-10-style-plan/STYLE-PLAN.md step 2).

Run from the repo root:  python3 tools/check_tokens.py [--quiet]
Exit code 1 if a structural check fails, including a raw color value outside
tokens.css. Contrast results are printed as a Markdown table; failures are
marked but do not change the exit code, because some pairs are reported for
review rather than required to pass. --quiet prints only errors (pre-commit hook).

Contrast is WCAG 2 (sRGB relative luminance). Translucent colors are
composited over the surface they sit on before measuring.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TOKENS = ROOT / "styles" / "tokens.css"

# Files whose var(--...) uses must resolve once every page loads tokens.css.
USE_GLOBS = ["styles/*.css", "scripts/*.js", "index.html",
             "travel/**/*.html", "travel/**/*.js", "ai_report/**/*.html", "ai_report/**/*.js"]
# Page-local custom properties that are defined outside tokens.css on purpose.
LOCAL_OK = {
    "--token",  # placeholder in a comment in scripts/report-starlux.js
}
# The print block may differ from light only here (paper is white).
PRINT_ONLY = {"--color-bg", "--color-surface"}

# Raw colors outside tokens.css (DESIGN.md "Implementation Rules").
RAW_COLOR = re.compile(r"#[0-9a-fA-F]{3,8}\b|(?<![\w-])(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\(")
NAMED_COLOR = re.compile(r"(?<![\w-])(?:black|white|red|green|blue|yellow|orange|purple|pink|gray|grey|silver|"
                         r"maroon|navy|teal|olive|lime|aqua|cyan|fuchsia|magenta|brown|gold|beige|ivory|"
                         r"tomato|coral|salmon|crimson|indigo|violet)(?![\w-])", re.I)
# Masks read only alpha, so black/white there mean "show" / "hide", not a visible color.
MASK_PROPS = {"mask-image", "-webkit-mask-image", "mask", "-webkit-mask"}
# A JS string that is nothing but a color, e.g. '#fff' or "rgba(0,0,0,.5)".
JS_COLOR = re.compile(r"""(['"])\s*(?:#[0-9a-fA-F]{3,8}|(?:rgba?|hsla?)\([^'"]*\))\s*\1""")


def strip_comments(css):
    return re.sub(r"/\*.*?\*/", "", css, flags=re.S)


def blank_comments(text):
    """Remove /* */ comments but keep line numbers."""
    return re.sub(r"/\*.*?\*/", lambda m: re.sub(r"[^\n]", " ", m.group()), text, flags=re.S)


def color_in_value(prop, value):
    value = re.sub(r"""(['"]).*?\1|url\([^)]*\)""", "", value)  # quoted text and URLs are not colors
    if RAW_COLOR.search(value):
        return True
    return prop.lower() not in MASK_PROPS and bool(NAMED_COLOR.search(value))


def raw_colors_in_css(css, offset_line=0):
    """Yield (line, declaration) for each declaration whose value is a raw color."""
    css = blank_comments(css)
    for m in re.finditer(r"([\w-]+)\s*:\s*([^;{}]+)(?=[;}])", css):
        if color_in_value(m.group(1), m.group(2)):
            yield offset_line + css.count("\n", 0, m.start()) + 1, m.group().strip()


def raw_colors(path):
    text = path.read_text(encoding="utf-8")
    if path.suffix == ".css":
        yield from raw_colors_in_css(text)
    elif path.suffix == ".html":
        for m in re.finditer(r"<style[^>]*>(.*?)</style>", text, flags=re.S | re.I):
            yield from raw_colors_in_css(m.group(1), text.count("\n", 0, m.start(1)))
        for m in re.finditer(r"""\s(style|fill|stroke|color|bgcolor)=(['"])(.*?)\2""", text, flags=re.I):
            value = m.group(3) + ";" if m.group(1).lower() == "style" else f"{m.group(1)}:{m.group(3)};"
            for _, decl in raw_colors_in_css(value):
                yield text.count("\n", 0, m.start()) + 1, decl
    elif path.suffix == ".js":
        text = blank_comments(text)
        for m in JS_COLOR.finditer(text):
            yield text.count("\n", 0, m.start()) + 1, m.group()


def blocks(css):
    """Return {name: {prop: value}} for the four theme blocks."""
    css = strip_comments(css)
    out = {}
    patterns = {
        "light": r"(?<![\w\]\)-]):root\s*\{([^}]*)\}",
        "dark": r"(?<!,)\s:root\[data-theme=\"dark\"\]\s*\{([^}]*)\}",
        "system": r"@media \(prefers-color-scheme: dark\)\s*\{\s*:root:not\(\[data-theme\]\)\s*\{([^}]*)\}",
        "print": r"@media print\s*\{\s*:root,[^{]*\{([^}]*)\}",
    }
    for name, pat in patterns.items():
        m = re.search(pat, css)
        if not m:
            raise SystemExit(f"tokens.css: {name} block not found")
        out[name] = dict(re.findall(r"(--[\w-]+)\s*:\s*([^;]+);", m.group(1)))
    return out


def hex_rgb(v):
    v = v.strip().lstrip("#")
    if len(v) == 3:
        v = "".join(c * 2 for c in v)
    return tuple(int(v[i:i + 2], 16) for i in (0, 2, 4))


def lum(rgb):
    def ch(c):
        c /= 255
        return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4
    r, g, b = map(ch, rgb)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def ratio(a, b):
    la, lb = sorted((lum(a), lum(b)), reverse=True)
    return (la + 0.05) / (lb + 0.05)


def over(rgba, base):
    r, g, b, a = rgba
    return tuple(round(a * c + (1 - a) * d) for c, d in zip((r, g, b), base))


def structural(b):
    errors = []
    light, dark, system, prt = b["light"], b["dark"], b["system"], b["print"]
    if dark != system:
        diff = sorted(set(dark.items()) ^ set(system.items()))
        errors.append(f'[data-theme="dark"] and system dark differ: {diff}')
    color_keys = {k for k in light if k.startswith("--color-") or k.startswith("--shadow-")} - {
        "--color-on-scrim", "--color-print-bg"}
    themed = set(dark)
    if themed - set(light):
        errors.append(f"dark defines tokens light does not: {sorted(themed - set(light))}")
    missing_dark = {k for k in color_keys if k not in dark}
    if missing_dark:
        errors.append(f"light colors with no dark value: {sorted(missing_dark)}")
    missing_print = sorted(k for k in color_keys if k not in prt)
    if missing_print:
        errors.append(f"print block misses: {missing_print}")
    for k, v in prt.items():
        if k in PRINT_ONLY or k == "color-scheme":
            continue
        if light.get(k) != v:
            errors.append(f"print {k}: {v} != light {light.get(k)}")
    # var() references inside tokens must resolve and not loop.
    allvals = {**light, **dark}
    for k, v in allvals.items():
        seen, cur = {k}, v
        while (m := re.search(r"var\((--[\w-]+)", cur)):
            ref = m.group(1)
            if ref in seen:
                errors.append(f"cycle: {k} -> {ref}")
                break
            if ref not in allvals:
                errors.append(f"{k} uses undefined {ref}")
                break
            seen.add(ref)
            cur = allvals[ref]
    # Every var(--x) used on the site is defined here or listed as local.
    defined = set(light) | LOCAL_OK
    used = {}
    for g in USE_GLOBS:
        for p in ROOT.glob(g):
            if p == TOKENS:
                continue
            text = p.read_text(encoding="utf-8")
            for name in re.findall(r"var\(\s*(--[\w-]+)", text) + re.findall(r"colorVar:\s*\"(--[\w-]+)\"", text):
                used.setdefault(name, p.relative_to(ROOT).as_posix())
    for name, where in sorted(used.items()):
        if name not in defined:
            errors.append(f"{where} uses {name}, not defined in tokens.css")
    # No raw color values outside tokens.css.
    for g in USE_GLOBS:
        for p in sorted(ROOT.glob(g)):
            if p == TOKENS:
                continue
            for line, decl in raw_colors(p):
                errors.append(f"{p.relative_to(ROOT).as_posix()}:{line} raw color, use a token: {decl}")
    return errors, len(used)


def contrast(b):
    """Yield (group, label, fg, bg, need, ratio_light, ratio_dark)."""
    # Dark only overrides some tokens; the rest are inherited from :root.
    themes = {"light": b["light"], "dark": {**b["light"], **b["dark"]}}

    def col(t, name):
        return hex_rgb(themes[t][name])

    texts = ["--color-text", "--color-text-muted", "--color-text-soft", "--color-primary-strong",
             "--color-secondary-strong", "--color-accent-strong", "--color-warning-text",
             "--color-violet", "--color-error"]
    surfaces = ["--color-bg", "--color-surface", "--color-surface-soft", "--color-surface-warm"]
    rows = []

    def add(group, fg, bg, need, label=None, fgf=None, bgf=None):
        r = []
        for t in ("light", "dark"):
            f = fgf(t) if fgf else col(t, fg)
            k = bgf(t) if bgf else col(t, bg)
            r.append(ratio(f, k))
        rows.append((group, label or f"`{fg}` on `{bg}`", need, *r))

    for bg in surfaces:
        for fg in texts:
            add("1 文字／頁面與卡片底", fg, bg, 4.5)
    for fam, fg in [("primary", "--color-primary-strong"), ("secondary", "--color-secondary-strong"),
                    ("accent", "--color-accent-strong"), ("warm", "--color-warning-text"),
                    ("violet", "--color-violet")]:
        for f in (fg, "--color-text", "--color-text-muted"):
            add("2 文字／淡色底（tag、chip、提示框）", f, f"--color-{fam}-soft", 4.5)
    for fg, bg in [("--color-on-primary", "--color-primary"), ("--color-on-primary", "--color-primary-strong"),
                   ("--color-on-secondary", "--color-secondary"),
                   ("--color-on-accent", "--color-accent-strong")]:  # solid coral always uses -strong
        add("3 實心按鈕、active chip", fg, bg, 4.5)
    # Chart value labels use --color-text since step 6 (C.9 #4), covered by group 1.
    # Chart marks sit on the chart card (--color-surface-soft); the misses are a
    # known issue left for the chart redesign (archive/2026-10-style-plan/STYLE-PLAN.md section 6).
    for fg in ["--color-primary", "--color-secondary", "--color-accent", "--color-warm"]:
        add("5 報告圖表：長條、折線、圖例色塊（非文字，已知問題）", fg, "--color-surface-soft", 3.0)
    for bg in surfaces:
        add("6 focus 外框（非文字）", "--color-primary", bg, 3.0)
    for fg, bg in [("--color-border", "--color-bg"), ("--color-border", "--color-surface"),
                   ("--color-primary-border", "--color-surface"), ("--color-accent-border", "--color-surface"),
                   ("--color-secondary-border", "--color-surface")]:
        add("7 元件邊界（非文字，參考用）", fg, bg, 3.0)
    # Hover state layers: the content color at --state-hover, composited over the card surface.
    alpha = float(b["light"]["--state-hover"].rstrip("%")) / 100
    for tint, where in [("--color-accent", "`.tl-item:hover`"),
                        ("--color-text-muted", "`.tl-item-transit:hover`")]:
        for fg in ["--color-text", "--color-text-muted", "--color-text-soft"]:
            add("8 hover 狀態層（先合成在 surface 上）", fg, None, 4.5,
                label=f"`{fg}` on {where}（`{tint}` {alpha:.0%}）",
                bgf=lambda t, tint=tint: over((*col(t, tint), alpha), col(t, "--color-surface")))
    # Buttons with --state-layer-hover: their own text color at --state-hover over their own background.
    for fg, bg, where in [("--color-primary-strong", "--color-primary-soft", "Noosa 地點／連結、清單 `.pill-map`"),
                          ("--color-secondary-strong", "--color-secondary-soft", "Noosa 第 2 天地點／連結"),
                          ("--color-text", "--color-surface", "篩選、捲動、回到頂端"),
                          ("--color-text", "--color-surface-soft", "清單 `.pill-social`"),
                          ("--color-on-accent", "--color-accent-strong", "選中的篩選按鈕")]:
        add("8 hover 狀態層（先合成在 surface 上）", fg, None, 4.5,
            label=f"`{fg}` on `{bg}` + 自身文字色 {alpha:.0%}（{where}）",
            bgf=lambda t, fg=fg, bg=bg: over((*col(t, fg), alpha), col(t, bg)))
    scrim = lambda t: over((0, 0, 0, 0.88), col(t, "--color-bg"))
    add("9 燈箱", "--color-on-scrim", None, 4.5, label="`--color-on-scrim` on `--scrim`（合成在 bg 上）", bgf=scrim)
    add("9 燈箱", "--color-on-scrim", None, 4.5, label=f"`--color-on-scrim` on `.lightbox-close:hover`（{alpha:.0%}）",
        bgf=lambda t: over((*col(t, "--color-on-scrim"), alpha), scrim(t)))
    return rows


def main():
    b = blocks(TOKENS.read_text(encoding="utf-8"))
    errors, n_used = structural(b)
    if "--quiet" in sys.argv:
        for e in errors:
            print("ERROR", e)
        sys.exit(1 if errors else 0)
    print(f"tokens: light {len(b['light'])}, dark {len(b['dark'])}, system {len(b['system'])}, print {len(b['print'])}; "
          f"site var() names checked: {n_used}")
    for e in errors:
        print("ERROR", e)
    print()
    print("| 組別 | 配對 | 門檻 | 淺色 | 深色 |")
    print("|---|---|---|---|---|")
    fails = 0
    for group, label, need, rl, rd in contrast(b):
        def cell(r):
            return f"{r:.2f}" + ("" if r >= need else " ❌")
        fails += (rl < need) + (rd < need)
        print(f"| {group} | {label} | {need:g} | {cell(rl)} | {cell(rd)} |")
    print(f"\n未達門檻：{fails} 格")
    sys.exit(1 if errors else 0)


if __name__ == "__main__":
    main()
