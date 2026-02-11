"use client"

import Image from "next/image"
import { Send, Instagram, Youtube } from "lucide-react"

import { Logo } from "@/components/logo"
import { CONTACTS, SOCIALS } from "@/lib/site-config"
import { getI18n } from "@/lib/i18n"
import { useLanguage } from "@/components/language-provider"

export function FooterSection() {
  const { lang } = useLanguage()
  const copy = getI18n(lang).footer

  return (
    <footer
      className="anchor-target border-t border-border/30 px-6 py-16 md:py-20 lg:px-8"
      role="contentinfo"
      id="contacts"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          {/* Logo / wordmark */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Logo variant="wordmark" className="h-9 w-auto" alt="ALAU" />
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {copy.description}
            </p>
          </div>

          {/* Partners */}
          <div className="flex flex-col gap-4" aria-label={copy.partnersTitle}>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {copy.partnersTitle}
            </h3>
            <div className="rounded-[1.75rem] border border-border/40 bg-card p-4 shadow-lg shadow-background/40 sm:p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {copy.partners.map((partner) => (
                  <div
                    key={partner.alt}
                    className="hover-lift flex min-h-[88px] items-center justify-center rounded-2xl border border-border/50 bg-background/80 p-4 shadow-sm shadow-background/30"
                  >
                    <Image
                      src={partner.src}
                      width={220}
                      height={120}
                      alt={partner.alt}
                      className="max-h-14 w-auto object-contain sm:max-h-16"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contacts / social links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {copy.contactsTitle}
            </h3>
            <address className="text-sm not-italic leading-relaxed text-muted-foreground">
              {CONTACTS.email}
            </address>
            <nav
              aria-label={copy.socialLabel}
              className="flex items-center gap-3"
            >
              <a
                href={SOCIALS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-border/40 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                aria-label={copy.socialItems.telegram}
              >
                <Send className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={SOCIALS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-border/40 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                aria-label={copy.socialItems.instagram}
              >
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={SOCIALS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-border/40 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                aria-label={copy.socialItems.youtube}
              >
                <Youtube className="h-5 w-5" aria-hidden="true" />
              </a>
            </nav>
          </div>
        </div>

        <div className="mt-12 border-t border-border/20 pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            {copy.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
