"use client"

import { getI18n } from "@/lib/i18n"
import { SparkleStar } from "@/components/decorations/sparkle-star"
import { useLanguage } from "@/components/language-provider"
import { StarFigure } from "@/components/decorations/star-figure"
import { MiniSparkle } from "@/components/decorations/mini-sparkle"

export function SocialProofSection() {
  const { lang } = useLanguage()
  const copy = getI18n(lang).socialProof

  return (
    <section
      aria-labelledby="testimonials"
      className="relative px-6 py-16 md:py-24 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute right-1/3 top-12 h-52 w-52 rounded-full bg-accent/8 blur-[120px]" />
        {/* Sitting figure — bottom-right, calm breathe animation */}
        <div
          className="figure-breathe absolute bottom-4 right-[4%] hidden opacity-[0.09] md:block"
          style={{ animationDuration: "10s", animationDelay: "-3s" }}
        >
          <StarFigure pose="sitting" size={75} />
        </div>
        <MiniSparkle size={10} color="hsl(280 60% 65%)" className="sparkle-twinkle absolute bottom-8 right-[3%] hidden opacity-[0.12] md:block" style={{ animationDuration: "4s", animationDelay: "-1.5s" }} />
        <SparkleStar points={4} size={12} color="hsl(35 90% 60%)" className="sparkle-twinkle absolute bottom-20 right-[8%] hidden opacity-[0.10] md:block" style={{ animationDuration: "3.6s", animationDelay: "-2.5s" }} />
        <MiniSparkle size={8} color="hsl(340 70% 65%)" className="sparkle-twinkle absolute bottom-4 right-[10%] hidden opacity-[0.09] md:block" style={{ animationDuration: "4.4s", animationDelay: "-0.8s" }} />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="relative inline-block">
          <h2
            id="testimonials"
            className="anchor-target reveal text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
            data-reveal
          >
            {copy.title}
          </h2>
          <SparkleStar
            points={4} size={20} color="hsl(280 60% 65%)"
            className="sparkle-pulse absolute -top-3 -right-6 opacity-[0.25] md:-right-8"
            style={{ animationDuration: "4.6s", animationDelay: "-3.2s", "--sparkle-base-opacity": "0.25" } as React.CSSProperties}
          />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {copy.quotes.map((quote, idx) => (
            <blockquote
              key={idx}
              className="reveal hover-lift relative rounded-3xl border border-border/50 border-l-4 border-l-primary bg-card p-7 shadow-lg shadow-background/40 transition-[border-color,box-shadow] hover:border-primary/30 hover:shadow-[0_0_20px_hsl(var(--flame-core)/0.08)]"
              style={{ transitionDelay: `${180 + idx * 90}ms` }}
              data-reveal
            >
              {/* Decorative quotation mark */}
              <svg
                className="pointer-events-none absolute left-5 top-4 h-10 w-10 text-primary/10"
                viewBox="0 0 40 40"
                aria-hidden="true"
              >
                <text
                  x="0"
                  y="36"
                  className="fill-current"
                  style={{ fontSize: "48px", fontFamily: "Georgia, serif" }}
                >
                  {"\u201C"}
                </text>
              </svg>

              <p className="relative mt-6 text-pretty text-base leading-relaxed text-foreground">
                {quote.text}
              </p>
              <footer className="relative mt-5 flex flex-col">
                <cite className="not-italic text-sm font-semibold text-foreground">
                  {quote.name}
                </cite>
                <span className="text-sm text-muted-foreground">
                  {quote.role}
                </span>
              </footer>
            </blockquote>
          ))}
        </div>

        <p className="mt-6 text-center text-sm italic text-muted-foreground">
          {copy.quotesNote}
        </p>
      </div>
    </section>
  )
}
