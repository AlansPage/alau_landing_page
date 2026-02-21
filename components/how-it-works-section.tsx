"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

import { getI18n } from "@/lib/i18n"
import { useLanguage } from "@/components/language-provider"

const stepIcons = [
  "/images/icon1.png",
  "/images/icon2.png",
  "/images/icon3.png",
  "/images/icon4.png",
]

export function HowItWorksSection() {
  const { lang } = useLanguage()
  const copy = getI18n(lang).howItWorks
  const steps = copy.steps.map((step, index) => ({
    number: index + 1,
    text: step.text,
    icon: stepIcons[index],
  }))

  const sectionRef = useRef<HTMLElement>(null)
  const [lineHeight, setLineHeight] = useState(0)
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set())
  const [reducedMotion, setReducedMotion] = useState(false)
  const stepRefs = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReducedMotion(true)
      setVisibleSteps(new Set([0, 1, 2, 3]))
      return
    }

    /* ── Scroll listener for vertical flame progress line ── */
    let rafId: number | null = null
    const handleScroll = () => {
      if (rafId != null) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        const section = sectionRef.current
        if (!section) return
        const rect = section.getBoundingClientRect()
        const viewH = window.innerHeight
        // Start filling when section top hits 70% down the viewport,
        // finish when section bottom reaches 30% from viewport top.
        const start = viewH * 0.7
        const scrolled = start - rect.top
        const travel = section.offsetHeight - viewH * 0.3
        setLineHeight(Math.max(0, Math.min(100, (scrolled / travel) * 100)))
      })
    }

    /* ── IntersectionObserver for card reveal animations ── */
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-step-index"))
            if (!isNaN(idx)) {
              setVisibleSteps((prev) => new Set(prev).add(idx))
              observer.unobserve(entry.target)
            }
          }
        })
      },
      { threshold: 0.25, rootMargin: "0px 0px -8% 0px" }
    )

    stepRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafId != null) cancelAnimationFrame(rafId)
      observer.disconnect()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-label={copy.title}
      className="relative px-6 py-24 md:py-32 lg:px-8"
    >
      <div id="how-it-works" className="anchor-target" />

      <div className="mx-auto max-w-6xl">
        <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
          {copy.title}
        </h2>

        {/* ── Desktop: vertical scroll-driven with progress line ── */}
        <div className="relative mt-16 hidden md:block">
          {/* Vertical flame progress line */}
          <div
            className="absolute bottom-0 left-8 top-0 w-[3px]"
            aria-hidden="true"
          >
            {/* Background track */}
            <div className="absolute inset-0 rounded-full bg-border/30" />
            {/* Flame fill */}
            <div
              className="absolute inset-x-0 top-0 rounded-full bg-gradient-to-b from-[hsl(var(--flame-deep))] via-[hsl(var(--flame-core))] to-[hsl(var(--flame-hot))]"
              style={{
                height: `${lineHeight}%`,
                transition: "height 120ms linear",
              }}
            />
            {/* Waypoint dots */}
            {steps.map((_, i) => {
              const dotPos = steps.length > 1 ? (i / (steps.length - 1)) * 100 : 0
              const isLit = visibleSteps.has(i)
              return (
                <div
                  key={i}
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ top: `${dotPos}%` }}
                >
                  <div
                    className={`h-[14px] w-[14px] rounded-full border-2 transition-all duration-500 ${
                      isLit
                        ? "scale-125 border-[hsl(var(--flame-hot))] bg-[hsl(var(--flame-core))] shadow-[0_0_14px_hsl(var(--flame-core)/0.6)]"
                        : "border-border/40 bg-surface"
                    }`}
                  />
                </div>
              )
            })}
          </div>

          {/* Step cards */}
          <ol className="space-y-12 pl-24" aria-label={copy.stepsLabel}>
            {steps.map((step, i) => {
              const isVisible = visibleSteps.has(i) || reducedMotion
              return (
                <li
                  key={step.number}
                  ref={(el) => {
                    stepRefs.current[i] = el
                  }}
                  data-step-index={i}
                  className="hiw-step-card"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible
                      ? "translateY(0) scale(1)"
                      : "translateY(2rem) scale(0.95)",
                    transition: "opacity 700ms ease-out, transform 700ms ease-out",
                    transitionDelay: isVisible ? "50ms" : "0ms",
                  }}
                >
                  <div className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card px-10 py-10 shadow-sm transition-shadow duration-500 hover:shadow-[0_0_60px_hsl(var(--flame-core)/0.07)]">
                    <div className="relative flex items-start gap-6">
                      {/* Number + icon stacked together */}
                      <div className="flex shrink-0 flex-col items-center gap-1">
                        <span
                          className="select-none bg-gradient-to-r from-[hsl(var(--flame-deep))] via-[hsl(var(--flame-core))] to-[hsl(var(--flame-hot))] bg-clip-text text-4xl font-black leading-none text-transparent opacity-40"
                          aria-hidden="true"
                        >
                          {step.number}
                        </span>
                        <div
                          className="relative h-16 w-16 transition-transform duration-700"
                          style={{
                            transform: isVisible ? "scale(1)" : "scale(0.7)",
                            transitionDelay: isVisible ? "200ms" : "0ms",
                          }}
                        >
                          <Image
                            src={step.icon}
                            alt=""
                            fill
                            className="object-contain"
                            sizes="64px"
                            aria-hidden="true"
                          />
                        </div>
                      </div>

                      <div className="pt-1">
                        <p className="text-2xl font-bold leading-relaxed text-foreground">
                          {step.text}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>

        {/* ── Mobile: vertical stack with flame connectors ── */}
        <div className="mt-14 md:hidden">
          <ol aria-label={copy.stepsLabel}>
            {steps.map((step, i) => (
              <li key={step.number}>
                <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card p-8 shadow-sm">
                  <div className="flex items-start gap-4">
                    {/* Number + icon stacked */}
                    <div className="flex shrink-0 flex-col items-center gap-1">
                      <span
                        className="select-none bg-gradient-to-r from-[hsl(var(--flame-deep))] via-[hsl(var(--flame-core))] to-[hsl(var(--flame-hot))] bg-clip-text text-3xl font-black leading-none text-transparent opacity-40"
                        aria-hidden="true"
                      >
                        {step.number}
                      </span>
                      <div className="relative h-14 w-14">
                        <Image
                          src={step.icon}
                          alt=""
                          fill
                          className="object-contain"
                          sizes="56px"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                    <p className="pt-1 text-xl font-bold leading-relaxed text-foreground">
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
        </div>
      </div>
    </section>
  )
}
