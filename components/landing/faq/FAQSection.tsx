import FAQAccordion from '@/components/landing/faq/FAQAccordion'
import { useTranslations, useMessages } from 'next-intl'

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
  return (
    <section
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/assets/images/backgrounds/faq-bg.png')",
      }}
    >
      <div className="container mx-auto px-6 py-10">
        <h2 className="mb-4">{t('title')}</h2>
        <FAQAccordion items={items} />
      </div>
    </section>
  )
}
