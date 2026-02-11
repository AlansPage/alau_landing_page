"use client"

import { ZoomIn } from "lucide-react"

import { Logo } from "@/components/logo"
import { SITE } from "@/lib/site-config"
import { useTextScale } from "@/components/text-scale-provider"

function getScaleLabel(scale: number) {
  if (scale <= 1) return "Увеличить текст"
  if (scale < 1.3) return "Ещё увеличить текст"
  return "Сбросить размер текста"
}

export function SiteHeader() {
  const { scale, cycleScale } = useTextScale()

  return (
    <header
      className="sticky top-0 z-40 border-b border-border/30 bg-background/80 backdrop-blur"
      aria-label="Верхняя панель"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-8">
        <a href="#" className="flex items-center gap-3 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary" aria-label="На главную">
          <Logo variant="wordmark" className="h-8 w-auto" priority alt="ALAU" />
          <span className="sr-only">{SITE.name}</span>
        </a>

        <button
          type="button"
          onClick={cycleScale}
          className="flex h-11 min-w-11 items-center justify-center rounded-xl border border-border/40 bg-card text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          aria-label={getScaleLabel(scale)}
          title={getScaleLabel(scale)}
        >
          <ZoomIn className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </header>
  )
}
