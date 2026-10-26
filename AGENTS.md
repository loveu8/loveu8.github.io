# Project Guidance

## Design System
Always read `DESIGN.md` before making visual or UI decisions.

All font choices, colors, spacing, component states, and the Google clarity / Instagram warmth direction are defined there. Do not deviate from the design system without explicit approval.

When changing UI, support both light and dark mode unless the change is print-only or content-only. Flag any visual code that uses raw hex values outside the design token section.

After changing any CSS, HTML or JS, run `python tools/check_tokens.py` from the repo root and fix every `ERROR` before committing. It blocks raw colors outside `styles/tokens.css` and undefined tokens. The pre-commit hook in `.githooks/` runs the same check; if `git config --get core.hooksPath` does not print `.githooks`, run `git config core.hooksPath .githooks` once in this clone. Do not bypass the hook with `--no-verify`.

## Static Page Data
This site is often previewed by opening HTML files directly from disk. For pages that must work via `file://`, do not load local JSON with `fetch()` because browsers block it. Keep structured page data in a JavaScript object loaded by a normal `<script>` tag, or require an explicit local HTTP server workflow.
