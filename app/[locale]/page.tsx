import HeroSection from '@/components/landing/hero/HeroSection'
import CredibilityStripSection from '@/components/landing/credibility/CredibilityStripSection'
import WhyNemorySection from '@/components/landing/why-namory/WhyNemorySection'
import CoreFeaturesSection from '@/components/landing/core-features/CoreFeaturesSection'
import HowItWorksSection from '@/components/landing/how-it-works/HowItWorksSection'
import SafeSpaceSection from '@/components/landing/safe-space/SafeSpaceSection'
import ShowcaseGallerySection from '@/components/landing/showcase/ShowcaseGallerySection'
import FinalCTASection from '@/components/landing/FinalCTASection'
import FAQSection from '@/components/landing/FAQSection'
import Header from '@/components/landing/header/Header'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section id="hero" className="scroll-mt-24">
          <HeroSection />
        </section>

        <section id="credibility" className="scroll-mt-24">
          <CredibilityStripSection />
        </section>

        <section id="why-nemory" className="scroll-mt-24">
          <WhyNemorySection />
        </section>

        <section id="features" className="scroll-mt-24">
          <CoreFeaturesSection />
        </section>

        <section id="how-it-works" className="scroll-mt-24">
          <HowItWorksSection />
        </section>

        <section id="privacy" className="scroll-mt-24">
          <SafeSpaceSection />
        </section>

        <section id="gallery" className="scroll-mt-24">
          <ShowcaseGallerySection />
        </section>

        <section id="get-started" className="scroll-mt-24">
          <FinalCTASection />
        </section>

        <section id="faq" className="scroll-mt-24">
          <FAQSection />
        </section>
      </main>
    </>
  )
}
