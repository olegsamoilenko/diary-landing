'use client'

import FAQAccordion from '@/components/landing/faq/FAQAccordion'
import { useTranslations, useMessages } from 'next-intl'
import { useSectionViewTracking } from '@/lib/hooks/useSectionViewTracking'

type FAQItem = {
  question: string
  answer: string
}

type Messages = {
  Sections: {
    FAQ: {
      title: string
      items: FAQItem[]
    }
  }
}

export default function FAQSection() {
  const t = useTranslations('Sections.FAQ')
  const messages = useMessages() as unknown as Messages

  const items = messages.Sections.FAQ.items
  const sectionRef = useSectionViewTracking('gallery_7')
  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        // backgroundImage: "url('/assets/images/backgrounds/faq-bg.png')",
        background:
          'radial-gradient(circle at 18% 18%, rgba(203, 187, 166, 0.20), transparent 34%), radial-gradient(circle at 84% 22%, rgba(93, 190, 211, 0.12), transparent 30%), linear-gradient(180deg, #FBFAF5 0%, #F7F3EC 48%, #F2F6F5 100%)',
      }}
    >
      <div className="container mx-auto px-6 py-10">
        <h2 className="mb-4">{t('title')}</h2>
        <FAQAccordion items={items} />
      </div>
    </section>
  )
}
