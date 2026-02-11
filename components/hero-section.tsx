"use client"

import { Flame, Sparkles, Accessibility, ArrowRight } from "lucide-react"

import { LINKS } from "@/lib/site-config"
import { getI18n } from "@/lib/i18n"
import { useLanguage } from "@/components/language-provider"

const featureIcons = [Sparkles, Accessibility, ArrowRight] as const

function HeroCollage({ copy }: { copy: ReturnType<typeof getI18n>["hero"] }) {
  return (
    <div
      className="relative hidden flex-1 md:flex md:items-center md:justify-center"
      aria-hidden="true"
      role="presentation"
    >
      <div className="relative h-[420px] w-[360px] lg:h-[480px] lg:w-[420px]">
        {/* Big tile */}
        <div className="float-slow absolute left-0 top-0 flex h-52 w-52 items-center justify-center rounded-[2rem] border border-border/40 bg-card shadow-xl shadow-background/40 lg:h-60 lg:w-60">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-primary/10">
            <Flame className="h-12 w-12 text-primary" />
          </div>
        </div>

        {/* Label tile (no numeric claims) */}
        <div className="float-slower absolute right-0 top-10 flex h-36 w-40 flex-col items-start justify-end rounded-[1.75rem] border border-primary/20 bg-primary/5 p-6 lg:h-40 lg:w-44">
          <span className="text-xl font-extrabold text-foreground">
            {copy.collage.accessibleTitle}
          </span>
          <span className="mt-1 text-sm font-medium text-muted-foreground">
            {copy.collage.accessibleSubtitle}
          </span>
        </div>

        {/* Illustration tile (abstract svg) */}
        <div className="float-slow absolute left-10 top-56 h-32 w-44 overflow-hidden rounded-[1.75rem] border border-border/40 bg-card shadow-lg shadow-background/30 lg:top-64 lg:h-36 lg:w-52">
          <svg
            viewBox="0 0 240 160"
            className="h-full w-full"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stopColor="hsl(212 100% 47% / 0.20)" />
                <stop offset="1" stopColor="hsl(200 100% 44% / 0.10)" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="240" height="160" fill="url(#g1)" />
            <path
              d="M-10 120 C 40 60, 90 160, 140 100 S 240 80, 260 40"
              fill="none"
              stroke="hsl(212 100% 47% / 0.55)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M-10 90 C 50 40, 110 130, 150 70 S 230 60, 260 20"
              fill="none"
              stroke="hsl(200 100% 44% / 0.35)"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Calm tile */}
        <div className="float-slower absolute bottom-0 right-6 flex h-40 w-56 flex-col items-start justify-end rounded-[2rem] border border-accent/20 bg-accent/5 p-7 lg:h-44 lg:w-64">
          <span className="text-xl font-extrabold text-foreground">
            {copy.collage.calmTitle}
          </span>
          <span className="mt-1 text-sm font-medium text-muted-foreground">
            {copy.collage.calmSubtitle}
          </span>
        </div>

        {/* Small sparkle tile */}
        <div className="float-slow absolute right-44 top-48 flex h-20 w-20 items-center justify-center rounded-3xl border border-border/40 bg-card shadow-md shadow-background/25 lg:right-52 lg:top-52">
          <Sparkles className="h-7 w-7 text-primary" />
        </div>
      </div>
    </div>
  )
}

export function HeroSection() {
  const { lang } = useLanguage()
  const copy = getI18n(lang).hero
  const featureTiles = copy.features.map((feature, index) => ({
    icon: featureIcons[index],
    title: feature.title,
    description: feature.description,
  }))

  return (
    <section
      aria-labelledby="hero-heading"
      className="anchor-target relative overflow-hidden px-6 pb-24 pt-16 md:pb-32 md:pt-24 lg:px-8"
      id="hero"
    >
      {/* Background glow layers */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-40 left-1/2 h-[700px] w-[900px] -translate-x-1/2 rounded-full bg-primary/8 blur-[120px]" />
        <div className="absolute -bottom-32 right-0 h-[400px] w-[600px] rounded-full bg-accent/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-16 md:flex-row md:items-center md:gap-20">
        {/* Text content */}
        <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
          <h1
            id="hero-heading"
            className="reveal text-balance text-5xl font-extrabold leading-[1.1] tracking-tight text-foreground md:text-6xl lg:text-7xl"
            data-reveal
          >
            {copy.titlePrefix}
            <span className="text-primary">{copy.titleAccent}</span>
            {copy.titleSuffix}
          </h1>
          <p
            className="reveal mt-8 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl"
            style={{ transitionDelay: "120ms" }}
            data-reveal
          >
            {copy.subtitle}
          </p>

          {/* Small feature tiles (no extra CTAs) */}
          <div className="mt-10 grid w-full max-w-xl grid-cols-1 gap-4 sm:grid-cols-3">
            {featureTiles.map((tile, index) => (
              <div
                key={tile.title}
                className="reveal hover-lift rounded-2xl border border-border/40 bg-card px-5 py-4 shadow-sm shadow-background/30"
                style={{ transitionDelay: `${200 + index * 90}ms` }}
                data-reveal
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <tile.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-foreground">
                      {tile.title}
                    </p>
                    <p className="mt-1 text-sm leading-snug text-muted-foreground">
                      {tile.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <a
            href={LINKS.telegramBot}
            target="_blank"
            rel="noopener noreferrer"
            className="reveal hover-lift press-pop group mt-12 inline-flex min-h-[56px] items-center gap-3 rounded-2xl bg-primary px-10 py-4 text-lg font-bold text-primary-foreground shadow-[0_0_40px_hsl(212_100%_55%/0.25)] transition-all hover:shadow-[0_0_60px_hsl(212_100%_55%/0.35)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary md:min-h-[64px] md:text-xl"
            aria-label={copy.ctaAria}
            style={{ transitionDelay: "380ms" }}
            data-reveal
          >
            <Flame
              className="h-6 w-6 transition-transform group-hover:scale-110"
              aria-hidden="true"
            />
            {copy.cta}
          </a>
        </div>

        {/* Decorative collage tiles */}
        <HeroCollage copy={copy} />
      </div>
    </section>
  )
}
