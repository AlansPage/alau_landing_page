import { HeroSection } from "@/components/hero-section"
import { AudienceSection } from "@/components/audience-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { FeaturesSection } from "@/components/features-section"
import { SocialProofSection } from "@/components/social-proof-section"
import { ContactSection } from "@/components/contact-section"
import { FaqSection } from "@/components/faq-section"
import { FooterSection } from "@/components/footer-section"
import { SiteHeader } from "@/components/site-header"
import { FloatingControls } from "@/components/floating-controls"
import { RevealInitializer } from "@/components/reveal-initializer"

export default function Page() {
  return (
    <>
      <span id="hero" aria-hidden="true" />

      {/* Skip to content link */}
      <a href="#main-content" className="skip-to-content">
        {"Перейти к содержимому"}
      </a>

      <SiteHeader />
      <RevealInitializer />

      <main id="main-content" className="pt-[var(--header-h)]">
        <HeroSection />
        <AudienceSection />
        <HowItWorksSection />
        <FeaturesSection />
        <SocialProofSection />
        <ContactSection />
        <FaqSection />
      </main>

      <FloatingControls />
      <FooterSection />
    </>
  )
}
