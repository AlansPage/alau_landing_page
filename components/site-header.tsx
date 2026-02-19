"use client"

import { useEffect, useRef } from "react"

import Image from "next/image"

import { Logo } from "@/components/logo"
import { getI18n } from "@/lib/i18n"
import { SITE } from "@/lib/site-config"
import { useLanguage } from "@/components/language-provider"

const NAV_LINK_CLASS =
  "interactive-ease inline-flex min-h-[44px] items-center rounded-lg px-3 py-2 text-[18px] font-semibold tracking-[0.01em] text-foreground/85 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"

export function SiteHeader() {
  const headerRef = useRef<HTMLElement | null>(null)
  const { lang } = useLanguage()
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
      className="fixed inset-x-0 top-0 z-40 border-b border-border/35 bg-[hsl(var(--paper-bg))]"
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
          id="main-nav"
          aria-label="Разделы"
          className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 md:gap-x-5"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={NAV_LINK_CLASS}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Decorative accessibility badge (non-interactive) */}
        <div className="pointer-events-none select-none" aria-hidden="true">
          <div className="relative h-7 w-7 overflow-hidden rounded-md opacity-70">
            <Image
              src="/images/accessibility-badge.png"
              alt=""
              fill
              className="object-cover"
              sizes="28px"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
