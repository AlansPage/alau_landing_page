# Prompts for OpenAI Codex (repo-aware edits)

These prompts are designed to keep Codex **inside the client constraints** and produce **small, reviewable diffs**.

## Non-negotiable brief (paste at the top of every Codex request)

```text
CLIENT RULES (non-negotiable)
- Keep exactly 5 blocks: Hero / “Для кого мы?” / “Как это работает?” / “Навигатор” / Footer.
- Keep ONLY two CTAs total:
  1) Hero button: “Зажечь искру (Начать)” → Telegram
  2) Navigator button: “Смотреть карту доступности” → knowledge base / map
- Do not add new sections (no FAQ, pricing, blog, testimonials).
- Do not change the required RU copy in those 5 blocks.
- Accessibility first: keyboard navigation, strong focus-visible ring + offset, tap targets ≥44x44, respects prefers-reduced-motion, avoid low contrast.
- The header magnifying-glass control for text size must keep working (100%→115%→130% cycle).

WORK STYLE
- Make changes as minimal diffs; do not rewrite files unnecessarily.
- After changes, run: npm run build (and npm run lint if present). Fix issues.
- Report changed files only.
```

## 1) One-time “scan and plan”

```text
Scan the repo and summarize:
- tech stack (Next.js version, Tailwind/shadcn usage)
- where styling/theme tokens live
- where the 5 blocks are implemented
- where links/config live

Then list any spec risks (extra buttons, extra sections, copy drift, contrast risks, motion, etc.).

Propose a 4–6 step plan to make the page feel more premium (lighter, more illustrations, richer cards, partners grid polish) while staying within constraints. Stop and wait.
```

## 2) Light / airy / EPAM-like refinement (within same blocks)

```text
Implement the next step only:

- Increase “surface richness” without changing content: subtle background panels, consistent rounded corners, consistent shadow treatment.
- Add tasteful decorative inline SVG illustrations (aria-hidden):
  - hero collage tiles
  - subtle patterns in audience cards
  - small abstract “map” illustration in navigator callout

Do not add CTAs, do not add sections, do not change required RU copy.
Return changed files only.
```

## 3) Motion polish (respect prefers-reduced-motion)

```text
Implement the next step only:

- Add subtle, tasteful animations: staggered reveals for cards, gentle parallax on decorative SVGs, and hover/press micro-interactions.
- Respect prefers-reduced-motion by disabling or simplifying animations when requested.
- Do not introduce new content, CTAs, or sections. Keep required RU copy unchanged.

Return minimal diffs only.
```

## 4) Partners area upgrade (still inside footer)

```text
Improve the footer partners grid (still inside Footer):
- keep placeholders, but make them feel more “real” (better spacing, logo container styles, responsive columns)
- ensure accessible labeling (or mark decorative appropriately)
Return minimal diffs only.
```

## 5) Strict accessibility audit pass

```text
Perform a WCAG 2.2 AA oriented audit and implement fixes as minimal diffs:
- headings/landmarks/aria-labelledby
- keyboard order + focus-visible ring + offset
- tap targets ≥44x44
- prefers-reduced-motion
- contrast for muted text on light surfaces

Do not change required copy or add sections/CTAs.
Return changed files only.
```

## 6) Add a “text size” enhancement (only if requested)

```text
Enhance the magnifying-glass text scaling control:
- keep current cycle 100%→115%→130%→100%
- add a small, screen-reader-only announcement (aria-live polite) when the size changes
- ensure no layout breakpoints regress on mobile

Minimal diffs only.
```
