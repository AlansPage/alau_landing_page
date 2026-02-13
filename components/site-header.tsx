"use client"

import { useEffect, useRef, useState } from "react"
import { ZoomIn, Menu, X } from "lucide-react"

import { Logo } from "@/components/logo"
import { getI18n } from "@/lib/i18n"
import { SITE } from "@/lib/site-config"
import { useLanguage } from "@/components/language-provider"
import { useMagnifier } from "@/components/magnifier-provider"

const NAV_LINK_CLASS =
  "interactive-ease inline-flex min-h-[44px] items-center rounded-lg px-2 py-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"

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
  const [menuOpen, setMenuOpen] = useState(false)

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

  // Close menu when a nav link is clicked
  const handleNavClick = () => setMenuOpen(false)

  const navLinks = [
    { href: "#hero", label: copy.header.home },
    { href: "#audience", label: copy.header.audience },
    { href: "#how-it-works", label: copy.header.howItWorks },
    { href: "#features", label: copy.header.features },
    { href: "#testimonials", label: copy.header.testimonials },
    { href: "#contact", label: copy.header.contact },
    { href: "#faq", label: copy.header.faq },
  ]

  return (
    <header
      className="sticky top-1 z-40 border-b border-border/30 bg-background/80 backdrop-blur"
      aria-label="Верхняя панель"
      ref={headerRef}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 lg:px-8">
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
                className={`interactive-ease min-h-[44px] min-w-[44px] rounded-lg px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${lang === "ru" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                aria-pressed={lang === "ru"}
                aria-label={copy.header.langRu}
              >
                {"RU"}
              </button>
              <button
                type="button"
                onClick={() => setLang("kk")}
                className={`interactive-ease min-h-[44px] min-w-[44px] rounded-lg px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${lang === "kk" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                aria-pressed={lang === "kk"}
                aria-label={copy.header.langKk}
              >
                {"KZ"}
              </button>
            </div>
            <button
              ref={magnifierButtonRef}
              type="button"
              onClick={toggleMagnifier}
              className={`interactive-ease flex h-11 w-11 items-center justify-center rounded-xl border border-border/40 bg-card text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${magnifierEnabled ? "text-primary" : ""}`}
              aria-label={copy.header.magnifierLabel}
              aria-pressed={magnifierEnabled}
            >
              <ZoomIn className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Hamburger toggle — visible only on small screens */}
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="interactive-ease flex h-11 w-11 items-center justify-center rounded-xl border border-border/40 bg-card text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary md:hidden"
              aria-label={menuOpen ? copy.header.menuClose : copy.header.menuOpen}
              aria-expanded={menuOpen}
              aria-controls="main-nav"
            >
              {menuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Desktop nav — always visible */}
        <nav
          id="main-nav"
          aria-label="Разделы"
          className={`flex-wrap items-center gap-1 text-sm md:flex ${menuOpen ? "flex" : "hidden"}`}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={NAV_LINK_CLASS}
              onClick={handleNavClick}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
