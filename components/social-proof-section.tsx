"use client"

import { getI18n } from "@/lib/i18n"
import { useLanguage } from "@/components/language-provider"

export function SocialProofSection() {
  const { lang } = useLanguage()
  const copy = getI18n(lang).socialProof

  return (
    <section
      aria-labelledby="testimonials"
      className="relative px-6 py-24 md:py-32 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute right-1/3 top-12 h-52 w-52 rounded-full bg-accent/8 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl">
        <h2
          id="testimonials"
          className="anchor-target reveal text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
          data-reveal
        >
          {copy.title}
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {copy.quotes.map((quote, idx) => (
            <blockquote
              key={idx}
              className="reveal hover-lift relative rounded-3xl border border-border/50 border-l-4 border-l-primary/40 bg-card p-7 shadow-lg shadow-background/40"
              style={{ transitionDelay: `${180 + idx * 90}ms` }}
              data-reveal
            >
              {/* Decorative quotation mark */}
              <span
                className="pointer-events-none absolute right-6 top-4 select-none text-7xl font-serif leading-none text-primary/10"
                aria-hidden="true"
              >
                {"\u201C"}
              </span>

              <p className="relative text-pretty text-base leading-relaxed text-foreground">
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
      </div>
    </section>
  )
}
