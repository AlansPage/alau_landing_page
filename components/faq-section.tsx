"use client"

import { ChevronDown } from "lucide-react"

import { getI18n } from "@/lib/i18n"
import { useLanguage } from "@/components/language-provider"

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
      </div>

      <div className="mx-auto max-w-3xl">
        <h2
          id="faq"
          className="anchor-target reveal text-balance text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
          data-reveal
        >
          {copy.title}
        </h2>

        <div className="mt-14 flex flex-col gap-4">
          {copy.items.map((item, idx) => (
            <details
              key={idx}
              className="reveal group rounded-2xl border border-border/50 bg-card shadow-sm shadow-background/30"
              style={{ transitionDelay: `${140 + idx * 70}ms` }}
              data-reveal
            >
              <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-base font-semibold text-foreground md:text-lg [&::-webkit-details-marker]:hidden">
                {item.question}
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <div className="px-6 pb-5 text-base leading-relaxed text-muted-foreground">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
