"use client"

import { Eye, Ear, Hand, Brain } from "lucide-react"

import { getI18n } from "@/lib/i18n"
import { useLanguage } from "@/components/language-provider"
import { StarFigure } from "@/components/decorations/star-figure"
import { SparkleStar } from "@/components/decorations/sparkle-star"
import { MiniSparkle } from "@/components/decorations/mini-sparkle"

const audienceIcons = [Eye, Ear, Hand, Brain] as const

export function AudienceSection() {
  const { lang } = useLanguage()
  const copy = getI18n(lang).audience
  const audienceCards = copy.cards.map((card, index) => ({
    icon: audienceIcons[index],
    ...card,
  }))

  return (
    <section
      aria-labelledby="audience"
      className="relative px-6 py-24 md:py-32 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-10 h-64 w-[420px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
        {/* Dancing pair — far-left, between audience and how-it-works */}
        <div
          className="figure-sway absolute bottom-4 left-[3%] hidden opacity-[0.10] md:flex md:items-end md:gap-2"
          style={{ animationDuration: "16s", animationDelay: "-2s" }}
        >
          <StarFigure pose="dancing" size={80} />
        </div>
        <div
          className="figure-sway absolute bottom-6 left-[9%] hidden opacity-[0.10] md:block"
          style={{ animationDuration: "12s", animationDelay: "-6s" }}
        >
          <StarFigure pose="dancing" size={80} style={{ transform: "scaleX(-1)" }} />
        </div>
        <SparkleStar points={6} size={16} color="hsl(280 60% 65%)" className="sparkle-twinkle absolute bottom-24 left-[5%] hidden opacity-[0.15] md:block" style={{ animationDuration: "4.2s", animationDelay: "-1s" }} />
        <MiniSparkle size={10} color="hsl(35 90% 60%)" className="sparkle-twinkle absolute bottom-12 left-[12%] hidden opacity-[0.13] md:block" style={{ animationDuration: "3.6s", animationDelay: "-2.5s" }} />
        <SparkleStar points={4} size={12} color="hsl(340 70% 65%)" className="sparkle-twinkle absolute bottom-28 left-[14%] hidden opacity-[0.11] md:block" style={{ animationDuration: "4.8s", animationDelay: "-0.8s" }} />
      </div>
      <div className="mx-auto max-w-6xl">
        <div className="relative inline-block">
          <h2
            id="audience"
            className="anchor-target reveal text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
            data-reveal
          >
            {copy.title}
          </h2>
          <SparkleStar
            points={6} size={24} color="hsl(280 60% 65%)"
            className="sparkle-pulse absolute -top-3 -right-6 opacity-[0.25] md:-right-8"
            style={{ animationDuration: "5.2s", animationDelay: "-1s", "--sparkle-base-opacity": "0.25" } as React.CSSProperties}
          />
        </div>

        {/* Soft surface panel behind cards (airy / EPAM-like rhythm) */}
        <div
          className="reveal mt-14 rounded-[2.5rem] border border-border/30 bg-surface/70 p-6 shadow-xl shadow-background/50 shadow-[inset_0_1px_0_hsl(var(--flame-glow))] backdrop-blur-sm sm:p-8 lg:p-10"
          style={{ transitionDelay: "120ms" }}
          data-reveal
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {audienceCards.map((card, idx) => (
              <article
                key={card.title}
                aria-label={card.ariaLabel}
                className="hover-lift relative flex flex-col overflow-hidden rounded-3xl border border-border/50 bg-card p-7 shadow-lg shadow-background/40 transition-[border-color,box-shadow] hover:border-primary/30 hover:shadow-[0_0_20px_hsl(var(--flame-core)/0.08)]"
              >
                {/* Decorative background pattern */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.30]"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 220 220" className="h-full w-full">
                    <defs>
                      <radialGradient id={`aud-${idx}`} cx="30%" cy="25%" r="80%">
                        <stop offset="0" stopColor="hsl(212 100% 47% / 0.22)" />
                        <stop offset="1" stopColor="transparent" />
                      </radialGradient>
                    </defs>
                    <rect width="220" height="220" fill={`url(#aud-${idx})`} />
                    <path
                      d="M-10 150 C 40 100, 90 210, 140 150 S 220 140, 250 80"
                      fill="none"
                      stroke="hsl(200 100% 44% / 0.20)"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                {/* Icon in rounded square container */}
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[hsl(var(--flame-deep)/0.1)] to-[hsl(var(--flame-hot)/0.1)]">
                  <card.icon
                    className="h-8 w-8 text-primary"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="relative mt-6 text-xl font-semibold text-foreground">
                  {card.title}
                </h3>
                <p className="relative mt-3 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                  {card.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
