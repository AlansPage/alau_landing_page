"use client"

import { useState, useRef } from "react"
import { Send, CheckCircle2 } from "lucide-react"

import { getI18n } from "@/lib/i18n"
import { SparkleStar } from "@/components/decorations/sparkle-star"
import { MiniSparkle } from "@/components/decorations/mini-sparkle"
import { useLanguage } from "@/components/language-provider"

/* Decorative spark SVG for the left column */
function ContactSpark() {
  return (
    <svg viewBox="0 0 120 120" className="h-28 w-28 md:h-36 md:w-36" aria-hidden="true">
      <defs>
        <radialGradient id="contact-spark-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(var(--flame-core) / 0.25)" />
          <stop offset="70%" stopColor="hsl(var(--flame-hot) / 0.08)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="55" fill="url(#contact-spark-grad)" />
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const len = 28 + (i % 3) * 8
        return (
          <line
            key={i}
            x1={60 + Math.cos(rad) * 10}
            y1={60 + Math.sin(rad) * 10}
            x2={60 + Math.cos(rad) * len}
            y2={60 + Math.sin(rad) * len}
            stroke="hsl(var(--flame-core) / 0.18)"
            strokeWidth={1.8 - (i % 2) * 0.4}
            strokeLinecap="round"
          />
        )
      })}
      <circle cx="60" cy="60" r="8" fill="hsl(var(--flame-hot) / 0.20)" />
      <circle cx="60" cy="60" r="3.5" fill="hsl(var(--flame-core) / 0.30)" />
    </svg>
  )
}

const inputClass =
  "min-h-[48px] rounded-xl border border-border bg-card px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 transition-[border-color,box-shadow] focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"

