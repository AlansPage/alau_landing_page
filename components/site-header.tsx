"use client"

import { useCallback, useEffect, useRef } from "react"
import { X } from "lucide-react"

import { Logo } from "@/components/logo"
import { getI18n } from "@/lib/i18n"
import { SITE } from "@/lib/site-config"
import { useLanguage } from "@/components/language-provider"
import { useMobileNav } from "@/components/mobile-nav-provider"

const NAV_LINK_CLASS =
  "interactive-ease inline-flex min-h-[44px] items-center rounded-lg px-3 py-2 text-[15px] font-medium tracking-[0.01em] text-foreground/85 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary md:text-[18px] md:font-semibold"

export function SiteHeader() {
  const headerRef = useRef<HTMLElement | null>(null)
  const navRef = useRef<HTMLDivElement | null>(null)
  const { lang } = useLanguage()
  const copy = getI18n(lang)
  const { menuOpen, closeMenu } = useMobileNav()

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

  /* Focus trap when mobile menu is open */
  useEffect(() => {
    if (!menuOpen) return

    const navEl = navRef.current
    if (!navEl) return

    const focusableSelector =
      'a[href], button, [tabindex]:not([tabindex="-1"])'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu()
        return
      }

      if (e.key !== "Tab") return

      const focusableElements = navEl.querySelectorAll<HTMLElement>(focusableSelector)
      if (focusableElements.length === 0) return

      const first = focusableElements[0]
      const last = focusableElements[focusableElements.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    /* Focus first focusable element when menu opens */
    const focusableElements = navEl.querySelectorAll<HTMLElement>(focusableSelector)
    if (focusableElements.length > 0) {
      focusableElements[0].focus()
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [menuOpen, closeMenu])

  const handleNavLinkClick = useCallback(() => {
    closeMenu()
  }, [closeMenu])

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

        {/* Mobile nav overlay */}
        {menuOpen && (
          <div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[hsl(var(--paper-bg)/0.98)] backdrop-blur-sm md:hidden"
            ref={navRef}
            role="dialog"
            aria-modal="true"
            aria-label={copy.header.menuOpen}
          >
            <button
              type="button"
              onClick={closeMenu}
              className="absolute right-4 top-4 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl text-muted-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:hidden"
              aria-label={copy.header.menuClose}
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>

            <nav
              id="main-nav"
              aria-label="Разделы"
              className="flex flex-col items-center justify-center gap-y-2"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={NAV_LINK_CLASS}
                  onClick={handleNavLinkClick}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        )}

        {/* Desktop nav (always visible on md+) */}
        <nav
          id={menuOpen ? undefined : "main-nav"}
          aria-label="Разделы"
          className={`${menuOpen ? "hidden md:flex" : "hidden md:flex"} flex-wrap items-center justify-center gap-x-2 gap-y-0 md:gap-x-5 md:gap-y-1`}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={NAV_LINK_CLASS}
              onClick={handleNavLinkClick}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
