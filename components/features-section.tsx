"use client"

import { Flame, Mic, SunMedium, MonitorPlay, ClipboardCheck } from "lucide-react"

import { LINKS } from "@/lib/site-config"
import { getI18n } from "@/lib/i18n"
import { useLanguage } from "@/components/language-provider"
import { StarFigure } from "@/components/decorations/star-figure"
import { SparkleStar } from "@/components/decorations/sparkle-star"

const featureIcons = [Mic, SunMedium, MonitorPlay, ClipboardCheck] as const

/* --- Four unique decorative visuals, one per feature --- */

/* 0 — Radial glow with concentric rings (voice / microphone) */
function FeatureVisualGlow() {
  return (
    <svg viewBox="0 0 280 220" className="h-full w-full">
      <defs>
        <radialGradient id="fv-glow" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="hsl(var(--flame-core) / 0.30)" />
          <stop offset="60%" stopColor="hsl(var(--flame-hot) / 0.10)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <rect width="280" height="220" rx="24" fill="url(#fv-glow)" />
      <circle cx="140" cy="100" r="60" fill="none" stroke="hsl(var(--flame-core) / 0.15)" strokeWidth="1.5" />
      <circle cx="140" cy="100" r="42" fill="none" stroke="hsl(var(--flame-hot) / 0.18)" strokeWidth="1.2" />
      <circle cx="140" cy="100" r="22" fill="hsl(var(--flame-core) / 0.12)" />
      <circle cx="140" cy="100" r="8" fill="hsl(var(--flame-hot) / 0.25)" />
    </svg>
  )
}

/* 1 — Starburst with short rays (accessibility / light) */
function FeatureVisualStarburst() {
  const rays = [0, 45, 90, 135, 180, 225, 270, 315]
  return (
    <svg viewBox="0 0 280 220" className="h-full w-full">
      <defs>
        <radialGradient id="fv-star-bg" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="hsl(var(--flame-hot) / 0.18)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <rect width="280" height="220" rx="24" fill="url(#fv-star-bg)" />
      {rays.map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const cx = 140, cy = 105
        const len = 38 + (i % 3) * 10
        return (
          <line
            key={i}
            x1={cx + Math.cos(rad) * 12}
            y1={cy + Math.sin(rad) * 12}
            x2={cx + Math.cos(rad) * len}
            y2={cy + Math.sin(rad) * len}
            stroke="hsl(var(--flame-core) / 0.20)"
            strokeWidth={2.2 - (i % 2) * 0.6}
            strokeLinecap="round"
          />
        )
      })}
      <circle cx="140" cy="105" r="14" fill="hsl(var(--flame-hot) / 0.15)" />
      <circle cx="140" cy="105" r="6" fill="hsl(var(--flame-core) / 0.22)" />
    </svg>
  )
}

