"use client"

import { Flame } from "lucide-react"

import { LINKS } from "@/lib/site-config"
import { getI18n } from "@/lib/i18n"
import { useLanguage } from "@/components/language-provider"
import { StarFigure } from "@/components/decorations/star-figure"
import { SparkleStar } from "@/components/decorations/sparkle-star"
import { MiniSparkle } from "@/components/decorations/mini-sparkle"

/* Central starburst — bright white core, flame-blue rays fading to deep navy */
function HeroStarburst() {
  const rays = [
    { angle: -90, len: 62, w: 3.2 },
    { angle: -45, len: 44, w: 2.4 },
    { angle: 0, len: 56, w: 3 },
    { angle: 40, len: 48, w: 2.6 },
    { angle: 90, len: 60, w: 3.2 },
    { angle: 135, len: 42, w: 2.4 },
    { angle: 180, len: 54, w: 2.8 },
    { angle: -135, len: 46, w: 2.6 },
  ]

  return (
    <svg viewBox="0 0 200 200" className="h-full w-full">
      <defs>
        <radialGradient id="ray-grad">
          <stop offset="0%" stopColor="hsl(var(--flame-core))" />
          <stop offset="100%" stopColor="hsl(var(--flame-deep))" stopOpacity="0.4" />
        </radialGradient>
      </defs>

      {/* Rays */}
      {rays.map((ray, i) => {
        const rad = (ray.angle * Math.PI) / 180
        const cx = 100
        const cy = 100
        const x1 = cx + Math.cos(rad) * 10
        const y1 = cy + Math.sin(rad) * 10
        const x2 = cx + Math.cos(rad) * ray.len
        const y2 = cy + Math.sin(rad) * ray.len
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="url(#ray-grad)"
            strokeWidth={ray.w}
            strokeLinecap="round"
            opacity={0.7 + (i % 3) * 0.1}
          />
        )
      })}

      {/* Bright white center */}
      <circle cx="100" cy="100" r="12" fill="white" opacity="0.95" />
      <circle cx="100" cy="100" r="7" fill="white" />
      {/* Core glow ring */}
      <circle
        cx="100"
        cy="100"
        r="18"
        fill="none"
        stroke="hsl(var(--flame-hot))"
        strokeWidth="1.5"
        opacity="0.35"
      />
    </svg>
  )
}

