"use client"

import Image from "next/image"
import { Flame } from "lucide-react"

import { LINKS } from "@/lib/site-config"
import { getI18n } from "@/lib/i18n"
import { useLanguage } from "@/components/language-provider"

export function HeroSection() {
  const { lang } = useLanguage()
  const copy = getI18n(lang).hero

  return (
    <section
      aria-labelledby="hero-heading"
      className="hero relative overflow-hidden px-6 pb-16 pt-16 md:pb-24 md:pt-20 lg:pb-32 lg:px-8"
    >
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 md:grid-cols-[1.08fr_0.92fr] md:gap-10 lg:gap-16">
        {/* Text content */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <div className="rounded-3xl bg-[hsl(var(--paper-bg)/0.38)] px-4 py-5 backdrop-blur-[2px] md:px-6 md:py-6">
            <h1
              id="hero-heading"
              className="anchor-target-zero hero-title reveal max-w-[14ch] text-balance text-4xl font-extrabold leading-[1.04] tracking-tight text-foreground md:text-6xl lg:text-7xl"
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
              className="interactive-ease reveal hover-lift press-pop cta-shimmer group mt-10 inline-flex min-h-[56px] items-center gap-3 rounded-2xl bg-primary px-8 py-3 text-base font-bold text-primary-foreground shadow-[0_0_40px_hsl(212_100%_55%/0.25)] transition-all hover:shadow-[0_0_70px_hsl(212_100%_55%/0.4)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary md:px-10 md:py-4 md:min-h-[64px] md:text-xl"
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
        </div>

        {/* Hero illustration */}
        <div
          className="relative flex flex-1 items-center justify-center md:justify-end"
          aria-hidden="true"
          role="presentation"
        >
          <div
            className="flex h-[248px] w-full max-w-[340px] items-center justify-center bg-transparent md:h-[420px] md:max-w-[540px] lg:h-[500px] lg:max-w-[620px]"
          >
            <div
              className="relative h-full w-full overflow-hidden bg-transparent"
              style={{
                WebkitMaskImage:
                  "radial-gradient(125% 115% at 50% 45%, black 60%, transparent 100%)",
                maskImage:
                  "radial-gradient(125% 115% at 50% 45%, black 60%, transparent 100%)",
              }}
            >
              <Image
                src="/images/hero-walkers.png"
                alt=""
                aria-hidden="true"
                fill
                priority
                sizes="(min-width: 1024px) 620px, (min-width: 768px) 540px, 340px"
                className="object-contain object-center opacity-[0.5] [filter:saturate(0.9)_contrast(0.95)_brightness(1.02)] mix-blend-multiply md:opacity-[0.62]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
