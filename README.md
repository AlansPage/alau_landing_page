# ALAU landing page

This repo contains a single-page landing (Next.js App Router + Tailwind + shadcn/ui) built to match the client brief:

- **Exactly 5 blocks**: Hero / “Для кого мы?” / “Как это работает?” / “Навигатор” / Footer
- **Only 2 CTAs**: Hero button (Telegram) + Navigator button (knowledge base)
- Accessibility-first (skip link, strong focus-visible styles, reduced motion support, large tap targets)

## Quick start

```bash
npm install
npm run dev
```

Open: http://localhost:3000

## Accessibility audit workflow (WCAG 2.2 AA)

Install dependencies:

```bash
npm install
npx playwright install chromium
```

Run accessibility linting (React/Next JSX rules):

```bash
npm run a11y:lint
```

Run automated axe scan on homepage:

```bash
npm run a11y:test
```

Notes:

- `a11y:lint` uses `eslint-plugin-jsx-a11y` + `eslint-config-next`.
- `a11y:test` starts the app on `http://127.0.0.1:4173` and runs Playwright + axe against `/`.

## Configure links

Edit:

- `lib/site-config.ts` — Telegram bot link, knowledge base link, email, socials.

## Brand assets

Transparent PNG logos are in:

- `public/brand/alau-wordmark.png`
- `public/brand/alau-mark.png`

The header and footer use the wordmark via `components/logo.tsx`.

## Accessibility: “magnifying glass” text size

The header includes a **magnifying-glass** button that cycles text scale:

`100% → 115% → 130% → 100%`

Implementation:

- `components/text-scale-provider.tsx` (persists in `localStorage`)
- `app/globals.css` (applies `--font-scale` to root `html` font-size)

## Deploy (Vercel)

1. Push this repo to GitHub.
2. Import it into Vercel.
3. Build command: `npm run build` (default)
