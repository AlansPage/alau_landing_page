"use client"

import Image from "next/image"
import { Flame } from "lucide-react"

import { LINKS } from "@/lib/site-config"
import { getI18n } from "@/lib/i18n"
import { useLanguage } from "@/components/language-provider"
import { StarFigure } from "@/components/decorations/star-figure"
import { SparkleStar } from "@/components/decorations/sparkle-star"
import { MiniSparkle } from "@/components/decorations/mini-sparkle"

const featureImages = [
  "/images/icon1.png",
  "/images/icon2.png",
  "/images/icon3.png",
  "/images/icon4.png",
] as const

/* Separator sparkle between feature rows */
const separatorColors = ["hsl(280 60% 65%)", "hsl(35 90% 60%)", "hsl(340 70% 65%)"]

export function FeaturesSection() {
  const { lang } = useLanguage()
  const copy = getI18n(lang).features

  return (
    <section
      aria-labelledby="features"
      className="relative px-6 py-12 md:py-16 lg:px-8 lg:py-20"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/4 top-20 h-72 w-72 rounded-full bg-primary/8 blur-[140px]" />
        <div className="absolute bottom-20 right-1/4 h-56 w-56 rounded-full bg-accent/6 blur-[120px]" />
        {/* Reaching figure — right margin */}
        <div
          className="figure-sway absolute right-[2%] top-[28%] hidden opacity-[0.12] md:block"
          style={{ animationDuration: "14s", animationDelay: "-5s" }}
        >
          <StarFigure pose="reaching" size={85} />
        </div>
        <SparkleStar points={4} size={14} color="hsl(35 90% 60%)" className="sparkle-twinkle absolute right-[1%] top-[26%] hidden opacity-[0.14] md:block" style={{ animationDuration: "3.8s", animationDelay: "-1s" }} />
        <MiniSparkle size={10} color="hsl(280 60% 65%)" className="sparkle-twinkle absolute right-[6%] top-[40%] hidden opacity-[0.12] md:block" style={{ animationDuration: "4.2s", animationDelay: "-2.4s" }} />

        {/* Dancing figure — left side */}
        <div
          className="figure-sway absolute left-[2%] top-[55%] hidden opacity-[0.09] md:block"
          style={{ animationDuration: "17s", animationDelay: "-9s" }}
        >
          <StarFigure pose="dancing" size={65} />
        </div>
        <SparkleStar points={6} size={12} color="hsl(340 70% 65%)" className="sparkle-twinkle absolute left-[1%] top-[53%] hidden opacity-[0.11] md:block" style={{ animationDuration: "4.6s", animationDelay: "-0.8s" }} />
        <MiniSparkle size={8} color="hsl(35 90% 60%)" className="sparkle-twinkle absolute left-[5%] top-[65%] hidden opacity-[0.10] md:block" style={{ animationDuration: "3.4s", animationDelay: "-2s" }} />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="relative inline-block">
          <h2
            id="features"
            className="anchor-target reveal text-balance text-2xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
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
                    <h3 className="text-xl font-semibold text-foreground md:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-md text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                      {item.description}
                    </p>
                  </div>

                  {/* Visual side — platform feature icon */}
                  <div className="flex flex-1 items-center justify-center">
                    <div
                      className="flex h-40 w-40 items-center justify-center rounded-2xl border border-border/20 bg-[hsl(var(--paper-bg)/0.72)] shadow-[inset_0_1px_0_hsl(var(--background)/0.8)] md:h-52 md:w-52"
                    >
                      <div className="relative h-28 w-28 overflow-hidden rounded-2xl ring-1 ring-border/15 md:h-40 md:w-40">
                        <Image
                          src={featureImages[idx]}
                          alt=""
                          fill
                          className="object-cover object-center mix-blend-multiply"
                          sizes="(min-width: 768px) 160px, 112px"
                        />
                      </div>
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
            className="interactive-ease hover-lift press-pop cta-shimmer inline-flex min-h-[56px] items-center gap-3 rounded-2xl bg-primary px-8 py-3 text-base font-bold text-primary-foreground shadow-[0_0_40px_hsl(212_100%_55%/0.25)] transition-all hover:shadow-[0_0_70px_hsl(212_100%_55%/0.4)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary md:min-h-[64px] md:px-10 md:py-4 md:text-lg"
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
