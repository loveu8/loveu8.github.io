# Design System - loveu8.github.io

## Product Context
- **What this is:** Personal static website with travel itinerary pages, map embeds, timeline content, photos, route chips, and print-friendly views.
- **Who it is for:** The site owner and invited readers who need quick, clear trip information on mobile and desktop.
- **Project type:** Static travel utility site, closer to a compact planning app than a marketing page.
- **Design priority:** Information must stay readable and scannable first. Color adds warmth and memory, but should never compete with maps, photos, times, or navigation links.

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
- **Display / page titles:** Same stack, weight 750-800, tight but readable line height.
- **Body:** Same stack, weight 400-500, line height 1.55-1.7.
- **UI labels:** Same stack, weight 650-750.
- **Numbers / times:** Same stack with `font-variant-numeric: tabular-nums`.
- **Rule:** Do not add decorative fonts. This is a utility-first travel page, and Chinese text must render cleanly across devices.

## Type Scale
- **2xs:** 11px
- **xs:** 12px
- **sm:** 13px
- **base:** 15px
- **md:** 17px
- **lg:** 20px
- **xl:** 26px
- **Rule:** Use `clamp()` only within a tight range. Do not scale text aggressively by viewport width.

## Color Strategy
- **Approach:** Balanced. Google-like semantic clarity plus a restrained Instagram-inspired accent set.
- **Light mode base:** Soft warm white surfaces with cool Google-style blues and greens.
- **Dark mode base:** Near-charcoal surfaces with softened accents and strong contrast.
- **Gradient rule:** Gradients are allowed only for subtle route strips or image overlays. Never use gradient buttons as the default CTA style.

## Light Mode Tokens
```css
:root {
  color-scheme: light;

  --color-bg: #f7f9fc;
  --color-surface: #ffffff;
  --color-surface-soft: #f1f5f9;
  --color-surface-warm: #fff8f4;

  --color-text: #202124;
  --color-text-muted: #5f6368;
  --color-text-soft: #80868b;

  --color-border: #dadce0;
  --color-border-soft: #e8eaed;

  --color-primary: #1a73e8;
  --color-primary-soft: #e8f0fe;
  --color-primary-border: #aecbfa;

  --color-secondary: #34a853;
  --color-secondary-soft: #e6f4ea;
  --color-secondary-border: #b7e1cd;

  --color-accent: #e4405f;
  --color-accent-soft: #fde7ed;
  --color-accent-border: #f6b3c0;

  --color-warm: #fbbc04;
  --color-warm-soft: #fff7db;
  --color-warm-border: #fde293;

  --color-violet: #833ab4;
  --color-violet-soft: #f3e8ff;
  --color-violet-border: #d8b4fe;

  --color-success: #34a853;
  --color-warning: #f29900;
  --color-error: #d93025;
  --color-info: #1a73e8;
}
```

## Dark Mode Tokens
```css
:root[data-theme="dark"] {
  color-scheme: dark;

  --color-bg: #111418;
  --color-surface: #1b1f24;
  --color-surface-soft: #242a31;
  --color-surface-warm: #2a211f;

  --color-text: #f1f3f4;
  --color-text-muted: #bdc1c6;
  --color-text-soft: #9aa0a6;

  --color-border: #3c4043;
  --color-border-soft: #2f343a;

  --color-primary: #8ab4f8;
  --color-primary-soft: #1c2f4f;
  --color-primary-border: #315b9f;

  --color-secondary: #81c995;
  --color-secondary-soft: #193424;
  --color-secondary-border: #2f6f45;

  --color-accent: #ff7a90;
  --color-accent-soft: #3b2028;
  --color-accent-border: #8f3d4f;

  --color-warm: #fdd663;
  --color-warm-soft: #3a2f16;
  --color-warm-border: #8a6d1d;

  --color-violet: #c58af9;
  --color-violet-soft: #30213f;
  --color-violet-border: #70449a;

  --color-success: #81c995;
  --color-warning: #fdd663;
  --color-error: #f28b82;
  --color-info: #8ab4f8;
}
```

## Color Usage
- **Primary blue:** Map actions, route links, navigation buttons, selected map chips, informational states.
- **Secondary green:** Hikes, nature, success states, main itinerary options.
- **Accent coral:** Primary action, food, selected/highlighted itinerary items, important warm emphasis.
- **Warm amber:** Warnings, time-sensitive notes, backup plans, market/food tags.
- **Violet:** Hotel, rest, special stay moments. Use sparingly.
- **Neutral surfaces:** Most containers, cards, sidebars, tabs, and print surfaces.

