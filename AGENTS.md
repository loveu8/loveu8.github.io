# Project Guidance

## Design System
Always read `DESIGN.md` before making visual or UI decisions.

All font choices, colors, spacing, component states, and the Google clarity / Instagram warmth direction are defined there. Do not deviate from the design system without explicit approval.

When changing UI, support both light and dark mode unless the change is print-only or content-only. Flag any visual code that uses raw hex values outside the design token section.

## Static Page Data
This site is often previewed by opening HTML files directly from disk. For pages that must work via `file://`, do not load local JSON with `fetch()` because browsers block it. Keep structured page data in a JavaScript object loaded by a normal `<script>` tag, or require an explicit local HTTP server workflow.
