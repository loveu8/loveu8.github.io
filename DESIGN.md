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
- **Primary font stack:** `-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans TC", "Microsoft JhengHei", "PingFang TC", sans-serif`
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

## Shape, Borders, and Shadows
- **Small radius:** 6px for badges and dense tags.
- **Default radius:** 8px for buttons, chips, timeline rows, and thumbnails.
- **Large radius:** 12px for major panels or important grouped sections.
- **Sheet radius:** 20px only for the mobile bottom sheet top corners.
- **Borders:** Use 1px solid token borders for structure.
- **Shadows:** Keep functional. Use shadows to show panel elevation over maps, not as decoration.

## Components
- **Buttons:** Solid blue, green, or coral depending on action meaning. Text must be short and high contrast.
- **Chips:** Soft background plus border by default. Active chips use solid color.
- **Tags:** Small, dense, semantic. Use color families consistently.
- **Timeline items:** Hover and selected states should use `--color-accent-soft` or the relevant route color soft token.
- **Route strips:** May use a very subtle gradient between soft tokens, but text contrast must remain strong.
- **Photos:** Rounded 8px, object-fit cover, no heavy filters. Photos should feel inspectable.
- **Alerts / tips:** Amber or coral family, never gray-only. Important warnings must be visible in both themes.

## Motion
- **Approach:** Minimal functional.
- **Duration:** 120ms for hover/press states, 200ms for tabs/chips, 300-350ms for bottom sheet movement.
- **Easing:** Use `cubic-bezier(0.32, 0.72, 0, 1)` for sheet motion. Use standard ease-out for simple UI transitions.
- **Rule:** Motion should explain state changes. Do not add decorative animation.

## Accessibility
- Maintain WCAG AA contrast for text and controls in both light and dark modes.
- Touch targets should be at least 40px tall for primary controls when practical.
- Do not communicate meaning by color alone. Keep labels, icons, or text.
- Preserve print readability. Print mode should remain mostly light regardless of current theme.

## Implementation Rules
- Define colors as semantic CSS custom properties first, then map existing component tokens to them.
- Prefer names like `--color-primary`, `--color-surface`, `--color-text-muted` over raw color names in component CSS.
- Raw hex values should live near the token definition only.
- Before changing UI, read this file and check whether the change preserves the Google clarity / Instagram warmth balance.

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-07-01 | Initial design system created | Establishes a color and UI direction between Google and Instagram, with explicit light/dark tokens for future site work. |
