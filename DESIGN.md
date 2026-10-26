# Design System - loveu8.github.io

## Product Context
- **What this is:** Personal static website with travel itinerary pages, map embeds, timeline content, photos, route chips, and print-friendly views.
- **Who it is for:** The site owner and invited readers who need quick, clear trip information on mobile and desktop.
- **Project type:** Static travel utility site, closer to a compact planning app than a marketing page.
- **Design priority:** Information must stay readable and scannable first. Color adds warmth and memory, but should never compete with maps, photos, times, or navigation links.
- **Pages:** the homepage (`index.html`), the travel app pages (Noosa itinerary, Brisbane cafe and bakery maps) and the STARLUX research report. They look like one site: same tokens, fonts, toggles and header behaviour (`STYLE-PLAN.md`, 2026-10).
- **Shared files:** every page loads `styles/tokens.css` → `styles/base.css` → (travel pages) `styles/app-shell.css` → its own page CSS, and `scripts/site.js` before its own script. `site.js` owns the theme (`theme`: `light`/`dark`, absent = follow the system), the language (`lang`: `zh-TW`/`en`; URL `?lang=` → remembered value → browser language) and the two header toggles (`data-toggle="theme"` / `data-toggle="lang"`). Every page header has「阿星」top left linking to the homepage.

## Aesthetic Direction
- **Direction:** Google clarity with Instagram warmth.
- **Mood:** Clean, bright, useful, image-friendly, and slightly social. The site should feel like a polished personal travel planner, not a generic admin panel and not a loud social feed.
- **Decoration level:** Intentional. Use color, subtle shadows, photo thumbnails, and small accent moments. Avoid heavy gradients, decorative blobs, and excessive glass effects.
- **Design references:** Use Google-style hierarchy for structure, spacing, state colors, and legibility. Use Instagram-style warmth only as accent color, photo treatment, and small highlight moments.

## Core Principles
- **Clarity before emotion:** Times, locations, route actions, warnings, and costs must be readable at a glance.
- **Color has jobs:** Blue means navigation or map movement. Green means nature, hikes, or success. Coral means highlight, food, warmth, or primary action. Violet is rare and reserved for stay/rest/special moments.
- **Photos carry the expressive side:** Do not make the UI itself overly colorful. Let travel photos provide texture and mood.
- **Dark mode is redesigned, not inverted:** Dark mode should use darker surfaces, softer borders, and slightly muted accents. Do not simply invert light colors.

