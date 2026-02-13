"use client"

import { Flame, Sparkles, Accessibility, PanelsTopLeft } from "lucide-react"

import { LINKS } from "@/lib/site-config"
import { getI18n } from "@/lib/i18n"
import { useLanguage } from "@/components/language-provider"

function HeroCollage({ copy }: { copy: ReturnType<typeof getI18n>["hero"] }) {
  return (
    <div
      className="relative hidden flex-1 md:flex md:items-center md:justify-center"
      aria-hidden="true"
      role="presentation"
    >
      <div className="relative h-[460px] w-[390px] lg:h-[540px] lg:w-[460px]">
        <div className="hero-glow hero-tile-c absolute left-8 top-12 h-[340px] w-[310px] rounded-[2.2rem] border border-border/45 bg-card/95 shadow-[0_28px_70px_hsl(var(--foreground)/0.1)] lg:left-12 lg:top-16 lg:h-[380px] lg:w-[340px]">
          <div className="absolute inset-0 rounded-[2.2rem] bg-[linear-gradient(140deg,hsl(212_100%_47%/.12),transparent_45%,hsl(200_100%_44%/.08))]" />
          <div className="absolute left-6 right-6 top-6 h-10 rounded-2xl border border-border/35 bg-background/90" />
          <div className="absolute left-6 right-6 top-20 rounded-3xl border border-primary/20 bg-primary/10 p-5">
            <div className="h-2.5 w-[72%] rounded-full bg-primary/50" />
            <div className="mt-3 h-2 w-[60%] rounded-full bg-primary/35" />
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="h-16 rounded-2xl border border-border/40 bg-background/85" />
              <div className="h-16 rounded-2xl border border-border/40 bg-background/85" />
            </div>
          </div>
          <div className="absolute left-6 right-6 top-[18rem] h-1.5 rounded-full bg-accent/45 lg:top-[19.8rem]" />
        </div>

        <div className="hero-glow hero-tile-a hero-tile-hover absolute -left-2 top-10 flex h-[5.5rem] w-44 items-center gap-3 rounded-2xl border border-primary/25 bg-card/95 px-5 shadow-lg shadow-background/40">
          <Sparkles className="h-5 w-5 shrink-0 text-primary" />
          <span className="text-sm font-semibold leading-tight text-foreground">
            {copy.collage.accessibleTitle}
          </span>
        </div>

        <div className="hero-glow hero-tile-b hero-tile-hover absolute -right-2 top-8 flex h-[5.5rem] w-44 items-center gap-3 rounded-2xl border border-accent/25 bg-card/95 px-5 shadow-lg shadow-background/40 lg:top-10">
          <Accessibility className="h-5 w-5 shrink-0 text-accent" />
          <span className="text-sm font-semibold leading-tight text-foreground">
            {copy.collage.calmTitle}
          </span>
        </div>

        <div className="hero-glow hero-tile-b hero-tile-hover absolute -left-1 top-[19.5rem] flex h-[5.5rem] w-48 items-center gap-3 rounded-2xl border border-border/40 bg-card/95 px-5 shadow-lg shadow-background/35 lg:top-[22rem]">
          <PanelsTopLeft className="h-5 w-5 shrink-0 text-primary" />
          <span className="text-sm font-semibold leading-tight text-foreground">
            {copy.collage.accessibleSubtitle}
          </span>
        </div>

        <div className="hero-glow hero-tile-a hero-tile-hover absolute right-0 top-[20rem] flex h-[6.5rem] w-[6.5rem] items-center justify-center rounded-3xl border border-border/40 bg-card/95 shadow-lg shadow-background/35 lg:top-[23rem]">
          <Flame className="h-10 w-10 text-primary" />
        </div>
      </div>
    </div>
  )
}

export function HeroSection() {
  const { lang } = useLanguage()
  const copy = getI18n(lang).hero

  return (
    <section
      aria-labelledby="hero-heading"
      className="hero relative overflow-hidden px-6 pb-24 pt-16 md:pb-32 md:pt-20 lg:px-8"
    >
      {/* Background glow layers */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-40 left-1/2 h-[700px] w-[900px] -translate-x-1/2 rounded-full bg-primary/12 blur-[140px]" />
        <div className="absolute -bottom-32 right-0 h-[400px] w-[600px] rounded-full bg-accent/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 md:grid-cols-[1.08fr_0.92fr] md:gap-10 lg:gap-16">
        {/* Text content */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <h1
            id="hero-heading"
            className="anchor-target-zero hero-title reveal max-w-[14ch] text-balance text-5xl font-extrabold leading-[1.04] tracking-tight text-foreground md:text-6xl lg:text-7xl"
            data-reveal
          >
            {copy.titlePrefix}
            <span className="text-primary">{copy.titleAccent}</span>
            {copy.titleSuffix}
          </h1>
          <p
            className="subhead hero-subhead reveal mt-8 max-w-md text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
            style={{ transitionDelay: "120ms" }}
            data-reveal
          >
            {copy.subtitle}
          </p>

          <a
            href={LINKS.telegramBot}
            target="_blank"
            rel="noopener noreferrer"
            className="interactive-ease reveal hover-lift press-pop cta-shimmer group mt-10 inline-flex min-h-[56px] items-center gap-3 rounded-2xl bg-primary px-10 py-4 text-lg font-bold text-primary-foreground shadow-[0_0_40px_hsl(212_100%_55%/0.25)] transition-all hover:shadow-[0_0_70px_hsl(212_100%_55%/0.4)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary md:min-h-[64px] md:text-xl"
            aria-label={copy.ctaAria}
            style={{ transitionDelay: "260ms" }}
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
