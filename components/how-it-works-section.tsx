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

  const sectionRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReducedMotion(true)
      return
    }

    let rafId: number | null = null

    const handleScroll = () => {
      if (rafId != null) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        const section = sectionRef.current
        if (!section) return
        const rect = section.getBoundingClientRect()
        const scrollable = section.offsetHeight - window.innerHeight
        if (scrollable <= 0) return
        const scrolled = -rect.top
        setProgress(Math.max(0, Math.min(1, scrolled / scrollable)))
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafId != null) cancelAnimationFrame(rafId)
    }
  }, [])

  const translateX = -(progress * (steps.length - 1) * 100)
  const lineProgress = progress * 100

  /* ── Vertical card layout (mobile + reduced-motion fallback) ── */
  const verticalCards = (
    <>
      <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
        {copy.title}
      </h2>

      <ol className="mt-14" aria-label={copy.stepsLabel}>
        {steps.map((step, i) => (
          <li key={step.number}>
            <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card p-8 shadow-sm">
              {/* Watermark number */}
              <span
                className="pointer-events-none absolute right-4 top-2 select-none bg-gradient-to-r from-[hsl(var(--flame-deep))] via-[hsl(var(--flame-core))] to-[hsl(var(--flame-hot))] bg-clip-text text-5xl font-black leading-none text-transparent opacity-[0.08]"
                aria-hidden="true"
              >
                {step.number}
              </span>

              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[hsl(var(--flame-deep)/0.1)] to-[hsl(var(--flame-hot)/0.1)]">
                  <step.icon
                    className="h-7 w-7 text-primary"
                    aria-hidden="true"
                  />
                </div>
                <p className="text-xl font-bold leading-relaxed text-foreground">
                  {step.text}
                </p>
              </div>
            </div>

            {/* Flame line segment between cards */}
            {i < steps.length - 1 && (
              <div className="flex justify-center py-1" aria-hidden="true">
                <div className="h-10 w-[3px] rounded-full bg-gradient-to-b from-[hsl(var(--flame-core))] to-[hsl(var(--flame-hot))]" />
              </div>
            )}
          </li>
        ))}
      </ol>
    </>
  )

  /* ── Reduced-motion: stacked layout on all breakpoints ── */
  if (reducedMotion) {
    return (
      <section aria-label={copy.title} className="relative px-6 py-24 md:py-32 lg:px-8">
        <div id="how-it-works" className="anchor-target" />
        <div className="mx-auto max-w-6xl">{verticalCards}</div>
      </section>
    )
  }

  /* ── Normal: horizontal scroll on desktop, vertical on mobile ── */
  return (
    <section aria-label={copy.title}>
      <div id="how-it-works" className="anchor-target" />

      {/* ── Desktop: cinematic horizontal scroll ── */}
      <div ref={sectionRef} className="relative hidden h-[300vh] md:block">
        <div
          className="sticky flex flex-col overflow-hidden"
          style={{
            top: "var(--header-h)",
            height: "calc(100vh - var(--header-h))",
          }}
        >
          {/* Title */}
          <div className="shrink-0 px-6 pt-10 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                {copy.title}
              </h2>
            </div>
          </div>

          {/* Cards area */}
          <div className="relative flex flex-1 items-center">
            {/* ── Flame progress trail ── */}
            <div
              className="pointer-events-none absolute left-[10%] right-[10%] top-1/2 -translate-y-1/2"
              aria-hidden="true"
            >
              {/* Background track */}
              <div className="h-[2px] rounded-full bg-border/30" />
              {/* Flame fill */}
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[hsl(var(--flame-deep))] via-[hsl(var(--flame-core))] to-[hsl(var(--flame-hot))]"
                style={{
                  width: `${lineProgress}%`,
                  transition: "width 80ms linear",
                }}
              />
              {/* Waypoint dots */}
              {steps.map((_, i) => {
                const dotPos = i / (steps.length - 1)
                const isLit = progress >= dotPos - 0.02
                return (
                  <div
                    key={i}
                    className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${dotPos * 100}%` }}
                  >
                    <div
                      className={`h-5 w-5 rounded-full border-2 transition-all duration-300 ${
                        isLit
                          ? "border-[hsl(var(--flame-hot))] bg-[hsl(var(--flame-core))] shadow-[0_0_12px_hsl(var(--flame-core)/0.5)]"
                          : "border-border/40 bg-surface opacity-30"
                      }`}
                    />
                  </div>
                )
              })}
            </div>

            {/* ── Steps track ── */}
            <ol
              className="flex"
              style={{
                transform: `translateX(${translateX}vw)`,
                transition: "transform 80ms linear",
              }}
              aria-label={copy.stepsLabel}
            >
              {steps.map((step, i) => {
                const stepPos = i / (steps.length - 1)
                const distance = Math.abs(progress - stepPos)
                const threshold = 1 / (steps.length - 1) / 2
                const isActive = distance < threshold + 0.05

                return (
                  <li
                    key={i}
                    className="flex w-screen shrink-0 items-center justify-center px-6"
                  >
                    <div
                      className={`relative max-w-3xl overflow-hidden rounded-3xl border bg-card px-10 py-12 transition-all duration-500 ${
                        isActive
                          ? "scale-100 border-primary/20 opacity-100 shadow-[0_0_80px_hsl(var(--flame-core)/0.08)]"
                          : "scale-[0.95] border-border/30 opacity-40 shadow-sm"
                      }`}
                    >
                      {/* Watermark number */}
                      <span
                        className="pointer-events-none absolute right-6 top-4 select-none bg-gradient-to-r from-[hsl(var(--flame-deep))] via-[hsl(var(--flame-core))] to-[hsl(var(--flame-hot))] bg-clip-text text-[8rem] font-black leading-none text-transparent opacity-[0.08]"
                        aria-hidden="true"
                      >
                        {step.number}
                      </span>

                      {/* Icon */}
                      <div className="relative flex h-[80px] w-[80px] items-center justify-center rounded-full bg-gradient-to-br from-[hsl(var(--flame-deep)/0.1)] to-[hsl(var(--flame-hot)/0.1)]">
                        <step.icon
                          className="h-12 w-12 text-primary"
                          aria-hidden="true"
                        />
                      </div>

                      {/* Text */}
                      <p className="relative mt-6 text-2xl font-bold leading-relaxed text-foreground">
                        {step.text}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </div>

      {/* ── Mobile: vertical stack ── */}
      <div className="px-6 py-24 md:hidden lg:px-8">
        <div className="mx-auto max-w-6xl">{verticalCards}</div>
      </div>
    </section>
  )
}