## Dark Mode Rules
- Use `prefers-color-scheme: dark` as the default detection, and allow an explicit `[data-theme]` override later if a toggle is added.
- Keep maps and photos natural. Do not apply global filters to map iframes or images unless a specific embed is too bright.
- Shadows in dark mode should be subtle and darker: `0 8px 24px rgba(0, 0, 0, 0.35)`.
- Borders become more important in dark mode. Use borders to separate panels instead of strong shadows.
- Avoid pure black backgrounds. Use `#111418` for the app background and `#1b1f24` for panels.

## Spacing
- **Base unit:** 4px.
- **Density:** Comfortable compact. This site has real itinerary data, so it should stay dense enough for scanning.
- **Scale:** 2xs 2px, xs 4px, sm 8px, md 16px, lg 24px, xl 32px, 2xl 48px.
- **Mobile:** Prioritize thumb reach and avoid horizontal overflow.
- **Desktop:** Sidebar can be dense. Map area should stay visually calm.

## Layout
- **Approach:** Hybrid. App-like grid for the itinerary and map, warmer editorial touches through photos and accent tags.
- **Mobile:** Bottom sheet over map, sticky trip header, tabs, clear touch targets.
- **Desktop:** Sidebar plus map split view. The itinerary panel should feel like a compact planning app.
- **Max readable line length:** Notes and descriptions should stay under roughly 72 characters when possible.
- **No nested cards:** Cards can contain content, but avoid card-inside-card styling unless showing true alternatives such as main vs backup route choices.

## Breakpoints
- **Single breakpoint: `768px`.** This is a deliberate choice, not an oversight — the app only has two layout modes (mobile bottom-sheet, desktop split-view), so there is no intermediate tablet-specific design.
- **Rule:** Before adding a second breakpoint, confirm there is an actual layout that breaks between 768px and the next natural size (e.g. 1024px). Do not add breakpoints speculatively.
- **Below 768px:** Map fills the screen, itinerary lives in a draggable bottom sheet.
- **At/above 768px:** Side-by-side map + sidebar, fixed 420px sidebar width (resizable between 1/4 and 1/2 of viewport width).

## Shape, Borders, and Shadows
- **Small radius:** 6px for badges and dense tags.
- **Default radius:** 8px for buttons, chips, timeline rows, and thumbnails.
- **Large radius:** 12px for major panels or important grouped sections.
- **Sheet radius:** 20px only for the mobile bottom sheet top corners.
- **Borders:** Use 1px solid token borders for structure.
- **Shadows:** Keep functional. Use shadows to show panel elevation over maps, not as decoration.

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
- **Photos:** Rounded 8px, object-fit cover, no heavy filters. Photos should feel inspectable.
- **Alerts / tips:** Amber or coral family, never gray-only. Important warnings must be visible in both themes.
- **Loading state:** A centered spinner over a translucent, blurred scrim (see `.map-loading`). Use for in-place loading inside a panel that already has visible structure (e.g. the map while an iframe swaps). Auto-hide after a timeout as a fallback in case the load event never fires.
- **Error / empty state:** Reuse the `tips-box`-style alert card (icon + title + short message), never a bare unstyled text string. Must be legible in both themes and should suggest what the user can do next (e.g. reload) when practical.
- **One map-interaction rule, everywhere:** every place or route reference — on an activity card, a transit connector, or a food-recommendation row — offers the same two explicit controls and nothing else: a **📍 pill button** that previews the location/route on the embedded map (and collapses the mobile sheet so the preview is visible), and an **↗ external pill/button** ("↗ Maps") that opens Google Maps in a new tab. Tapping anything that is not one of these two controls must never touch the map — no implicit "tap the card body" behavior. Concretely: activity cards render one `.tl-loc` row per location (the 📍-prefixed place name is itself the preview button, `.tl-loc-name.tl-map-btn`); transit connectors keep their description as plain text and put a「📍 路線」pill + "↗ Maps" pill beneath it; food rows use compact circular 📍 (preview) and ↗ (external) buttons. When a card references multiple locations (e.g. main vs backup trailhead), stack one `.tl-loc` row per location — the place name is what tells them apart.
- **Tappable = pill, never bare text:** don't style tappable controls as plain colored/underlined text — on mobile there's no hover state to hint at interactivity, so a filled pill (soft themed background + border) is the baseline affordance for anything clickable that sits next to plain text. External-action controls always carry a visible text label ("↗ Maps"), never a bare glyph alone; icon-only circles are acceptable only in dense rows (food list) where the two buttons appear as an adjacent pair. Pill labels may wrap internally — do not `white-space: nowrap` a pill whose content includes full place names, or it will overflow narrow phones.
- **Scroll affordance:** Any horizontally scrollable strip that sits flush against fixed controls (buttons, panel edges) must use an edge fade rather than a hard cut. Apply `mask-image: linear-gradient(to right, transparent, black 14px, black calc(100% - 20px), transparent)` (with the `-webkit-` prefix) on the scroll container. This signals "more content this way" and avoids the scrollable region looking clipped by the fixed control next to it.
- **Transit connector:** A pure travel/transit segment between two stops (`item.kind === "transit"` in the data) must render lighter than a destination card, not with the same weight. Use a small gray dot (`.tl-dot.sm.dot-gray`), a dashed connecting line (`.tl-line-transit`), and a single condensed line of plain text in the body: icon + "from → to · duration", with the standard「📍 路線」/ "↗ Maps" pill pair beneath it (see the map-interaction rule above) and an optional muted note line — never a full card with `intro`/`tags`/`photos`. This keeps the timeline's visual weight on destinations, matching the common "color-coded blocks differentiate activity / accommodation / transport" convention from travel-planner apps (TripIt, Wanderlog). Applies uniformly to every drive segment regardless of length — do not give long drives (e.g. the day's opening/closing commute) full card treatment just because they're time-consuming; duration already communicates that.
- **No borrowed brand marks:** Do not use Google's (or any third party's) logo/icon assets for buttons like "open in Google Maps" without approval — Google's brand guidelines require sign-off to use their marks on third-party sites. Use a neutral icon (e.g. `↗`) plus the plain text name instead. This keeps the icon language consistent with the rest of the site (see Iconography) and avoids an unauthorized-trademark-use question entirely.
- **Scroll-spy wayfinding:** A "you are here" trail (e.g. the route chip strip) must stay in sync with the content the user is actually reading, not just respond to clicks. Use `IntersectionObserver` on the scrollable list (`root` = the scroll container, not the viewport) with a `rootMargin` that biases the trigger band toward the top of the container, and mark the current item with `aria-current="step"` as well as a visual active state.
- **Back-to-top:** Any list long enough to scroll past roughly one viewport height should offer a floating back-to-top control, shown only after the user has scrolled past a small threshold (not always visible — it would compete with content). Respect `prefers-reduced-motion` when scrolling back to top (skip the smooth animation).

