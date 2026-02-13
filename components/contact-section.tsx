"use client"

import { useState } from "react"
import { Send } from "lucide-react"

import { getI18n } from "@/lib/i18n"
import { useLanguage } from "@/components/language-provider"

export function ContactSection() {
  const { lang } = useLanguage()
  const copy = getI18n(lang).contact
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section
      aria-labelledby="contact"
      className="relative px-6 py-24 md:py-32 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-16 h-60 w-[400px] -translate-x-1/2 rounded-full bg-primary/8 blur-[130px]" />
      </div>

      <div className="mx-auto max-w-2xl">
        <h2
          id="contact"
          className="anchor-target reveal text-balance text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
          data-reveal
        >
          {copy.title}
        </h2>
        <p
          className="reveal mt-4 text-center text-base leading-relaxed text-muted-foreground md:text-lg"
          style={{ transitionDelay: "100ms" }}
          data-reveal
        >
          {copy.subtitle}
        </p>

        <div
          className="reveal mt-12 rounded-[2.5rem] border border-border/40 bg-surface/70 p-6 shadow-xl shadow-background/50 backdrop-blur-sm sm:p-8 lg:p-10"
          style={{ transitionDelay: "180ms" }}
          data-reveal
        >
          {submitted ? (
            <div
              className="flex min-h-[200px] items-center justify-center"
              role="status"
            >
              <p className="text-center text-lg font-semibold text-primary">
                {copy.success}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-first-name"
                    className="text-sm font-medium text-foreground"
                  >
                    {copy.firstName}
                  </label>
                  <input
                    id="contact-first-name"
                    type="text"
                    autoComplete="given-name"
                    aria-required="true"
                    required
                    className="min-h-[48px] rounded-xl border border-border/60 bg-card px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-last-name"
                    className="text-sm font-medium text-foreground"
                  >
                    {copy.lastName}
                  </label>
                  <input
                    id="contact-last-name"
                    type="text"
                    autoComplete="family-name"
                    aria-required="true"
                    required
                    className="min-h-[48px] rounded-xl border border-border/60 bg-card px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-company"
                    className="text-sm font-medium text-foreground"
                  >
                    {copy.company}
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    autoComplete="organization"
                    className="min-h-[48px] rounded-xl border border-border/60 bg-card px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-email"
                    className="text-sm font-medium text-foreground"
                  >
                    {copy.email}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    aria-required="true"
                    required
                    className="min-h-[48px] rounded-xl border border-border/60 bg-card px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-2">
                <label
                  htmlFor="contact-message"
                  className="text-sm font-medium text-foreground"
                >
                  {copy.message}
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  aria-required="true"
                  required
                  className="min-h-[120px] rounded-xl border border-border/60 bg-card px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                />
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  type="submit"
                  className="interactive-ease hover-lift press-pop inline-flex min-h-[56px] items-center gap-3 rounded-2xl bg-primary px-10 py-4 text-lg font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  <Send className="h-5 w-5" aria-hidden="true" />
                  {copy.submit}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
