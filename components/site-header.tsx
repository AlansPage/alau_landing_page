"use client"

import { useEffect, useRef, useState } from "react"

import { Logo } from "@/components/logo"
import { getI18n } from "@/lib/i18n"
import { SITE } from "@/lib/site-config"
import { useLanguage } from "@/components/language-provider"

const NAV_LINK_CLASS =
  "interactive-ease inline-flex min-h-[44px] items-center rounded-lg px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"

export function SiteHeader() {
  const headerRef = useRef<HTMLElement | null>(null)
  const { lang } = useLanguage()
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

  // Listen for toggle event from floating controls
  useEffect(() => {
    const handler = () => setMenuOpen((prev) => !prev)
    window.addEventListener("toggle-mobile-nav", handler)
    return () => window.removeEventListener("toggle-mobile-nav", handler)
  }, [])

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
      className="sticky top-0 z-40 border-b border-border/30 bg-background/80 backdrop-blur"
      aria-label="Верхняя панель"
      ref={headerRef}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-5 lg:px-8">
        <a
          href="#main-content"
          className="flex w-fit items-center gap-3 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          aria-label="На главную"
        >
          <Logo variant="wordmark" className="h-8 w-auto" priority alt="ALAU" />
          <span className="sr-only">{SITE.name}</span>
        </a>

        <nav
          id="main-nav"
          aria-label="Разделы"
          className={`flex-wrap items-center justify-center gap-1 md:flex ${menuOpen ? "flex" : "hidden"}`}
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
