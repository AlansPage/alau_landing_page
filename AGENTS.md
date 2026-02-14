# ALAU landing page — Codex instructions

Codex reads this file before doing any work in the repository.

## Stack

- Next.js 16 (App Router, webpack bundler)
- Tailwind CSS 4 (PostCSS, `@theme` in `globals.css`)
- TypeScript (strict mode)
- No UI component library — all components are hand-written

## Page structure (8 sections)

1. **Hero** — full-viewport CTA with starburst visual
2. **Audience ("Для кого мы?")** — 4 disability-group cards
3. **How it works ("Как это работает?")** — 4-step process
4. **Features ("Возможности платформы")** — 4 alternating rows with SVG visuals
5. **Social proof ("Что говорят о нас")** — 3 testimonial cards
6. **Contact ("Свяжитесь с нами")** — form for employers/orgs
7. **FAQ ("Частые вопросы")** — accordion
8. **Footer** — sponsors, social links, accessibility-map link

## Two CTAs only

- Hero: "Зажечь искру (Начать)" → Telegram bot
- Features: "Попробовать платформу" → Telegram bot + "Смотреть карту доступности" → knowledge base

Do **not** add more CTAs or new sections without explicit client approval.

## Accessibility (WCAG AA+)

- Keyboard navigation end-to-end (tab order, skip link, no focus traps)
- `focus-visible` ring + offset on all interactive elements; tap targets >= 44x44
- `prefers-reduced-motion` respected for all animations
- Minimum text size 13 px (no `text-xs` in body copy)
- All decorative SVGs carry `aria-hidden="true"`
- Contrast: 4.5:1 body text, 3:1 large text / UI on warm cream background

## i18n

- Two languages: Russian (`ru`) and Kazakh (`kk`)
- All user-facing strings live in `lib/i18n.ts`
- When adding new copy, update both `ru` and `kk` dictionaries AND the `I18nDict` type

## Visual design tokens

Flame palette lives in CSS custom properties (`--flame-deep`, `--flame-core`, `--flame-hot`, `--flame-glow`).
Decorative components: `StarFigure`, `SparkleStar`, `MiniSparkle` (all in `components/decorations/`).

## Engineering workflow

- Prefer small, reviewable diffs; follow existing conventions
- After changes, run `npm run build` and fix any errors
- Don't add heavy dependencies unless absolutely necessary