/* Horizontal wavy reflection lines — like the blue spark tattoo reference */
function ReflectionLines() {
  return (
    <svg viewBox="0 0 200 60" className="w-full max-w-[260px]">
      <path
        d="M30 12 C 60 8, 80 16, 110 12 S 150 8, 180 12"
        fill="none"
        stroke="hsl(var(--flame-core))"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M40 24 C 65 20, 90 28, 115 24 S 145 20, 170 24"
        fill="none"
        stroke="hsl(var(--flame-hot))"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M50 36 C 70 33, 95 39, 120 36 S 150 33, 165 36"
        fill="none"
        stroke="hsl(var(--flame-core))"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.3"
      />
      <path
        d="M55 46 C 75 43, 100 49, 125 46 S 148 44, 158 46"
        fill="none"
        stroke="hsl(var(--flame-deep))"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.2"
      />
    </svg>
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
      {/* Background glow — falling-star positioned, bigger and brighter */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-20 left-[40%] h-[900px] w-[1100px] -translate-x-1/2 rounded-full bg-primary/18 blur-[180px]" />
        <div className="absolute -bottom-32 right-0 h-[400px] w-[600px] rounded-full bg-accent/5 blur-[100px]" />
        {/* Reaching figure — top right margin */}
        <div className="absolute right-[3%] top-16 hidden opacity-[0.12] md:block">
          <StarFigure pose="reaching" size={90} />
        </div>
        <MiniSparkle size={7} color="hsl(280 60% 65%)" className="absolute right-[8%] top-12 hidden opacity-[0.14] md:block" />
        <MiniSparkle size={6} color="hsl(35 90% 60%)" className="absolute right-[2%] top-32 hidden opacity-[0.12] md:block" />
        <MiniSparkle size={5} color="hsl(195 100% 55%)" className="absolute right-[6%] top-[10rem] hidden opacity-[0.10] md:block" />
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
            <span
              className="text-primary"
              style={{ textShadow: "0 0 40px hsl(var(--primary) / 0.3)" }}
            >
              {copy.titleAccent}
            </span>
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

          {/* Mobile sparkles — visible only below md */}
          <div className="mt-8 flex items-center justify-center gap-6 md:hidden" aria-hidden="true">
            <SparkleStar
              points={6} size={20} color="hsl(280 60% 65%)"
              className="sparkle-twinkle opacity-[0.25]"
              style={{ animationDuration: "4s", animationDelay: "-1s", "--sparkle-base-opacity": "0.25" } as React.CSSProperties}
            />
            <SparkleStar
              points={4} size={14} color="hsl(35 90% 60%)"
              className="sparkle-twinkle opacity-[0.22]"
              style={{ animationDuration: "3.5s", animationDelay: "-2s", "--sparkle-base-opacity": "0.22" } as React.CSSProperties}
            />
            <MiniSparkle
              size={12} color="hsl(340 70% 65%)"
              className="sparkle-twinkle opacity-[0.20]"
              style={{ animationDuration: "4.4s", animationDelay: "-0.6s", "--sparkle-base-opacity": "0.20" } as React.CSSProperties}
            />
          </div>
        </div>

        {/* Abstract glowing star composition */}
        <div
          className="relative hidden flex-1 md:flex md:flex-col md:items-center md:justify-center"
          aria-hidden="true"
          role="presentation"
        >
          {/* Soft glow behind — pulsing */}
          <div className="hero-star-glow absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,hsl(var(--flame-core)/0.3)_0%,hsl(var(--flame-hot)/0.1)_40%,transparent_70%)] lg:h-[400px] lg:w-[400px]" />

          {/* Central starburst */}
          <div className="relative h-[240px] w-[240px] lg:h-[300px] lg:w-[300px]">
            <HeroStarburst />
          </div>

          {/* Wavy reflection lines below */}
          <div className="mt-4 opacity-70">
            <ReflectionLines />
          </div>

          {/* Reaching figure — bottom-left, reaching toward the star */}
          <div
            className="figure-sway absolute bottom-0 left-[2%] opacity-[0.18] lg:left-[5%]"
            style={{ animationDuration: "14s", animationDelay: "-3s" }}
          >
            <StarFigure pose="reaching" size={100} />
          </div>

          {/* Dancing figure — right side */}
          <div
            className="figure-sway absolute right-[0%] top-[30%] opacity-[0.14] lg:right-[2%]"
            style={{ animationDuration: "16s", animationDelay: "-7s" }}
          >
            <StarFigure pose="dancing" size={70} />
          </div>

          {/* Scattered sparkles — this IS the illustration, so more visible */}
          <SparkleStar
            points={6} size={22} color="hsl(280 60% 65%)"
            className="sparkle-twinkle absolute left-[8%] top-[15%] opacity-[0.26]"
            style={{ animationDuration: "4.2s", animationDelay: "-1s", "--sparkle-base-opacity": "0.26" } as React.CSSProperties}
          />
          <SparkleStar
            points={4} size={16} color="hsl(35 90% 60%)"
            className="sparkle-twinkle absolute right-[6%] top-[12%] opacity-[0.22]"
            style={{ animationDuration: "3.6s", animationDelay: "-2.4s", "--sparkle-base-opacity": "0.22" } as React.CSSProperties}
          />
          <SparkleStar
            points={6} size={18} color="hsl(340 70% 65%)"
            className="sparkle-twinkle absolute bottom-[18%] right-[12%] opacity-[0.20]"
            style={{ animationDuration: "4.8s", animationDelay: "-0.5s", "--sparkle-base-opacity": "0.20" } as React.CSSProperties}
          />
          <MiniSparkle
            size={14} color="hsl(280 60% 65%)"
            className="sparkle-twinkle absolute left-[18%] bottom-[28%] opacity-[0.24]"
            style={{ animationDuration: "3.4s", animationDelay: "-1.8s", "--sparkle-base-opacity": "0.24" } as React.CSSProperties}
          />
          <SparkleStar
            points={4} size={12} color="hsl(35 90% 60%)"
            className="sparkle-twinkle absolute left-[4%] top-[55%] opacity-[0.18]"
            style={{ animationDuration: "5s", animationDelay: "-3.2s", "--sparkle-base-opacity": "0.18" } as React.CSSProperties}
          />
          <MiniSparkle
            size={10} color="hsl(340 70% 65%)"
            className="sparkle-twinkle absolute right-[3%] bottom-[40%] opacity-[0.15]"
            style={{ animationDuration: "3.8s", animationDelay: "-0.8s", "--sparkle-base-opacity": "0.15" } as React.CSSProperties}
          />
        </div>
      </div>
    </section>
  )
}
