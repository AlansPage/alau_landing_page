"use client"

import { useEffect, useRef, useState } from "react"
import {
  MessageCircle,
  ClipboardList,
  MonitorPlay,
  Briefcase,
} from "lucide-react"

import { getI18n } from "@/lib/i18n"
import { useLanguage } from "@/components/language-provider"

const stepIcons = [MessageCircle, ClipboardList, MonitorPlay, Briefcase] as const

export function HowItWorksSection() {
  const { lang } = useLanguage()
  const copy = getI18n(lang).howItWorks
  const steps = copy.steps.map((step, index) => ({
    number: index + 1,
    text: step.text,
    icon: stepIcons[index],
  }))

  const cardsRef = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const el = cardsRef.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (prefersReducedMotion) {
      setRevealed(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      aria-labelledby="how-it-works"
      className="hiw-dark-section relative overflow-hidden"
    >
      {/* Top gradient fade */}
      <div
        aria-hidden="true"
        className="h-16 bg-gradient-to-b from-[hsl(var(--paper-bg))] to-[hsl(220_25%_8%)]"
      />

      {/* Dark container — full bleed */}
      <div className="relative bg-[hsl(220_25%_8%)] px-6 py-20 md:py-28 lg:px-8 lg:py-32">
        {/* Ambient radial blurs (desktop only) */}
        <div
          className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block"
          aria-hidden="true"
        >
          <div className="absolute left-[20%] top-[50%] h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,hsl(var(--flame-core)/0.08),transparent_70%)]" />
          <div className="absolute left-[70%] top-[30%] h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,hsl(var(--flame-deep)/0.07),transparent_70%)]" />
          <div className="absolute left-[85%] top-[70%] h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,hsl(var(--flame-hot)/0.06),transparent_70%)]" />
          {/* Subtle noise texture */}
          <div className="hiw-noise absolute inset-0" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          {/* Section title */}
          <h2
            id="how-it-works"
            className="anchor-target text-balance text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl"
          >
            <span aria-hidden="true" className="mr-2 inline-block">
              🔥
            </span>
            {copy.title}
          </h2>

          {/* Cards container — observed for reveal */}
          <div ref={cardsRef} className="mt-14">
            {/* Desktop: horizontal steps row */}
            <div className="hidden md:block">
              <div className="relative">
                {/* Connecting line */}
                <div
                  className="pointer-events-none absolute left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] top-[4rem]"
                  aria-hidden="true"
                >
                  <div
                    className={`hiw-connecting-line h-0.5 bg-gradient-to-r from-[hsl(var(--flame-deep)/0.3)] via-[hsl(var(--flame-core)/0.5)] to-[hsl(var(--flame-hot)/0.3)] ${revealed ? "revealed" : ""}`}
                  />
                  {/* Ember dots */}
                  {revealed && (
                    <div className="absolute inset-0 overflow-hidden">
                      <span
                        className="ember-dot bg-[hsl(var(--flame-hot))] shadow-[0_0_6px_hsl(var(--flame-hot))]"
                        style={
                          {
                            "--ember-duration": "3s",
                            "--ember-delay": "0s",
                          } as React.CSSProperties
                        }
                      />
                      <span
                        className="ember-dot bg-[hsl(var(--flame-core))] shadow-[0_0_6px_hsl(var(--flame-core))]"
                        style={
                          {
                            "--ember-duration": "4s",
                            "--ember-delay": "1.2s",
                          } as React.CSSProperties
                        }
                      />
                      <span
                        className="ember-dot bg-[hsl(var(--flame-hot)/0.8)] shadow-[0_0_6px_hsl(var(--flame-hot)/0.6)]"
                        style={
                          {
                            "--ember-duration": "3.5s",
                            "--ember-delay": "2.4s",
                          } as React.CSSProperties
                        }
                      />
                      <span
                        className="ember-dot bg-[hsl(var(--flame-core)/0.7)] shadow-[0_0_4px_hsl(var(--flame-core)/0.5)]"
                        style={
                          {
                            "--ember-duration": "4.5s",
                            "--ember-delay": "0.6s",
                          } as React.CSSProperties
                        }
                      />
                    </div>
                  )}
                </div>

                <ol
                  className="relative grid grid-cols-4 gap-6"
                  aria-label={copy.stepsLabel}
                >
                  {steps.map((step, index) => (
                    <li
                      key={step.number}
                      className={`hiw-card ${revealed ? "revealed" : ""}`}
                      style={{ transitionDelay: `${index * 150}ms` }}
                    >
                      <div className="group relative rounded-3xl border border-[hsl(var(--flame-core)/0.15)] bg-[hsl(220_20%_12%)] p-8 transition-[border-color,box-shadow] duration-300 hover:border-[hsl(var(--flame-core)/0.4)] hover:shadow-[0_0_40px_hsl(var(--flame-core)/0.12)]">
                        {/* Step number — large decorative */}
                        <span
                          className="block bg-gradient-to-b from-[hsl(var(--flame-hot))] to-[hsl(var(--flame-core))] bg-clip-text text-6xl font-black leading-none text-transparent"
                          aria-hidden="true"
                        >
                          {step.number}
                        </span>

                        {/* Icon circle */}
                        <div className="mt-6 flex h-12 w-12 items-center justify-center rounded-full border border-[hsl(var(--flame-core)/0.2)] bg-[hsl(var(--flame-core)/0.1)]">
                          <step.icon
                            className="h-6 w-6 text-[hsl(var(--flame-hot))]"
                            aria-hidden="true"
                          />
                        </div>

                        {/* Step text */}
                        <p className="mt-5 text-lg font-semibold leading-relaxed text-white/90">
                          {step.text}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Mobile: vertical timeline */}
            <div className="relative md:hidden">
              {/* Vertical glowing line */}
              <div
                className="absolute bottom-4 left-[7px] top-4 w-0.5 bg-gradient-to-b from-[hsl(var(--flame-deep)/0.3)] via-[hsl(var(--flame-core)/0.5)] to-[hsl(var(--flame-hot)/0.3)]"
                aria-hidden="true"
              />

              <ol className="space-y-6 pl-10" aria-label={copy.stepsLabel}>
                {steps.map((step, index) => (
                  <li
                    key={step.number}
                    className={`hiw-card ${revealed ? "revealed" : ""}`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <div className="rounded-3xl border border-[hsl(var(--flame-core)/0.15)] bg-[hsl(220_20%_12%)] p-6">
                      {/* Step number — inline at top */}
                      <span
                        className="block bg-gradient-to-b from-[hsl(var(--flame-hot))] to-[hsl(var(--flame-core))] bg-clip-text text-3xl font-black leading-none text-transparent"
                        aria-hidden="true"
                      >
                        {step.number}
                      </span>

                      <div className="mt-4 flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[hsl(var(--flame-core)/0.2)] bg-[hsl(var(--flame-core)/0.1)]">
                          <step.icon
                            className="h-5 w-5 text-[hsl(var(--flame-hot))]"
                            aria-hidden="true"
                          />
                        </div>
                        <p className="text-lg font-semibold leading-relaxed text-white/90">
                          {step.text}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        aria-hidden="true"
        className="h-16 bg-gradient-to-b from-[hsl(220_25%_8%)] to-[hsl(var(--paper-bg))]"
      />
    </section>
  )
}