/* 2 — Flowing curves (video / streaming) */
function FeatureVisualCurves() {
  return (
    <svg viewBox="0 0 280 220" className="h-full w-full">
      <defs>
        <radialGradient id="fv-curves-bg" cx="30%" cy="40%" r="70%">
          <stop offset="0%" stopColor="hsl(260 60% 55% / 0.15)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <rect width="280" height="220" rx="24" fill="url(#fv-curves-bg)" />
      <path
        d="M30 140 C 70 80, 120 160, 160 100 S 230 60, 260 110"
        fill="none" stroke="hsl(var(--flame-core) / 0.18)" strokeWidth="3" strokeLinecap="round"
      />
      <path
        d="M20 160 C 60 110, 110 180, 150 130 S 220 90, 265 135"
        fill="none" stroke="hsl(var(--flame-hot) / 0.14)" strokeWidth="2.5" strokeLinecap="round"
      />
      <path
        d="M40 175 C 80 135, 130 190, 170 155 S 240 120, 270 155"
        fill="none" stroke="hsl(var(--flame-deep) / 0.10)" strokeWidth="2" strokeLinecap="round"
      />
      <circle cx="90" cy="80" r="28" fill="hsl(var(--flame-core) / 0.08)" />
      <circle cx="200" cy="70" r="20" fill="hsl(var(--flame-hot) / 0.10)" />
    </svg>
  )
}

/* 3 — Dotted constellation grid (assessment / checklist) */
function FeatureVisualConstellation() {
  const dots = [
    { x: 60, y: 50, r: 4 }, { x: 120, y: 40, r: 3 }, { x: 190, y: 55, r: 5 }, { x: 230, y: 45, r: 3 },
    { x: 80, y: 100, r: 5 }, { x: 140, y: 110, r: 6 }, { x: 200, y: 95, r: 4 },
    { x: 50, y: 155, r: 3 }, { x: 110, y: 160, r: 4 }, { x: 170, y: 150, r: 5 }, { x: 240, y: 165, r: 3 },
  ]
  const lines = [
    [0, 1], [1, 2], [2, 3], [4, 5], [5, 6], [7, 8], [8, 9], [9, 10], [1, 5], [5, 9],
  ]
  return (
    <svg viewBox="0 0 280 220" className="h-full w-full">
      <defs>
        <radialGradient id="fv-const-bg" cx="55%" cy="50%" r="60%">
          <stop offset="0%" stopColor="hsl(35 90% 55% / 0.12)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <rect width="280" height="220" rx="24" fill="url(#fv-const-bg)" />
      {lines.map(([a, b], i) => (
        <line
          key={i}
          x1={dots[a].x} y1={dots[a].y}
          x2={dots[b].x} y2={dots[b].y}
          stroke="hsl(var(--flame-core) / 0.12)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      ))}
      {dots.map((d, i) => (
        <circle
          key={i}
          cx={d.x} cy={d.y} r={d.r}
          fill={i % 3 === 0
            ? "hsl(var(--flame-hot) / 0.22)"
            : i % 3 === 1
              ? "hsl(var(--flame-core) / 0.18)"
              : "hsl(35 90% 55% / 0.20)"
          }
        />
      ))}
    </svg>
  )
}

const featureVisuals = [
  FeatureVisualGlow,
  FeatureVisualStarburst,
  FeatureVisualCurves,
  FeatureVisualConstellation,
] as const

/* Separator sparkle between feature rows */
const separatorColors = ["hsl(280 60% 65%)", "hsl(35 90% 60%)", "hsl(340 70% 65%)"]

export function FeaturesSection() {
  const { lang } = useLanguage()
  const copy = getI18n(lang).features

  return (
    <section
      aria-labelledby="features"
      className="relative px-6 py-24 md:py-32 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/4 top-20 h-72 w-72 rounded-full bg-primary/8 blur-[140px]" />
        <div className="absolute bottom-20 right-1/4 h-56 w-56 rounded-full bg-accent/6 blur-[120px]" />
        {/* Holding figure — right margin, like holding a torch */}
        <div className="absolute right-[3%] top-[30%] hidden opacity-[0.11] md:block">
          <StarFigure pose="holding" size={80} />
        </div>
        <SparkleStar points={4} size={18} color="hsl(35 90% 60%)" className="absolute right-[2%] top-[28%] hidden opacity-[0.14] md:block" />
        <SparkleStar points={6} size={14} color="hsl(35 90% 60%)" className="absolute right-[8%] top-[42%] hidden opacity-[0.12] md:block" />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="relative inline-block">
          <h2
            id="features"
            className="anchor-target reveal text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
            data-reveal
          >
            {copy.title}
          </h2>
          <SparkleStar
            points={6} size={26} color="hsl(340 70% 65%)"
            className="sparkle-pulse absolute -top-3 -right-6 opacity-[0.25] md:-right-8"
            style={{ animationDuration: "5.5s", animationDelay: "-0.5s", "--sparkle-base-opacity": "0.25" } as React.CSSProperties}
          />
        </div>

        <div className="mt-16 flex flex-col">
          {copy.items.map((item, idx) => {
            const Icon = featureIcons[idx]
            const Visual = featureVisuals[idx]
            const reversed = idx % 2 !== 0
            return (
              <div key={idx}>
                {/* Separator sparkle between rows */}
                {idx > 0 && (
                  <div className="flex justify-center py-10" aria-hidden="true">
                    <SparkleStar
                      points={idx % 2 === 0 ? 6 : 4}
                      size={16}
                      color={separatorColors[(idx - 1) % 3]}
                      className="sparkle-twinkle opacity-[0.22]"
                      style={{
                        animationDuration: `${3.5 + idx * 0.4}s`,
                        animationDelay: `${-idx * 1.2}s`,
                        "--sparkle-base-opacity": "0.22",
                      } as React.CSSProperties}
                    />
                  </div>
                )}

                <div
                  className={`reveal flex flex-col items-center gap-8 md:flex-row md:gap-14 ${reversed ? "md:flex-row-reverse" : ""}`}
                  style={{ transitionDelay: `${120 + idx * 90}ms` }}
                  data-reveal
                >
                  {/* Text side */}
                  <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[hsl(var(--flame-deep)/0.1)] to-[hsl(var(--flame-hot)/0.1)]">
                      <Icon
                        className="h-7 w-7 text-primary"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-foreground md:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-md text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                      {item.description}
                    </p>
                  </div>

                  {/* Visual side — unique abstract decoration per feature */}
                  <div className="flex flex-1 items-center justify-center">
                    <div
                      className="pointer-events-none w-full max-w-[320px] rounded-3xl border border-border/50 bg-card/80 p-5 shadow-lg shadow-background/30 transition-[border-color,box-shadow] hover:border-primary/30 hover:shadow-[0_0_20px_hsl(var(--flame-core)/0.08)]"
                      aria-hidden="true"
                    >
                      <Visual />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTAs — stacked centered */}
        <div
          className="reveal mt-20 flex flex-col items-center gap-5"
          style={{ transitionDelay: "500ms" }}
          data-reveal
        >
          <a
            href={LINKS.telegramBot}
            target="_blank"
            rel="noopener noreferrer"
            className="interactive-ease hover-lift press-pop cta-shimmer inline-flex min-h-[60px] items-center gap-3 rounded-2xl bg-primary px-12 py-4 text-lg font-bold text-primary-foreground shadow-[0_0_40px_hsl(212_100%_55%/0.25)] transition-all hover:shadow-[0_0_70px_hsl(212_100%_55%/0.4)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary md:min-h-[64px] md:text-xl"
            aria-label={copy.ctaPrimaryAria}
          >
            <Flame className="h-6 w-6" aria-hidden="true" />
            {copy.ctaPrimary}
          </a>
          <a
            href={LINKS.knowledgeBase}
            className="interactive-ease text-base font-semibold text-muted-foreground underline decoration-primary/30 underline-offset-4 transition-colors hover:text-foreground hover:decoration-primary/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            aria-label={copy.ctaSecondaryAria}
          >
            {copy.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  )
}