## Typography
- **Primary font stack:** `"Open Sans", "Noto Sans TC", -apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft JhengHei", "PingFang TC", sans-serif`, loaded from Google Fonts (`Open Sans` for Latin/numerals, `Noto Sans TC` for Traditional Chinese — Open Sans has no CJK glyphs, so pairing with Noto Sans TC is required for the Chinese majority of this site's content to actually render consistently, not just the English/numbers).
- **Why a web font instead of the system stack:** The old system-font stack (`-apple-system`/`Segoe UI`/`PingFang TC`/...) intentionally rendered differently per OS. That's fine for an app chrome, but this site wanted the same typeface on every device for a consistent presentation, so the tradeoff flipped to "download one web font, look identical everywhere."
- **Fallback:** The old system-font stack remains after the two web fonts, so the page still renders reasonably if Google Fonts fails to load (e.g. offline).
- **Font URL:** one Google Fonts URL on every page, both families at weights 400/500/600/700/800. Browsers only download the weights a page actually uses, so listing more weights costs nothing.
- **Weights:** 400 body · 500 secondary emphasis · 600 small labels, chips, times · 700 h2/h3, buttons, UI labels · 800 h1, brand, big numbers. Do not use 650 or 750: they are not loaded and render as 700 / 800 anyway.
- **Body:** line height 1.55-1.7.
- **Numbers / times:** Same stack with `font-variant-numeric: tabular-nums`.
- **Rule:** Do not add decorative fonts. This is a utility-first travel page, and Chinese text must render cleanly across devices.

## Type Scale
- **Tokens:** `--fs-2xs` 12 · `--fs-xs` 13 · `--fs-sm` 14 · `--fs-base` 16 · `--fs-md` 18 · `--fs-lg` 20 · `--fs-xl` 26px, defined in `styles/tokens.css`. Use the tokens, not px values.
- **Fixed, not fluid:** sizes do not scale with the viewport. 12px is the smallest text on screen.
- **Typical use:** h1 `xl` · h2 `lg` · h3 and the brand `md` · body `base` · secondary text `sm` · meta, captions, toggle labels `xs`/`2xs`.
- **Exceptions (STARLUX report only):** the cover title (`clamp(24px, 5vw, 32px)`) and the big stat number (`clamp(26px, 6vw, 34px)`) are larger than the scale and keep their viewport scaling; chapter headings scale between two tokens (`clamp(var(--fs-lg), 3.8vw, var(--fs-xl))`). Chart text is written in SVG viewBox units and scales with the chart, so it is not on the scale.
- **Print:** print-only CSS may keep its own smaller sizes.

## Color Strategy
- **Approach:** Balanced. Calm warm neutrals with one muted slate blue for structure and actions, plus a restrained Instagram-inspired accent set.
- **Light mode base:** Warm off-white page and card surfaces, warm charcoal text.
- **Dark mode base:** Warm soft charcoal surfaces (not near-black) with softened accents and strong contrast.
- **Why slate blue, not Google blue:** in 2026-10 the homepage's warm neutrals (2026-10-20) became the site-wide background, text and border colors, and the site kept one blue — the homepage's slate blue — so pages read as one site (`STYLE-PLAN.md` D1, D1-2). Its job is unchanged: blue still means navigation and map movement. Green, coral, amber and violet keep their jobs below; only their soft tints were warmed to sit on the warm surfaces.
- **Gradient rule:** Gradients are allowed only for subtle route strips or image overlays. Never use gradient buttons as the default CTA style.

## Color Tokens
- **Source of truth:** `styles/tokens.css`. It is the only file with raw color values; this document names tokens, not hex values, so it cannot go stale.
- **Four copies in that file:** light (`:root`), dark chosen with the toggle (`:root[data-theme="dark"]`), dark following the system (`@media (prefers-color-scheme: dark) :root:not([data-theme])`) and print (always light, except page and card surfaces print white). The two dark copies must stay identical.
- **Families:** `bg` / `surface` / `surface-soft` / `surface-warm`; `text` / `text-muted` / `text-soft`; `border` / `border-soft`; `primary`, `secondary`, `accent` each with `-strong`, `-soft`, `-border`; `warm` and `violet` with `-soft`, `-border`; status `success` / `warning` / `warning-text` / `error` / `info`; labels on solid fills `on-primary` / `on-secondary` / `on-accent`; lightbox `scrim` / `on-scrim`; shadows `shadow-panel` / `shadow-soft` / `shadow-photo`.
- **Check after any token change:** run `python3 tools/check_tokens.py` from the repo root. It checks that the copies match, that every `var(--…)` used on the site is defined, that no raw color value (hex, `rgb()`, `hsl()`, color names) appears outside `tokens.css`, and prints the WCAG contrast table for every text, chip, button, focus and chart pairing in both themes.

## Color Usage
- **Primary slate blue:** Map actions, route links, navigation buttons, selected map chips, informational states, links and emphasis in the report.
- **Secondary green:** Hikes, nature, success states, main itinerary options.
- **Accent coral:** Primary action, food, selected/highlighted itinerary items, important warm emphasis.
- **Warm amber:** Warnings, time-sensitive notes, backup plans, market/food tags.
- **Violet:** Hotel, rest, special stay moments. Use sparingly.
- **Neutral surfaces:** Most containers, cards, sidebars, tabs, and print surfaces.
- **`--color-*-strong` (primary / secondary / accent):** The base `--color-primary/secondary/accent` are brand/status colors; in light mode secondary and accent do not reach 4.5:1 as small text. Use the `*-strong` variants for text on a `*-soft` background, for colored text on cards, and for solid button backgrounds that carry white text; keep the base tokens for dots, borders, route strips and icons where text contrast does not apply. In dark mode secondary-strong equals its base token and accent-strong is lighter than the base, for text on `--color-accent-soft`. Solid buttons use the per-family `--color-on-primary/secondary/accent` for label color — green buttons use dark labels on the base green, so they do not need `--color-secondary-strong`.
- **`--color-text-soft` vs `--color-text-muted`:** both pass AA as text and sit close together; distinguish them by size/weight, not by relying on the small color difference.
- **`--color-warning` vs `--color-warning-text`:** `--color-warning` is a *status* color (badges, small dots, the bullet marker before a tip) — it is not dark enough to pass 4.5:1 as body/label text on light warm surfaces. `--color-warning-text` is the text-safe variant (in dark mode it equals `--color-warning`). Any warning/shop tag or tips-list text must use `--color-warning-text`, never `--color-warning` directly.
- **Charts (STARLUX report):** bars, lines and legend swatches use the base color tokens; value labels and axis labels use text tokens (`--color-text`, `--color-text-soft`), never the series color. Stacked segments are separated by a 2px gap in the card color. **Known gap:** on the chart card, light-mode green and amber marks are under 3:1, and red vs green is hard to tell apart for red-green colour-blind readers; a chart-specific palette is left for a later chart redesign (`STYLE-PLAN.md` section 6).

## Dark Mode Rules
- Follow `prefers-color-scheme: dark` when no explicit `[data-theme]` is set. The theme toggle (`scripts/site.js`) sets the override and persists the choice in `localStorage` under `theme`; its first click always flips what is on screen, even when the page is following a dark system theme. A small script in each page's `<head>` applies the saved theme before first paint.
- Component rules that differ by theme go through the tokens, never through a page-level `@media (prefers-color-scheme: dark)` block — that would ignore the toggle.
- Keep maps and photos natural. Do not apply global filters to map iframes or images unless a specific embed is too bright.
- Shadows use the `--shadow-*` tokens, which are darker and subtler in dark mode.
- Borders become more important in dark mode. Use borders to separate panels instead of strong shadows.
- Avoid pure black backgrounds. Use `--color-bg` for the page and `--color-surface` for panels.

## Spacing
- **Base unit:** 4px.
- **Density:** Comfortable compact. This site has real itinerary data, so it should stay dense enough for scanning.
- **Scale:** `--space-2xs` 2px, `xs` 4px, `sm` 8px, `md` 16px, `lg` 24px, `xl` 32px, `2xl` 48px.
- **Existing compact components:** may keep 1-3px nudges and off-scale values such as 6/10/14px that they already use; these were left as they were in the 2026-10 cleanup. **New CSS uses the `--space-*` tokens.**
- **Mobile:** Prioritize thumb reach and avoid horizontal overflow.
- **Desktop:** Sidebar can be dense. Map area should stay visually calm.

## Layout
- **Approach:** Hybrid. App-like grid for the itinerary and map, warmer editorial touches through photos and accent tags.
- **Mobile:** Bottom sheet over map, sticky trip header, tabs, clear touch targets.
- **Desktop:** Sidebar plus map split view. The itinerary panel should feel like a compact planning app.
- **Max readable line length:** Notes and descriptions should stay under roughly 72 characters when possible.
- **No nested cards:** Cards can contain content, but avoid card-inside-card styling unless showing true alternatives such as main vs backup route choices.

## Breakpoints
- **Single layout breakpoint: `768px`** for the travel app pages and the homepage. This is a deliberate choice, not an oversight — the travel app only has two layout modes (mobile bottom-sheet, desktop split-view), so there is no intermediate tablet-specific design.
- **Component reflow below that is allowed** where one component would break on small phones, without changing the page layout: Noosa food rows (`479px`, `380px`), the report's two-column grids and risk rows (`480px`) and its source list columns (`560px`). The STARLUX report is a single reading column, so the 768px split does not apply to it.
- **Rule:** Before adding a second breakpoint, confirm there is an actual layout that breaks between 768px and the next natural size (e.g. 1024px). Do not add breakpoints speculatively.
- **Below 768px:** Map fills the screen, itinerary lives in a draggable bottom sheet.
- **At/above 768px:** Side-by-side map + sidebar, fixed 420px sidebar width (resizable between 1/4 and 1/2 of viewport width).

## Shape, Borders, and Shadows
- **Small radius `--radius-sm` (6px):** badges and dense tags.
- **Default radius `--radius-md` (8px):** buttons, chips, timeline rows, food rows, thumbnails and lightbox photos.
- **Large radius `--radius-lg` (12px):** major panels, cards or important grouped sections.
- **Sheet radius `--radius-sheet` (20px):** only the mobile bottom sheet top corners.
- **Pill `--radius-pill` (999px):** round toggles, pills, floating buttons.
- **Exceptions:** 50% for dots; 2-3px for drag handles, scrollbars and chart legend swatches; print-only sizes.
- **Borders:** Use 1px solid token borders for structure.
- **Shadows:** Keep functional — `--shadow-panel` for panels over the map, `--shadow-soft` for floating controls, `--shadow-photo` for thumbnails. Use shadows to show elevation, not as decoration. Outline rings (`0 0 0 2px …`) and the active-chip glow that follows the chip color are not elevation and stay as they are.

## Elevation / Z-Index Scale
- **Rule:** Every new `z-index` must map to one of these named layers — never invent an arbitrary in-between number.
- **Scale (current usage):**
  | Layer | Value | Used by |
  |---|---|---|
  | `base` | 1 | Map panel |
  | `raised` | 10 | Floating map-nav button, desktop sidebar |
  | `control` | 20 | Resize divider (desktop) |
  | `overlay` | 30 | In-panel loading scrim (`.map-loading`) |
  | `bar` | 50 | Fixed top chip/route bar |
  | `sheet` | 200 | Mobile bottom sheet (sidebar) |
  | `toast` | 500 | Map-update toast |
  | `modal` | 9999 | Lightbox |
- **Why:** Z-index values were previously scattered ad hoc (1, 2, 10, 20, 30, 50, 200, 500, 9999) with no documented meaning, making it easy to pick a colliding or wrong-order value when adding new floating UI. Naming the existing values (no CSS changes needed) gives future additions a clear slot to fit into.
- **Gaps between layers are intentional** (e.g. room between `bar` (50) and `sheet` (200)) so a new layer can be inserted without renumbering existing ones.

## Components
- **Buttons:** Solid blue, green, or coral depending on action meaning. Text must be short and high contrast.
- **Chips:** Soft background plus border by default. Active chips use solid color.
- **Tags:** Small, dense, semantic. Use color families consistently.
- **Timeline items:** Hover and selected states should use `--color-accent-soft` or the relevant route color soft token.
- **Route strips:** May use a very subtle gradient between soft tokens, but text contrast must remain strong.
- **Photos:** Rounded 8px, object-fit cover, no heavy filters. Photos should feel inspectable. Each thumbnail is a `<button>` wrapping the `<img>` (not a bare clickable `<img>`), so it's reachable by keyboard/screen reader and carries its own `aria-label`; the lightbox close control is a real `<button>` for the same reason.
- **Alerts / tips:** Use one color family per component, not a mix — e.g. `.tips-box` uses `--color-warm-soft`/`--color-warm-border` for background/border and `--color-warning-text` for all its text (title, list items, bullet marker uses `--color-warning`), never pairing accent(coral)-family surface tokens with warning(amber)-family text tokens in the same component. Never gray-only. Important warnings must be visible in both themes.
- **Loading state:** A centered spinner over a translucent, blurred scrim (see `.map-loading`). Use for in-place loading inside a panel that already has visible structure (e.g. the map while an iframe swaps). Auto-hide after a timeout as a fallback in case the load event never fires.
- **Error / empty state:** Reuse the `tips-box`-style alert card (icon + title + short message), never a bare unstyled text string. Must be legible in both themes and should suggest what the user can do next (e.g. reload) when practical.
- **One map-interaction rule, everywhere:** every place or route reference — on an activity card, a transit connector, or a food-recommendation row — offers the same two explicit controls and nothing else: a **📍 pill button** that previews the location/route on the embedded map (and collapses the mobile sheet so the preview is visible), and an **↗ external pill/button** ("↗ Maps") that opens Google Maps in a new tab. Tapping anything that is not one of these two controls must never touch the map — no implicit "tap the card body" behavior. Concretely: activity cards render one `.tl-loc` row per location (the 📍-prefixed place name is itself the preview button, `.tl-loc-name.tl-map-btn`); transit connectors keep their description as plain text and put a「📍 路線」pill + "↗ Maps" pill beneath it; food rows use compact circular 📍 (preview) and ↗ (external) buttons. When a card references multiple locations (e.g. main vs backup trailhead), stack one `.tl-loc` row per location — the place name is what tells them apart.
- **Multi-place map (Google My Maps embed):** A page that shows many places at once (e.g. `travel/australia/brisbane/bakery/`) embeds a Google My Maps map as its overview, so the map keeps the same Google look as the itinerary pages and needs no API key. The My Maps layer is maintained outside the site (imported from a CSV), so page filters act on the list only and the page says so; the 📍 pill swaps the iframe to the free single-place embed (same as the itinerary pages), and a floating "🗺️ 回到全部店家" button (`.map-nav-float`, `raised` layer) returns to the overview. Until an embed URL exists, the overview falls back to a plain single-place embed of the page's city (`PAGE_CONFIG.fallbackPlace`). The top chip strip only scrolls the list. New list-map pages reuse `scripts/map-list.js` and `styles/map-list.css` instead of copying them, so they share these rules automatically; page-specific text goes in the page's `page.js`.
- **Tappable = pill, never bare text:** don't style tappable controls as plain colored/underlined text — on mobile there's no hover state to hint at interactivity, so a filled pill (soft themed background + border) is the baseline affordance for anything clickable that sits next to plain text. External-action controls always carry a visible text label ("↗ Maps"), never a bare glyph alone; icon-only circles are acceptable only in dense rows (food list) where the two buttons appear as an adjacent pair. Pill labels may wrap internally — do not `white-space: nowrap` a pill whose content includes full place names, or it will overflow narrow phones.
- **Scroll affordance:** Any horizontally scrollable strip that sits flush against fixed controls (buttons, panel edges) must use an edge fade rather than a hard cut. Apply `mask-image: linear-gradient(to right, transparent, black 14px, black calc(100% - 20px), transparent)` (with the `-webkit-` prefix) on the scroll container. This signals "more content this way" and avoids the scrollable region looking clipped by the fixed control next to it.
- **Desktop scroll buttons for filter rows:** Horizontally scrolling filter rows (e.g. the bakery page's type/area rows) get round ‹ › buttons at both ends at ≥ 768px only — mouse users without a trackpad cannot swipe. Each click scrolls ~70% of the row width; a button is disabled (35% opacity) at its end, and a vertical mouse wheel over the row scrolls it sideways. On mobile the buttons are hidden and the row is swiped as before.
- **Transit connector:** A pure travel/transit segment between two stops (`item.kind === "transit"` in the data) must render lighter than a destination card, not with the same weight. Use a small gray dot (`.tl-dot.sm.dot-gray`), a dashed connecting line (`.tl-line-transit`), and a single condensed line of plain text in the body: icon + "from → to · duration", with the standard「📍 路線」/ "↗ Maps" pill pair beneath it (see the map-interaction rule above) and an optional muted note line — never a full card with `intro`/`tags`/`photos`. This keeps the timeline's visual weight on destinations, matching the common "color-coded blocks differentiate activity / accommodation / transport" convention from travel-planner apps (TripIt, Wanderlog). Applies uniformly to every drive segment regardless of length — do not give long drives (e.g. the day's opening/closing commute) full card treatment just because they're time-consuming; duration already communicates that.
- **No borrowed brand marks:** Do not use Google's (or any third party's) logo/icon assets for buttons like "open in Google Maps" without approval — Google's brand guidelines require sign-off to use their marks on third-party sites. Use a neutral icon (e.g. `↗`) plus the plain text name instead. This keeps the icon language consistent with the rest of the site (see Iconography) and avoids an unauthorized-trademark-use question entirely.
- **Scroll-spy wayfinding:** A "you are here" trail (e.g. the route chip strip) must stay in sync with the content the user is actually reading, not just respond to clicks. Use `IntersectionObserver` on the scrollable list (`root` = the scroll container, not the viewport) with a `rootMargin` that biases the trigger band toward the top of the container, and mark the current item with `aria-current="step"` as well as a visual active state.
- **Back-to-top:** Any list long enough to scroll past roughly one viewport height should offer a floating back-to-top control, shown only after the user has scrolled past a small threshold (not always visible — it would compete with content). Respect `prefers-reduced-motion` when scrolling back to top (skip the smooth animation).

