"use client"

import Image from "next/image"
import { Send, Instagram, Youtube, Mail } from "lucide-react"

import { Logo } from "@/components/logo"
import { CONTACTS, SOCIALS, LINKS } from "@/lib/site-config"
import { getI18n } from "@/lib/i18n"
import { useLanguage } from "@/components/language-provider"

const socialLinks = [
  { href: SOCIALS.telegram, icon: Send, key: "telegram" as const },
  { href: SOCIALS.instagram, icon: Instagram, key: "instagram" as const },
  { href: SOCIALS.youtube, icon: Youtube, key: "youtube" as const },
]

export function FooterSection() {
  const { lang } = useLanguage()
  const copy = getI18n(lang).footer

  return (
    <footer
      className="px-6 py-20 md:py-28 lg:px-8"
      role="contentinfo"
    >
      {/* Gradient separator line */}
      <div className="mx-auto mb-20 max-w-6xl md:mb-28">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" aria-hidden="true" />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
          {/* Logo + description */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Logo variant="wordmark" className="h-9 w-auto" alt="ALAU" />
            </div>
            <p className="max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
              {copy.description}
            </p>
            {/* Accessibility map link */}
            <a
              href={LINKS.knowledgeBase}
              className="interactive-ease mt-2 inline-flex w-fit text-sm font-semibold text-foreground underline decoration-primary/30 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              {copy.accessibilityMap}
            </a>
          </div>

          {/* Sponsors */}
          <div className="flex flex-col gap-4" aria-label={copy.partnersTitle}>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              {copy.partnersTitle}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {copy.partners.map((partner) => (
                <div
                  key={partner.alt}
                  className="hover-lift flex min-h-[88px] items-center justify-center rounded-2xl border border-border/50 bg-card p-4 shadow-sm shadow-background/30 transition-[border-color,box-shadow] hover:border-primary/30 hover:shadow-[0_0_20px_hsl(var(--flame-core)/0.08)]"
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

          {/* Contacts / social links */}
          <div className="flex flex-col gap-5">
            <h3 id="contacts" className="anchor-target text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              {copy.contactsTitle}
            </h3>

            {/* Email — button-styled mailto link */}
            <a
              href={`mailto:${CONTACTS.email}`}
              className="interactive-ease hover-lift inline-flex min-h-[56px] w-fit items-center gap-3 rounded-2xl bg-primary px-8 py-3 text-base font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              <Mail className="h-5 w-5" aria-hidden="true" />
              {copy.emailLabel}
            </a>

            {/* Social links with visible labels */}
            <nav
              aria-label={copy.socialLabel}
              className="flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            >
              {socialLinks.map(({ href, icon: Icon, key }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive-ease hover-lift flex items-center gap-3 rounded-2xl border border-border/40 bg-card px-4 py-3 text-sm font-medium text-muted-foreground transition-[border-color,color] hover:border-primary/50 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                  {copy.socialItems[key]}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Copyright — gradient separator */}
        <div className="mt-16">
          <div className="h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" aria-hidden="true" />
          <p className="mt-8 text-center text-xs text-muted-foreground">
            {copy.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
