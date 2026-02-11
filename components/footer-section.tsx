import { Send, Instagram, Youtube } from "lucide-react"

import { Logo } from "@/components/logo"
import { CONTACTS, SITE, SOCIALS } from "@/lib/site-config"

const partnerPlaceholders = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  label: `Партнёр ${i + 1}`,
}))

export function FooterSection() {
  return (
    <footer
      className="border-t border-border/30 px-6 py-16 md:py-20 lg:px-8"
      role="contentinfo"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          {/* Logo / wordmark */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Logo variant="wordmark" className="h-9 w-auto" alt="ALAU" />
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {SITE.description}
            </p>
          </div>

          {/* Partners */}
          <div className="flex flex-col gap-4" aria-label="Партнёры">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {"Партнёры"}
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {partnerPlaceholders.map((p) => (
                <div
                  key={p.id}
                  className="flex h-11 items-center justify-center rounded-xl border border-border/40 bg-secondary px-3"
                  role="img"
                  aria-label={`${p.label} (placeholder)`}
                >
                  <span className="text-xs font-medium text-muted-foreground">
                    {"Partner"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Contacts / social links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {"Контакты"}
            </h3>
            <address className="text-sm not-italic leading-relaxed text-muted-foreground">
              {CONTACTS.email}
            </address>
            <nav
              aria-label="Социальные сети"
              className="flex items-center gap-3"
            >
              <a
                href={SOCIALS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-border/40 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                aria-label="Telegram"
              >
                <Send className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={SOCIALS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-border/40 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={SOCIALS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-border/40 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" aria-hidden="true" />
              </a>
            </nav>
          </div>
        </div>

        <div className="mt-12 border-t border-border/20 pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            {"© 2026 ALAU. Все права защищены."}
          </p>
        </div>
      </div>
    </footer>
  )
}
