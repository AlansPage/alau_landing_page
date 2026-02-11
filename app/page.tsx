import { HeroSection } from "@/components/hero-section"
import { AudienceSection } from "@/components/audience-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { NavigatorSection } from "@/components/navigator-section"
import { FooterSection } from "@/components/footer-section"
import { SiteHeader } from "@/components/site-header"
import { RevealInitializer } from "@/components/reveal-initializer"

export default function Page() {
  return (
    <>
      {/* Skip to content link */}
      <a href="#main-content" className="skip-to-content">
        {"Перейти к содержимому"}
      </a>

      <SiteHeader />
      <RevealInitializer />

      <main id="main-content">
        <HeroSection />
        <AudienceSection />
        <HowItWorksSection />
        <NavigatorSection />
      </main>

      <FooterSection />
    </>
  )
}
