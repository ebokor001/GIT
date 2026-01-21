import { useRef } from 'react'
import {
  Navbar,
  HeroSection,
  RecentRegistrationNotification,
  WhatYouLearnSection,
  UpcomingScheduleSection,
  HostSection,
  RegistrationSection,
  SocialProofSection,
  FAQSection,
  ReplayLibrarySection,
  Footer,
} from '@/components/landing'

export function LandingPage() {
  const registrationRef = useRef<HTMLDivElement>(null)

  const scrollToRegistration = () => {
    registrationRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Floating registration notification */}
      <RecentRegistrationNotification />

      {/* Navigation */}
      <Navbar onRegisterClick={scrollToRegistration} />

      {/* Main content */}
      <main id="main-content">
        {/* Hero Section */}
        <HeroSection onRegisterClick={scrollToRegistration} />

        {/* What You'll Learn Section */}
        <WhatYouLearnSection />

        {/* Upcoming Schedule Section */}
        <UpcomingScheduleSection />

        {/* Host/Speaker Section */}
        <HostSection />

        {/* Registration Section */}
        <div ref={registrationRef}>
          <RegistrationSection id="register" />
        </div>

        {/* Social Proof Section */}
        <SocialProofSection />

        {/* FAQ Section */}
        <section id="faq">
          <FAQSection />
        </section>

        {/* Replay Library Section */}
        <ReplayLibrarySection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