## Iconography
- **Current approach:** Emoji as lightweight icons (🚗 ⛰️ ☕ 🏨 🌿 🍦 🍽️ ⚠️). Chosen deliberately to avoid pulling in an icon font/SVG set for a personal single-page itinerary site.
- **Known risk:** Emoji glyph style differs across OS/browser (Windows vs macOS vs Android render the same codepoint very differently), which works against the "Google clarity" consistency goal. Treat emoji as decoration/scannability aids, not as the sole carrier of meaning — pair with text labels (already the pattern here).
- **When to revisit:** If the site grows more pages/components, or cross-platform visual consistency becomes a real complaint (not hypothetical), switch to a small inline SVG icon set instead of expanding emoji usage further.
- **Pixel-precise icons:** prefer inline SVG over a Unicode glyph for any icon where exact centering matters (small circular buttons especially) — Unicode glyph boxes are not reliably centered across fonts/OSes (see DECISIONS.md, dark-mode sun icon; the light-mode counterpart was later given a matching inline SVG moon icon for the same reason — a toggle's two states should share one icon language, not mix an SVG state with a raw glyph state). The sun and moon SVGs live once in `scripts/site.js` (`Site.icon('sun' | 'moon')`).

## Motion
- **Approach:** Minimal functional.
- **Duration:** 120ms for hover/press states, 200ms for tabs/chips, 300-350ms for bottom sheet movement.
- **Easing:** Use `cubic-bezier(0.32, 0.72, 0, 1)` for sheet motion. Use standard ease-out for simple UI transitions.
- **Rule:** Motion should explain state changes. Do not add decorative animation.

## Layout Alignment Rule
- **Same-row controls must share one flex line.** When two or more elements visually sit on the same horizontal bar (e.g. a chip strip next to icon buttons), put them in a single flex container with `align-items: center` rather than positioning one of them with `position: absolute` and a hand-picked `top` offset.
- **Why:** Absolute-positioned siblings are centered against arbitrary fixed values (`top: 6px`, etc.) that drift out of sync the moment padding, font size, or line-height changes on the other sibling, producing a small but visible vertical misalignment.
- **How to apply:** Give the shared row container `display: flex; align-items: center;`. Let the flexible/scrollable content (e.g. chip strip) take `flex: 1; min-width: 0;` and give fixed-size siblings (e.g. button groups) `flex-shrink: 0`. Avoid `position: absolute` for anything that should align with flow content on the same row.

## Accessibility
- Maintain WCAG AA contrast for text and controls in both light and dark modes. Use `--color-*-strong` for text on `*-soft` backgrounds and for solid button backgrounds carrying white text. Button labels use the matching `--color-on-*` token; green buttons with dark labels may keep the base secondary background (see Color Usage).
- Touch targets should be at least 44×44px for tappable controls (Apple HIG / Material minimum), not just 40px tall. Currently met by `.theme-toggle`, `.lang-toggle`, `.back-to-top`, `.lightbox-close` (all 44×44). `.fr-link` (food-row map/external buttons) is 40×40 — a deliberate compromise against the compact food-row grid, not yet at 44 — flagged here rather than silently under-sized.
- Do not communicate meaning by color alone. Keep labels, icons, or text.
- Preserve print readability. Print mode should remain mostly light regardless of current theme.
- **Keyboard focus:** Every interactive element (chips, tabs, buttons, links) must show a visible `:focus-visible` style — do not rely on the browser default outline blending into the surface, and never use `outline: none` without a replacement. The default ring, `outline: 2px solid var(--color-primary); outline-offset: 2px;`, lives in `styles/base.css` for links, buttons, `summary` and `[tabindex]`; a page swaps to a high-contrast token only where the element's own background is already primary-colored or dark.
- **Reduced motion:** `styles/base.css` shortens all animation, transition and smooth scrolling under `@media (prefers-reduced-motion: reduce)`. Functional motion that communicates state (the map loading spinner) is re-enabled where it is defined, since removing it would hide that something is happening.
- **Safe area insets:** The homepage and report headers pad with `env(safe-area-inset-*)`. **Known gap:** the travel pages' fixed top bar and mobile bottom sheet do not yet, so they can sit under a phone's notch or home-indicator gesture bar. Not yet hit in practice.

## Implementation Rules
- Define colors as semantic CSS custom properties first, then use them in component CSS.
- Prefer names like `--color-primary`, `--color-surface`, `--color-text-muted` over raw color names in component CSS. Pages do not define their own aliases for site tokens.
- Raw hex / rgba color values live only in `styles/tokens.css`. Pages must not redefine color tokens after it, or they would override the print reset. Enforced by `tools/check_tokens.py`, which the pre-commit hook in `.githooks/` runs (enable once per clone: `git config core.hooksPath .githooks`). `black`/`white` inside `mask-image` are allowed: masks read only alpha, so they are not visible colors.
- **Hover states** (decided 2026-10-26). Pick by element type; do not invent a new hover style:

  | Element | Hover | Examples |
  |---|---|---|
  | Button, pill, card or list row | **State layer** (Material 3): the element's own content color at `--state-hover` (8%). On a button with its own background: `background-image: var(--state-layer-hover)` (uses `currentColor`; set variant colors with `background-color`, not the `background` shorthand, or the layer is reset). On a transparent row or a tint that is not the text color: `background: color-mix(in srgb, <token> var(--state-hover), transparent)` | filter, scroll and back-to-top buttons, map / social pills, Noosa place and link buttons, timeline items (`--color-accent`, matching the selected state), lightbox close (`--color-on-scrim`) |
  | Outlined round toggle or outlined link button | Border becomes `--color-primary` (back-to-top also takes `--color-accent-border` on top of its state layer) | EN and theme toggles (`base.css`), homepage `.btn-pill` |
  | Text link | Color or underline change | "阿星" brand link, homepage item titles (+ arrow nudge) |
  | Tag that filters | Previews its selected look (`--color-accent-soft` + border) | cafe / bakery `.tag-btn` |
  | Photo, drag handle | Element-specific feedback (zoom + shadow; wider, colored bar) | `.tl-photo`, `.resize-divider` |

  **Never fade a control with `opacity` on hover**: it drops text contrast (measured 6.09 → 3.47 on a blue pill) and reads as disabled, which is what reduced opacity means elsewhere on the site. The background-image layer switches instantly (gradients do not transition); that is accepted. Contrast on every state layer is checked in `tools/check_tokens.py` groups 8 and 9.
- Shared rules go in the shared files, not copied into pages: `base.css` (font stack, focus ring, round toggles, reduced motion), `app-shell.css` (travel pages' top bar, map + sidebar / bottom sheet, lightbox, back-to-top), `site.js` (theme, language, toggles). When a shared file changes, bump its `?v=` on every page that loads it (dependency list: `STYLE-PLAN.md` appendix A).
- Before changing UI, read this file and check whether the change preserves the Google clarity / Instagram warmth balance.

## Decision History
Historical decisions and their rationale live in `DECISIONS.md`. This file describes only the current rules; when a rule seems arbitrary or you're about to re-try a rejected approach, check `DECISIONS.md` first, and append a new row there whenever a significant UI/UX decision is made.