export function ContactSection() {
  const { lang } = useLanguage()
  const copy = getI18n(lang).contact
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = formRef.current
    if (!form) return

    const data = new FormData(form)
    const newErrors: Record<string, string> = {}

    // Check required fields
    if (!data.get("firstName")?.toString().trim()) {
      newErrors.firstName = copy.errors.required
    }
    if (!data.get("lastName")?.toString().trim()) {
      newErrors.lastName = copy.errors.required
    }
    if (!data.get("email")?.toString().trim()) {
      newErrors.email = copy.errors.required
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.get("email")!.toString().trim())) {
      newErrors.email = copy.errors.invalidEmail
    }
    if (!data.get("message")?.toString().trim()) {
      newErrors.message = copy.errors.required
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      // Focus the first invalid input
      const firstErrorKey = Object.keys(newErrors)[0]
      const fieldMap: Record<string, string> = {
        firstName: "contact-first-name",
        lastName: "contact-last-name",
        email: "contact-email",
        message: "contact-message",
      }
      const el = form.querySelector<HTMLElement>(`#${fieldMap[firstErrorKey]}`)
      el?.focus()
      return
    }

    setSubmitted(true)
  }

  return (
    <section
      aria-labelledby="contact"
      className="relative px-6 py-16 md:py-24 lg:py-32 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-16 h-60 w-[400px] -translate-x-1/2 rounded-full bg-primary/8 blur-[130px]" />
      </div>

      <div className="mx-auto max-w-5xl">
        <div
          className="reveal rounded-[2.5rem] border border-border/30 bg-surface/70 p-6 shadow-xl shadow-background/50 shadow-[inset_0_1px_0_hsl(var(--flame-glow))] backdrop-blur-sm sm:p-8 lg:p-10"
          style={{ transitionDelay: "120ms" }}
          data-reveal
        >
          <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[1fr_1.3fr] md:gap-14">
            {/* Left column — heading + subtext + decorative spark */}
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <div className="relative inline-block">
                <h2
                  id="contact"
                  className="anchor-target reveal text-balance text-2xl font-bold tracking-tight text-foreground md:text-4xl"
                  data-reveal
                >
                  {copy.title}
                </h2>
                <SparkleStar
                  points={6} size={24} color="hsl(35 90% 60%)"
                  className="sparkle-pulse absolute -top-3 -right-6 opacity-[0.25] md:-right-8"
                  style={{ animationDuration: "5s", animationDelay: "-1.8s", "--sparkle-base-opacity": "0.25" } as React.CSSProperties}
                />
              </div>
              <p
                className="reveal mt-4 max-w-sm text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
                style={{ transitionDelay: "180ms" }}
                data-reveal
              >
                {copy.subtitle}
              </p>

              {/* Decorative spark + sparkles */}
              <div className="relative mt-8 hidden md:block" aria-hidden="true">
                <ContactSpark />
                <MiniSparkle
                  size={8} color="hsl(280 60% 65%)"
                  className="sparkle-twinkle absolute -right-4 top-2 opacity-[0.20]"
                  style={{ animationDuration: "3.8s", animationDelay: "-1s", "--sparkle-base-opacity": "0.20" } as React.CSSProperties}
                />
                <MiniSparkle
                  size={6} color="hsl(35 90% 60%)"
                  className="sparkle-twinkle absolute -left-2 bottom-4 opacity-[0.18]"
                  style={{ animationDuration: "4.2s", animationDelay: "-2.5s", "--sparkle-base-opacity": "0.18" } as React.CSSProperties}
                />
              </div>
            </div>

            {/* Right column — form or success */}
            <div>
              {submitted ? (
                <div
                  className="flex min-h-[300px] flex-col items-center justify-center gap-4"
                  role="status"
                >
                  <CheckCircle2 className="h-12 w-12 text-primary" aria-hidden="true" />
                  <p className="text-center text-base font-semibold text-foreground md:text-lg">
                    {copy.success}
                  </p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} noValidate>
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
                        name="firstName"
                        type="text"
                        autoComplete="given-name"
                        aria-required="true"
                        required
                        aria-invalid={!!errors.firstName}
                        aria-describedby={errors.firstName ? "error-firstName" : undefined}
                        onChange={() => setErrors(prev => { const next = { ...prev }; delete next.firstName; return next; })}
                        className={`${inputClass}${errors.firstName ? " border-red-500" : ""}`}
                      />
                      {errors.firstName && <p id="error-firstName" role="alert" className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
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
                        name="lastName"
                        type="text"
                        autoComplete="family-name"
                        aria-required="true"
                        required
                        aria-invalid={!!errors.lastName}
                        aria-describedby={errors.lastName ? "error-lastName" : undefined}
                        onChange={() => setErrors(prev => { const next = { ...prev }; delete next.lastName; return next; })}
                        className={`${inputClass}${errors.lastName ? " border-red-500" : ""}`}
                      />
                      {errors.lastName && <p id="error-lastName" role="alert" className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
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
                        name="company"
                        type="text"
                        autoComplete="organization"
                        className={inputClass}
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
                        name="email"
                        type="email"
                        autoComplete="email"
                        aria-required="true"
                        required
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "error-email" : undefined}
                        onChange={() => setErrors(prev => { const next = { ...prev }; delete next.email; return next; })}
                        className={`${inputClass}${errors.email ? " border-red-500" : ""}`}
                      />
                      {errors.email && <p id="error-email" role="alert" className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>
                    <div className="flex flex-col gap-2 sm:col-span-2">
                      <label
                        htmlFor="contact-phone"
                        className="text-sm font-medium text-foreground"
                      >
                        {copy.phone}
                      </label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        className={inputClass}
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
                      name="message"
                      rows={4}
                      aria-required="true"
                      required
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "error-message" : undefined}
                      onChange={() => setErrors(prev => { const next = { ...prev }; delete next.message; return next; })}
                      className={`min-h-[120px] ${inputClass}${errors.message ? " border-red-500" : ""}`}
                    />
                    {errors.message && <p id="error-message" role="alert" className="mt-1 text-sm text-red-600">{errors.message}</p>}
                  </div>

                  <div className="mt-8">
                    <button
                      type="submit"
                      className="interactive-ease hover-lift press-pop inline-flex min-h-[56px] w-full items-center justify-center gap-3 rounded-2xl bg-accent px-8 py-3 text-base font-bold text-accent-foreground shadow-lg shadow-accent/20 transition-all hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:w-auto md:px-10 md:py-4 md:text-lg"
                    >
                      <Send className="h-5 w-5" aria-hidden="true" />
                      {copy.submit}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
