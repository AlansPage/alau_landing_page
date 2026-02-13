"use client"

import { Eye, Ear, Hand, Brain } from "lucide-react"

import { getI18n } from "@/lib/i18n"
import { useLanguage } from "@/components/language-provider"

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
      </div>
      <div className="mx-auto max-w-6xl">
        <h2
          id="audience"
          className="anchor-target reveal text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
          data-reveal
        >
          {copy.title}
        </h2>

        {/* Soft surface panel behind cards (airy / EPAM-like rhythm) */}
        <div
          className="reveal mt-14 rounded-[2.5rem] border border-border/40 bg-surface/70 p-6 shadow-xl shadow-background/50 sm:p-8 lg:p-10"
          style={{ transitionDelay: "120ms" }}
          data-reveal
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {audienceCards.map((card, idx) => (
              <article
                key={card.title}
                aria-label={card.ariaLabel}
                className="reveal hover-lift relative flex flex-col overflow-hidden rounded-3xl border border-border/50 bg-card p-7 shadow-lg shadow-background/40 transition-colors hover:border-primary/30"
                style={{ transitionDelay: `${220 + idx * 90}ms` }}
                data-reveal
              >
                {/* Decorative background pattern */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.22]"
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
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <card.icon
                    className="h-7 w-7 text-primary"
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