## Iconography
- **Current approach:** Emoji as lightweight icons (🚗 ⛰️ ☕ 🏨 🌿 🍦 🍽️ ⚠️). Chosen deliberately to avoid pulling in an icon font/SVG set for a personal single-page itinerary site.
- **Known risk:** Emoji glyph style differs across OS/browser (Windows vs macOS vs Android render the same codepoint very differently), which works against the "Google clarity" consistency goal. Treat emoji as decoration/scannability aids, not as the sole carrier of meaning — pair with text labels (already the pattern here).
- **When to revisit:** If the site grows more pages/components, or cross-platform visual consistency becomes a real complaint (not hypothetical), switch to a small inline SVG icon set instead of expanding emoji usage further.
- **Pixel-precise icons:** prefer inline SVG over a Unicode glyph for any icon where exact centering matters (small circular buttons especially) — Unicode glyph boxes are not reliably centered across fonts/OSes (see DECISIONS.md, dark-mode sun icon).

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
- Maintain WCAG AA contrast for text and controls in both light and dark modes.
- Touch targets should be at least 40px tall for primary controls when practical.
- Do not communicate meaning by color alone. Keep labels, icons, or text.
- Preserve print readability. Print mode should remain mostly light regardless of current theme.
- **Keyboard focus:** Every interactive element (chips, tabs, buttons, links) must show a visible `:focus-visible` style — do not rely on the browser default outline blending into the surface, and never use `outline: none` without a replacement. Use `outline: 2px solid var(--color-primary); outline-offset: 2px;` as the default focus ring, swapping to a high-contrast token if the element's own background is already primary-colored.
- **Reduced motion:** Wrap non-essential motion (bottom sheet slide, hover transforms, theme/lang toggle transitions) in `@media (prefers-reduced-motion: reduce)` and shorten or remove it. Functional motion that communicates state (e.g. the loading spinner) can stay, since removing it would hide that something is happening.
- **Safe area insets:** Not yet implemented. The fixed top bar and mobile bottom sheet should eventually add `env(safe-area-inset-top)` / `env(safe-area-inset-bottom)` padding so they don't sit under a phone's notch or home-indicator gesture bar. Flagged here as a known gap, not yet hit in practice.

## Implementation Rules
- Define colors as semantic CSS custom properties first, then map existing component tokens to them.
- Prefer names like `--color-primary`, `--color-surface`, `--color-text-muted` over raw color names in component CSS.
- Raw hex values should live near the token definition only.
- Before changing UI, read this file and check whether the change preserves the Google clarity / Instagram warmth balance.

## Decision History
Historical decisions and their rationale live in `DECISIONS.md`. This file describes only the current rules; when a rule seems arbitrary or you're about to re-try a rejected approach, check `DECISIONS.md` first, and append a new row there whenever a significant UI/UX decision is made.
