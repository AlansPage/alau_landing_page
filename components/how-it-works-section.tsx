"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

import { getI18n } from "@/lib/i18n"
import { SparkleStar } from "@/components/decorations/sparkle-star"
import { MiniSparkle } from "@/components/decorations/mini-sparkle"
import { StarFigure } from "@/components/decorations/star-figure"
import { useLanguage } from "@/components/language-provider"

const stepIcons = [
  "/images/step-1-message.svg",
  "/images/step-2-plan.svg",
  "/images/step-3-study.svg",
  "/images/step-4-work.svg",
] as const

/**
 * Vertical S-curve path for desktop layout.
 * The path meanders left-right across a 600px-wide, 1000px-tall viewBox.
 * Steps attach at 4 evenly-spaced Y positions (125, 375, 625, 875).
 * Odd steps (1,3) sit left of center; even steps (2,4) sit right.
 */
const DESKTOP_PATH =
  "M 300 40 C 300 160, 120 200, 120 280 S 300 340, 300 400 C 300 520, 480 560, 480 640 S 300 700, 300 760 C 300 880, 120 920, 120 960"

/** Total approximate length of the desktop path for dash-offset animation */
const DESKTOP_PATH_LENGTH = 1600

/** Waypoint positions (cx, cy) on the desktop path for each step */
const DESKTOP_WAYPOINTS = [
  { cx: 220, cy: 125 },
  { cx: 380, cy: 375 },
  { cx: 220, cy: 625 },
  { cx: 380, cy: 875 },
]

