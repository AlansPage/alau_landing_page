"use client"

import {
  MessageCircle,
  ClipboardList,
  MonitorPlay,
  Briefcase,
} from "lucide-react"

import { getI18n } from "@/lib/i18n"
import { SparkleStar } from "@/components/decorations/sparkle-star"
import { MiniSparkle } from "@/components/decorations/mini-sparkle"
import { StarFigure } from "@/components/decorations/star-figure"
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

  return (
    <section
      aria-labelledby="how-it-works"
      className="relative px-6 py-24 md:py-32 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute right-10 top-16 h-56 w-56 rounded-full bg-accent/10 blur-[110px]" />
        {/* Holding figure — far-right, holding spark like a torch */}
        <div
          className="figure-sway absolute right-[2%] top-[25%] hidden opacity-[0.11] md:block"
          style={{ animationDuration: "15s", animationDelay: "-4s" }}
        >
          <StarFigure pose="holding" size={90} />
        </div>
        <SparkleStar points={4} size={14} color="hsl(35 90% 60%)" className="sparkle-twinkle absolute right-[1%] top-[22%] hidden opacity-[0.14] md:block" style={{ animationDuration: "3.8s", animationDelay: "-1.2s" }} />
        <MiniSparkle size={10} color="hsl(280 60% 65%)" className="sparkle-twinkle absolute right-[5%] top-[40%] hidden opacity-[0.12] md:block" style={{ animationDuration: "4.4s", animationDelay: "-2.6s" }} />
        <SparkleStar points={6} size={12} color="hsl(340 70% 65%)" className="sparkle-twinkle absolute right-[3%] top-[48%] hidden opacity-[0.10] md:block" style={{ animationDuration: "3.4s", animationDelay: "-0.5s" }} />
      </div>
      <div className="mx-auto max-w-6xl">
        <div className="relative inline-block">
          <h2
            id="how-it-works"
            className="anchor-target reveal text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
            data-reveal
          >
            {copy.title}
          </h2>
          <SparkleStar
            points={4} size={22} color="hsl(35 90% 60%)"
            className="sparkle-pulse absolute -top-3 -right-6 opacity-[0.25] md:-right-8"
            style={{ animationDuration: "4.8s", animationDelay: "-2.5s", "--sparkle-base-opacity": "0.25" } as React.CSSProperties}
          />
        </div>

        {/* Soft surface panel for steps (adds detail without adding sections) */}
        <div
          className="reveal mt-14 rounded-[2.5rem] border border-border/30 bg-surface/70 p-6 shadow-xl shadow-background/50 shadow-[inset_0_1px_0_hsl(var(--flame-glow))] backdrop-blur-sm sm:p-8 lg:p-10"
          style={{ transitionDelay: "120ms" }}
          data-reveal
        >

        {/* Desktop: horizontal steps row */}
        <div className="hidden md:block">
          <ol className="relative grid grid-cols-4 gap-10">
            {/* Connecting line behind step badges */}
            <div
              className="pointer-events-none absolute left-[calc(12.5%+32px)] right-[calc(12.5%+32px)] top-[32px] h-0.5 bg-primary/20"
              aria-hidden="true"
            />
            {steps.map((step, index) => (
              <li
                key={step.number}
                className="relative flex flex-col items-center text-center"
              >
                {/* Big rounded badge */}
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/40 bg-card shadow-lg shadow-primary/10">
                  <span className="text-xl font-extrabold text-primary">
                    {step.number}
                  </span>
                </div>

                {/* Step card */}
                <div
                  className="hover-lift mt-5 w-full rounded-3xl border border-border/50 bg-card px-6 pb-6 pt-7 shadow-sm shadow-background/30 transition-[border-color,box-shadow] hover:border-primary/30 hover:shadow-[0_0_20px_hsl(var(--flame-core)/0.08)]"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(var(--flame-deep)/0.1)] to-[hsl(var(--flame-hot)/0.1)]">
                    <step.icon
                      className="h-6 w-6 text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-4 text-pretty text-base font-semibold leading-relaxed text-foreground lg:text-lg">
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="mt-10 md:hidden">
          <ol className="relative ml-2 border-l-2 border-border/60 pl-10">
            {steps.map((step, index) => (
              <li key={step.number} className="relative pb-12 last:pb-0">
                {/* Badge on the line */}
                <div
                  className="absolute -left-[calc(2.5rem+1px)] flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/40 bg-card shadow-md shadow-primary/10"
                  aria-hidden="true"
                >
                  <span className="text-base font-extrabold text-primary">
                    {step.number}
                  </span>
                </div>
                <div className="pt-1">
                  <div
                    className="hover-lift rounded-3xl border border-border/50 bg-card px-6 py-5 shadow-sm shadow-background/30 transition-[border-color,box-shadow] hover:border-primary/30 hover:shadow-[0_0_20px_hsl(var(--flame-core)/0.08)]"
                  >
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(var(--flame-deep)/0.1)] to-[hsl(var(--flame-hot)/0.1)]">
                      <step.icon
                        className="h-5 w-5 text-primary"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="text-pretty text-lg font-semibold leading-relaxed text-foreground">
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
    </section>
  )
}
