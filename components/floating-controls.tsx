"use client"

import Image from "next/image"
import { Menu } from "lucide-react"

import { getI18n } from "@/lib/i18n"
import { useLanguage } from "@/components/language-provider"

const BTN_CLASS =
  "interactive-ease flex min-h-[48px] min-w-[48px] items-center justify-center rounded-xl text-muted-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"

export function FloatingControls() {
  const { lang, setLang } = useLanguage()
  const copy = getI18n(lang)

  const handleMenuToggle = () => {
    window.dispatchEvent(new CustomEvent("toggle-mobile-nav"))
  }

  return (
    <div
      className="fixed right-3 top-1/2 z-50 flex -translate-y-1/2 flex-col items-center gap-2 rounded-2xl border border-border/40 bg-card/90 p-2 shadow-lg backdrop-blur-sm md:right-6"
      aria-label="Панель управления"
      role="toolbar"
    >
      <button
        type="button"
        onClick={() => setLang("ru")}
        className={`${BTN_CLASS} text-sm font-semibold ${lang === "ru" ? "bg-primary text-primary-foreground" : ""}`}
        aria-pressed={lang === "ru"}
        aria-label={copy.header.langRu}
      >
        {"RU"}
      </button>
      <button
        type="button"
        onClick={() => setLang("kk")}
        className={`${BTN_CLASS} text-sm font-semibold ${lang === "kk" ? "bg-primary text-primary-foreground" : ""}`}
        aria-pressed={lang === "kk"}
        aria-label={copy.header.langKk}
      >
        {"KZ"}
      </button>
      <div className="h-px w-8 bg-border/30" aria-hidden="true" />
      <div className="pointer-events-none select-none" aria-hidden="true">
        <div className="relative h-[52px] w-[52px] overflow-hidden rounded-lg opacity-85">
          <Image
            src="/images/accessibility-badge.png"
            alt=""
            fill
            className="object-cover"
            sizes="52px"
          />
        </div>
      </div>
      <button
        type="button"
        onClick={handleMenuToggle}
        className={`${BTN_CLASS} md:hidden`}
        aria-label={copy.header.menuOpen}
        aria-controls="main-nav"
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  )
}