export function HowItWorksSection() {
  const { lang } = useLanguage()
  const copy = getI18n(lang).howItWorks
  const steps = copy.steps.map((step, index) => ({
    number: index + 1,
    text: step.text,
    iconSrc: stepIcons[index],
  }))

  const sectionRef = useRef<HTMLElement>(null)
  const stepRefs = useRef<(HTMLLIElement | null)[]>([])
  const litCountRef = useRef(0)
  const progressPathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    if (prefersReducedMotion) {
      // Make everything fully visible immediately
      stepRefs.current.forEach((el) => {
        if (!el) return
        const waypoint = el.querySelector(".flame-waypoint")
        const card = el.querySelector(".flame-step-card")
        waypoint?.classList.add("flame-lit")
        card?.classList.add("flame-lit")
      })
      if (progressPathRef.current) {
        progressPathRef.current.style.strokeDashoffset = "0"
      }
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          const li = entry.target as HTMLLIElement
          const waypoint = li.querySelector(".flame-waypoint")
          const card = li.querySelector(".flame-step-card")

          if (waypoint && !waypoint.classList.contains("flame-lit")) {
            waypoint.classList.add("flame-lit")
            card?.classList.add("flame-lit")
            litCountRef.current += 1

            // Animate the progress path
            if (progressPathRef.current) {
              const fraction = litCountRef.current / steps.length
              const offset = DESKTOP_PATH_LENGTH * (1 - fraction)
              progressPathRef.current.style.strokeDashoffset = `${offset}`
            }
          }
        })
      },
      { threshold: 0.5 }
    )

    stepRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [steps.length])

  return (
    <section
      ref={sectionRef}
      aria-labelledby="how-it-works"
      className="relative px-6 py-16 md:py-24 lg:py-32 lg:px-8"
    >
      {/* Background decorations — identical positions to original */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute right-10 top-16 h-56 w-56 rounded-full bg-accent/10 blur-[110px]" />
        {/* Holding figure — far-right, holding spark like a torch */}
        <div
          className="figure-sway absolute right-[2%] top-[25%] hidden opacity-[0.11] md:block"
          style={{ animationDuration: "15s", animationDelay: "-4s" }}
        >
          <StarFigure pose="holding" size={90} />
        </div>
        <SparkleStar
          points={4}
          size={14}
          color="hsl(35 90% 60%)"
          className="sparkle-twinkle absolute right-[1%] top-[22%] hidden opacity-[0.14] md:block"
          style={{ animationDuration: "3.8s", animationDelay: "-1.2s" }}
        />
        <MiniSparkle
          size={10}
          color="hsl(280 60% 65%)"
          className="sparkle-twinkle absolute right-[5%] top-[40%] hidden opacity-[0.12] md:block"
          style={{ animationDuration: "4.4s", animationDelay: "-2.6s" }}
        />
        <SparkleStar
          points={6}
          size={12}
          color="hsl(340 70% 65%)"
          className="sparkle-twinkle absolute right-[3%] top-[48%] hidden opacity-[0.10] md:block"
          style={{ animationDuration: "3.4s", animationDelay: "-0.5s" }}
        />
      </div>

      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="relative inline-block">
          <h2
            id="how-it-works"
            className="anchor-target reveal text-balance text-2xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
            data-reveal
          >
            {copy.title}
          </h2>
          <SparkleStar
            points={4}
            size={22}
            color="hsl(35 90% 60%)"
            className="sparkle-pulse absolute -top-3 -right-6 opacity-[0.25] md:-right-8"
            style={
              {
                animationDuration: "4.8s",
                animationDelay: "-2.5s",
                "--sparkle-base-opacity": "0.25",
              } as React.CSSProperties
            }
          />
        </div>

        {/* ===== DESKTOP: Flame Journey Path (md+) ===== */}
        <div className="relative mt-14 hidden md:block">
          {/* SVG winding path — background dashed trail */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 600 1000"
            preserveAspectRatio="xMidYMid meet"
            fill="none"
            aria-hidden="true"
          >
            {/* Base dashed path */}
            <path
              d={DESKTOP_PATH}
              stroke="hsl(var(--flame-core)/0.15)"
              strokeWidth="3"
              strokeDasharray="8 6"
              strokeLinecap="round"
              fill="none"
            />
            {/* Progress overlay path — fills as steps light up */}
            <path
              ref={progressPathRef}
              d={DESKTOP_PATH}
              stroke="hsl(var(--flame-core)/0.4)"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              style={{
                strokeDasharray: DESKTOP_PATH_LENGTH,
                strokeDashoffset: DESKTOP_PATH_LENGTH,
                transition: "stroke-dashoffset 800ms ease-out",
              }}
            />
            {/* Flame waypoint circles on the path */}
            {DESKTOP_WAYPOINTS.map((wp, i) => (
              <g key={i} aria-hidden="true">
                <defs>
                  <linearGradient
                    id={`flame-grad-${i}`}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      stopColor="hsl(var(--flame-deep))"
                    />
                    <stop
                      offset="100%"
                      stopColor="hsl(var(--flame-core))"
                    />
                  </linearGradient>
                </defs>
                <circle
                  className="flame-waypoint"
                  cx={wp.cx}
                  cy={wp.cy}
                  r="16"
                  fill={`url(#flame-grad-${i})`}
                  data-step={i}
                />
                <text
                  x={wp.cx}
                  y={wp.cy}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="white"
                  fontWeight="bold"
                  fontSize="14"
                  style={{ pointerEvents: "none" }}
                >
                  {i + 1}
                </text>
              </g>
            ))}
          </svg>

          {/* Step cards — ordered list */}
          <ol
            className="relative"
            aria-label={copy.stepsLabel}
            style={{ minHeight: "1000px" }}
          >
            {steps.map((step, index) => {
              // Alternate: odd steps (0,2) left, even steps (1,3) right
              const isLeft = index % 2 === 0
              return (
                <li
                  key={step.number}
                  ref={(el) => {
                    stepRefs.current[index] = el
                  }}
                  className="absolute w-[42%]"
                  style={{
                    top: `${(DESKTOP_WAYPOINTS[index].cy / 1000) * 100}%`,
                    transform: "translateY(-50%)",
                    ...(isLeft
                      ? { left: "0%" }
                      : { right: "0%" }),
                  }}
                >
                  <span className="sr-only">
                    Step {step.number}
                  </span>
                  <div className="flame-step-card hover-lift rounded-3xl border border-border/50 bg-card px-6 pb-6 pt-7 shadow-sm shadow-background/30 transition-[border-color,box-shadow] hover:border-primary/30 hover:shadow-[0_0_20px_hsl(var(--flame-core)/0.08)]">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(var(--flame-deep)/0.1)] to-[hsl(var(--flame-hot)/0.1)]">
                      <Image
                        src={step.iconSrc}
                        alt=""
                        width={24}
                        height={24}
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="mt-4 text-pretty text-base font-semibold leading-relaxed text-foreground lg:text-lg">
                      {step.text}
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>

        {/* ===== MOBILE: Vertical flame timeline (below md) ===== */}
        <div className="relative mt-14 md:hidden">
          {/* Vertical line on the left */}
          <div
            className="pointer-events-none absolute left-[23px] top-0 bottom-0 w-[3px]"
            style={{
              background:
                "linear-gradient(to bottom, hsl(var(--flame-core)/0.15), hsl(var(--flame-core)/0.08))",
            }}
            aria-hidden="true"
          />

          <ol className="relative" aria-label={copy.stepsLabel}>
            {steps.map((step, index) => (
              <li
                key={step.number}
                ref={(el) => {
                  stepRefs.current[index] = el
                }}
                className="relative pb-12 pl-16 last:pb-0"
              >
                {/* Flame waypoint circle on the line */}
                <div
                  className="flame-waypoint absolute left-[8px] top-1 flex h-[32px] w-[32px] items-center justify-center rounded-full"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(var(--flame-deep)), hsl(var(--flame-core)))",
                  }}
                  aria-hidden="true"
                >
                  <span className="text-xs font-bold text-white">
                    {step.number}
                  </span>
                </div>
                <span className="sr-only">Step {step.number}</span>

                {/* Step card */}
                <div className="flame-step-card hover-lift rounded-3xl border border-border/50 bg-card px-6 py-5 shadow-sm shadow-background/30 transition-[border-color,box-shadow] hover:border-primary/30 hover:shadow-[0_0_20px_hsl(var(--flame-core)/0.08)]">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(var(--flame-deep)/0.1)] to-[hsl(var(--flame-hot)/0.1)]">
                    <Image
                      src={step.iconSrc}
                      alt=""
                      width={20}
                      height={20}
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="text-pretty text-base font-semibold leading-relaxed text-foreground">
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
