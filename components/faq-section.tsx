"use client"

import { ChevronDown } from "lucide-react"

import { getI18n } from "@/lib/i18n"
import { useLanguage } from "@/components/language-provider"
import { StarFigure } from "@/components/decorations/star-figure"
import { SparkleStar } from "@/components/decorations/sparkle-star"
import { MiniSparkle } from "@/components/decorations/mini-sparkle"

export function FaqSection() {
  const { lang } = useLanguage()
  const copy = getI18n(lang).faq

  return (
    <section
      aria-labelledby="faq"
      className="relative px-6 py-24 md:py-32 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-10 top-20 h-48 w-48 rounded-full bg-accent/6 blur-[110px]" />
        {/* Holding figure — far-right, calm breathe */}
        <div
          className="figure-breathe absolute right-[3%] top-[30%] hidden opacity-[0.10] md:block"
          style={{ animationDuration: "12s", animationDelay: "-5s" }}
        >
          <StarFigure pose="holding" size={70} />
        </div>
        {/* Constellation cluster — right margin */}
        <SparkleStar points={6} size={22} color="hsl(280 60% 65%)" className="absolute right-[5%] top-[18%] hidden opacity-[0.14] md:block" />
        <SparkleStar points={4} size={16} color="hsl(35 90% 60%)" className="absolute right-[3%] top-[35%] hidden opacity-[0.12] md:block" />
        <SparkleStar points={4} size={12} color="hsl(340 70% 65%)" className="absolute right-[8%] top-[52%] hidden opacity-[0.10] md:block" />
        <SparkleStar points={6} size={18} color="hsl(280 60% 65%)" className="absolute right-[4%] top-[68%] hidden opacity-[0.13] md:block" />
        <MiniSparkle size={7} color="hsl(195 100% 55%)" className="absolute right-[6%] top-[26%] hidden opacity-[0.11] md:block" />
        <MiniSparkle size={6} color="hsl(35 90% 60%)" className="absolute right-[9%] top-[44%] hidden opacity-[0.09] md:block" />
        <MiniSparkle size={5} color="hsl(280 60% 65%)" className="absolute right-[3%] top-[58%] hidden opacity-[0.10] md:block" />
        <MiniSparkle size={6} color="hsl(340 70% 65%)" className="absolute right-[7%] top-[75%] hidden opacity-[0.08] md:block" />
      </div>

      <div className="mx-auto max-w-3xl">
        <div className="relative inline-block w-full">
          <h2
            id="faq"
            className="anchor-target reveal text-balance text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
            data-reveal
          >
            {copy.title}
          </h2>
          <SparkleStar
            points={4} size={28} color="hsl(340 70% 65%)"
            className="sparkle-pulse absolute -top-3 -right-6 opacity-[0.25] md:-right-8"
            style={{ animationDuration: "4.4s", animationDelay: "-2.8s", "--sparkle-base-opacity": "0.25" } as React.CSSProperties}
          />
        </div>

        <div className="mt-14 space-y-4">
          {copy.items.map((item, idx) => (
            <details
              key={idx}
              className="reveal group rounded-2xl border border-border/40 bg-card transition-[border-color,box-shadow] hover:border-primary/30 hover:shadow-[0_0_20px_hsl(var(--flame-core)/0.08)]"
              style={{ transitionDelay: `${140 + idx * 70}ms` }}
              data-reveal
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-base font-semibold text-foreground md:p-6 md:text-lg [&::-webkit-details-marker]:hidden">
                {item.question}
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <div className="px-5 pb-5 text-base leading-relaxed text-muted-foreground">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
