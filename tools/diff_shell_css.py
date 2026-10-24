#!/usr/bin/env python3
"""Diff the shared shell rules of the two travel stylesheets (STYLE-PLAN.md D4, step 4).

Run from the repo root:  python3 tools/diff_shell_css.py > out.md

Compares styles/map-list.css (cafe, bakery) with styles/noosa.css rule by rule.
A rule is keyed by its at-rule context (e.g. "@media (max-width: 767px)") and
one selector; comma lists are split so grouping differences do not hide matches.
Noosa's old color aliases (--orange, --blue-d, ...) are rewritten to the real
token names first, so a rule that only differs by alias counts as identical.
Token blocks (:root ...) are skipped: tokens.css replaces both.

Prints a Markdown report: identical rules, rules that differ (declaration by
declaration), and rules found in only one file. Line numbers point at the
rule's selector in each source file.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MAP_LIST = ROOT / "styles" / "map-list.css"
NOOSA = ROOT / "styles" / "noosa.css"

# styles/noosa.css :root aliases -> the tokens they point at.
ALIASES = {
    "--orange-d": "--color-accent-strong", "--orange-l": "--color-accent-border",
    "--orange-bg": "--color-accent-soft", "--orange": "--color-accent",
    "--blue-d": "--color-primary-strong", "--blue-l": "--color-primary-border",
    "--blue-bg": "--color-primary-soft", "--blue": "--color-primary",
    "--green-d": "--color-secondary-strong", "--green-l": "--color-secondary-border",
    "--green-bg": "--color-secondary-soft", "--green": "--color-secondary",
    "--purple": "--color-violet", "--gray": "--color-text-soft",
    "--text-s": "--color-text-muted", "--text": "--color-text",
    "--border": "--color-border", "--bg": "--color-surface-soft",
}
ALIAS_RE = re.compile(r"var\((" + "|".join(re.escape(k) for k in ALIASES) + r")\)")


def strip_comments(css):
    # Keep newlines so line numbers survive.
    return re.sub(r"/\*.*?\*/", lambda m: "\n" * m.group(0).count("\n"), css, flags=re.S)


def norm_value(value):
    value = ALIAS_RE.sub(lambda m: "var(" + ALIASES[m.group(1)] + ")", value)
    value = re.sub(r"\s+", " ", value.strip())
    return re.sub(r",\s*", ", ", value)


def parse(path):
    """Return {(context, selector): (line, {prop: value})}."""
    css = strip_comments(path.read_text(encoding="utf-8"))
    rules = {}
    pos = 0
    stack = []  # open at-rule contexts

    def line_at(i):
        return css.count("\n", 0, i) + 1

    while pos < len(css):
        brace = css.find("{", pos)
        close = css.find("}", pos)
        if close != -1 and (brace == -1 or close < brace):
            if stack:
                stack.pop()
            pos = close + 1
            continue
        if brace == -1:
            break
        head = css[pos:brace].strip()
        head_start = pos + (len(css[pos:brace]) - len(css[pos:brace].lstrip()))
        if head.startswith("@keyframes"):
            end = brace + 1
            depth = 1
            while depth:
                depth += {"{": 1, "}": -1}.get(css[end], 0)
                end += 1
            rules[(" ".join(stack), re.sub(r"\s+", " ", head))] = (
                line_at(head_start), {"(body)": re.sub(r"\s+", " ", css[brace + 1:end - 1].strip())})
            pos = end
            continue
        if head.startswith("@"):
            stack.append(re.sub(r"\s+", " ", head))
            pos = brace + 1
            continue
        end = css.find("}", brace)
        body = css[brace + 1:end]
        decls = {}
        for part in body.split(";"):
            if ":" in part:
                prop, value = part.split(":", 1)
                decls[prop.strip()] = norm_value(value)
        context = " ".join(stack)
        for selector in head.split(","):
            selector = re.sub(r"\s+", " ", selector.strip())
            if selector.startswith(":root"):
                continue
            key = (context, selector)
            line, old = rules.get(key, (line_at(head_start), {}))
            merged = dict(old)
            merged.update(decls)
            rules[key] = (line, merged)
        pos = end + 1
    return rules


def label(key):
    context, selector = key
    return f"`{selector}`" + (f" in `{context}`" if context else "")


def main():
    a, b = parse(MAP_LIST), parse(NOOSA)
    same, differ = [], []
    for key in a:
        if key not in b:
            continue
        (la, da), (lb, db) = a[key], b[key]
        if da == db:
            same.append((key, la, lb))
        else:
            rows = []
            for prop in sorted(set(da) | set(db)):
                va, vb = da.get(prop, "—"), db.get(prop, "—")
                if va != vb:
                    rows.append((prop, va, vb))
            differ.append((key, la, lb, rows))
    only_a = [(k, a[k][0]) for k in a if k not in b]
    only_b = [(k, b[k][0]) for k in b if k not in a]

    out = sys.stdout
    out.write("# Travel shell CSS diff: map-list.css vs noosa.css\n\n")
    out.write(f"Rules compared: map-list {len(a)}, noosa {len(b)}. "
              f"Same in both: {len(same)}. Different: {len(differ)}. "
              f"Only map-list: {len(only_a)}. Only noosa: {len(only_b)}.\n\n")
    out.write("## Same in both\n\n| Rule | map-list | noosa |\n|---|---|---|\n")
    for key, la, lb in same:
        out.write(f"| {label(key)} | {la} | {lb} |\n")
    out.write("\n## Different\n\n")
    for key, la, lb, rows in differ:
        out.write(f"### {label(key)} (map-list :{la}, noosa :{lb})\n\n| Property | map-list | noosa |\n|---|---|---|\n")
        for prop, va, vb in rows:
            out.write(f"| `{prop}` | `{va}` | `{vb}` |\n")
        out.write("\n")
    out.write("## Only in map-list.css\n\n")
    out.write(", ".join(f"{label(k)} :{line}" for k, line in only_a) + "\n\n")
    out.write("## Only in noosa.css\n\n")
    out.write(", ".join(f"{label(k)} :{line}" for k, line in only_b) + "\n")


if __name__ == "__main__":
    main()
