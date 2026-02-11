"use client"

import { useEffect, useRef } from "react"
import { ZoomIn } from "lucide-react"

import { Logo } from "@/components/logo"
import { getI18n } from "@/lib/i18n"
import { SITE } from "@/lib/site-config"
import { useLanguage } from "@/components/language-provider"
import { useMagnifier } from "@/components/magnifier-provider"

export function SiteHeader() {
  const headerRef = useRef<HTMLElement | null>(null)
  const magnifierButtonRef = useRef<HTMLButtonElement | null>(null)
  const { lang, setLang } = useLanguage()
  const {
    enabled: magnifierEnabled,
    toggle: toggleMagnifier,
    setToggleButtonEl,
  } = useMagnifier()
  const copy = getI18n(lang)

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    const updateHeaderHeight = () => {
      const height = header.getBoundingClientRect().height
      document.documentElement.style.setProperty(
        "--header-h",
        `${height}px`
      )
    }

    updateHeaderHeight()

    const observer = new ResizeObserver(() => {
      updateHeaderHeight()
    })
    observer.observe(header)

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    setToggleButtonEl(magnifierButtonRef.current)
    return () => setToggleButtonEl(null)
  }, [setToggleButtonEl])

  return (
    <header
      className="sticky top-0 z-40 border-b border-border/30 bg-background/80 backdrop-blur"
      aria-label="Верхняя панель"
      ref={headerRef}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <a
            href="#main-content"
            className="flex items-center gap-3 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            aria-label="На главную"
          >
          <Logo variant="wordmark" className="h-8 w-auto" priority alt="ALAU" />
          <span className="sr-only">{SITE.name}</span>
          </a>

          <div className="flex items-center gap-2">
            <div className="inline-flex items-center rounded-xl border border-border/40 bg-card p-1">
              <button
                type="button"
                onClick={() => setLang("ru")}
                className={`interactive-ease min-w-[44px] rounded-lg px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${lang === "ru" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                aria-pressed={lang === "ru"}
              >
                {"RU"}
              </button>
              <button
                type="button"
                onClick={() => setLang("kk")}
                className={`interactive-ease min-w-[44px] rounded-lg px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${lang === "kk" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                aria-pressed={lang === "kk"}
              >
                {"KZ"}
              </button>
            </div>
            <button
              ref={magnifierButtonRef}
              type="button"
              onClick={toggleMagnifier}
              className={`interactive-ease flex h-11 w-11 items-center justify-center rounded-xl border border-border/40 bg-card text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${magnifierEnabled ? "text-primary" : ""}`}
              aria-label="Toggle magnifier"
              aria-pressed={magnifierEnabled}
            >
              <ZoomIn className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <nav aria-label="Разделы" className="flex flex-wrap items-center gap-4 text-sm">
          <a href="#hero" className="interactive-ease text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
            {copy.header.home}
          </a>
          <a href="#audience" className="interactive-ease text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
            {copy.header.audience}
          </a>
          <a href="#how-it-works" className="interactive-ease text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
            {copy.header.howItWorks}
          </a>
          <a href="#navigator" className="interactive-ease text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
            {copy.header.navigator}
          </a>
          <a href="#contacts" className="interactive-ease text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
            {copy.header.contacts}
          </a>
        </nav>
      </div>
    </header>
  )
}
