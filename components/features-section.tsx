"use client"

import { Mic, SunMedium, MonitorPlay, ClipboardCheck } from "lucide-react"

import { LINKS } from "@/lib/site-config"
import { getI18n } from "@/lib/i18n"
import { useLanguage } from "@/components/language-provider"

const featureIcons = [Mic, SunMedium, MonitorPlay, ClipboardCheck] as const

/* Decorative gradient blob — purely visual placeholder for future illustrations */
function FeatureBlob({ index }: { index: number }) {
  const hues = ["212 100% 47%", "200 100% 36%", "260 60% 55%", "35 90% 55%"]
  return (
    <div
      className="pointer-events-none flex items-center justify-center rounded-3xl"
      aria-hidden="true"
    >
      <svg viewBox="0 0 280 200" className="h-full w-full max-h-[200px]">
        <defs>
          <radialGradient id={`feat-blob-${index}`} cx="40%" cy="40%" r="60%">
            <stop offset="0" stopColor={`hsl(${hues[index]} / 0.25)`} />
            <stop offset="1" stopColor="transparent" />
          </radialGradient>
        </defs>
        <rect
          width="280"
          height="200"
          rx="24"
          fill={`url(#feat-blob-${index})`}
        />
        <circle
          cx={140 + (index % 2 === 0 ? 30 : -30)}
          cy={100}
          r={50 + index * 5}
          fill={`hsl(${hues[index]} / 0.12)`}
        />
      </svg>
    </div>
  )
}

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
      </div>

      <div className="mx-auto max-w-6xl">
        <h2
          id="features"
          className="anchor-target reveal text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
          data-reveal
        >
          {copy.title}
        </h2>

        <div className="mt-16 flex flex-col gap-20">
          {copy.items.map((item, idx) => {
            const Icon = featureIcons[idx]
            const reversed = idx % 2 !== 0
            return (
              <div
                key={idx}
                className={`reveal flex flex-col items-center gap-8 md:flex-row md:gap-14 ${reversed ? "md:flex-row-reverse" : ""}`}
                style={{ transitionDelay: `${120 + idx * 90}ms` }}
                data-reveal
              >
                {/* Text side */}
                <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
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

                {/* Visual side — abstract gradient blob placeholder */}
                <div className="flex flex-1 items-center justify-center">
                  <div className="w-full max-w-[320px] rounded-3xl border border-border/40 bg-card/80 p-6 shadow-lg shadow-background/30">
                    <FeatureBlob index={idx} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTAs */}
        <div
          className="reveal mt-20 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          style={{ transitionDelay: "500ms" }}
          data-reveal
        >
          <a
            href={LINKS.telegramBot}
            target="_blank"
            rel="noopener noreferrer"
            className="interactive-ease hover-lift press-pop inline-flex min-h-[56px] items-center gap-3 rounded-2xl bg-primary px-10 py-4 text-lg font-bold text-primary-foreground shadow-[0_0_40px_hsl(212_100%_55%/0.25)] transition-all hover:shadow-[0_0_70px_hsl(212_100%_55%/0.4)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            aria-label={copy.ctaPrimaryAria}
          >
            {copy.ctaPrimary}
          </a>
          <a
            href={LINKS.knowledgeBase}
            className="interactive-ease hover-lift press-pop inline-flex min-h-[56px] items-center gap-3 rounded-2xl border-2 border-primary/30 bg-card px-10 py-4 text-lg font-semibold text-foreground transition-all hover:border-primary/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            aria-label={copy.ctaSecondaryAria}
          >
            {copy.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  )
}
