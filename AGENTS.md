# ALAU landing page — Codex instructions

Codex reads this file before doing any work in the repository (see OpenAI Codex docs for `AGENTS.md`).

## Client constraints (non‑negotiable)

- Keep **exactly 5 blocks** on the page:
  1) Hero
  2) “Для кого мы?”
  3) “Как это работает?”
  4) “Навигатор”
  5) Footer
- Keep **ONLY two CTAs total**:
  - Hero: “Зажечь искру (Начать)” → Telegram
  - Navigator: “Смотреть карту доступности” → knowledge base / map
- **Do not add new sections** (no FAQ, pricing, testimonials, blog, etc.).
- **Do not change required RU copy** in those sections unless explicitly asked.
- The header “magnifying glass” control must continue to work (text scales 100%→115%→130%→100%).

## Accessibility (WCAG AA+)

- Keyboard works end‑to‑end (tab order, skip link, no focus traps).
- Strong `focus-visible` ring + offset; tap targets ≥ 44×44.
- Respect `prefers-reduced-motion`.
- Avoid low contrast (especially on light “surface” panels).

## Engineering workflow

- Prefer small, reviewable diffs; follow existing conventions.
- After changes, run `npm run build` (and `npm run lint` if present) and fix issues.
- Don’t add heavy dependencies unless absolutely necessary.