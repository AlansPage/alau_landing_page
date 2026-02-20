"use client"

import { useEffect, useRef, useState } from "react"

import { Logo } from "@/components/logo"
import { getI18n } from "@/lib/i18n"
import { SITE } from "@/lib/site-config"
import { useLanguage } from "@/components/language-provider"

const NAV_LINK_CLASS =
  "interactive-ease inline-flex min-h-[44px] items-center rounded-lg px-3 py-2 text-[15px] font-medium tracking-[0.01em] text-foreground/85 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary md:text-[18px] md:font-semibold"

export function SiteHeader() {
  const headerRef = useRef<HTMLElement | null>(null)
  const navRef = useRef<HTMLElement | null>(null)
  const lastTriggerRef = useRef<HTMLElement | null>(null)
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

  useEffect(() => {
    const handler = (event: Event) => {
      const custom = event as CustomEvent<{ triggerId?: string }>
      if (custom.detail?.triggerId) {
        const trigger = document.getElementById(custom.detail.triggerId)
        if (trigger instanceof HTMLElement) lastTriggerRef.current = trigger
      }
      setMenuOpen((prev) => !prev)
    }
    window.addEventListener("toggle-mobile-nav", handler as EventListener)
    return () => window.removeEventListener("toggle-mobile-nav", handler as EventListener)
  }, [])

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("mobile-nav-state", { detail: { open: menuOpen } }))
  }, [menuOpen])

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const isMobile = window.matchMedia("(max-width: 767px)").matches
    if (!isMobile || !menuOpen) return

    const focusable = Array.from(
      nav.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
    )
    if (focusable.length > 0) focusable[0].focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false)
        return
      }
      if (event.key !== "Tab" || focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement as HTMLElement | null

      if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [menuOpen])

  useEffect(() => {
    if (menuOpen) return
    if (lastTriggerRef.current) {
      lastTriggerRef.current.focus()
      lastTriggerRef.current = null
    }
  }, [menuOpen])

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
      className="fixed inset-x-0 top-0 z-40 border-b border-border/35 bg-[hsl(var(--paper-bg)/0.95)] backdrop-blur-sm"
      aria-label="Верхняя панель"
      ref={headerRef}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-5 lg:px-8">
        <a
          href="#main-content"
          className="flex w-fit items-center gap-3 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          aria-label="На главную"
        >
          <Logo variant="wordmark" className="h-8 w-auto" priority decorative />
          <span className="sr-only">{SITE.name}</span>
        </a>

        <nav
          ref={navRef}
          id="main-nav"
          aria-label="Разделы"
          className={`w-full flex-wrap items-center justify-center gap-x-2 gap-y-0 ${menuOpen ? "flex" : "hidden"} md:flex md:gap-x-5 md:gap-y-1`}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={NAV_LINK_CLASS}
              onClick={() => {
                if (window.matchMedia("(max-width: 767px)").matches) {
                  setMenuOpen(false)
                }
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
