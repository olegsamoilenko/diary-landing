import CoreFeaturesCard from '@/components/landing/core-features/CoreFeaturesCard'
import { useTranslations } from 'next-intl'

export default function CoreFeaturesSection() {
  const t = useTranslations('Sections.CoreFeatures')
  return (
    <section
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        // backgroundImage:
        //   "url('/assets/images/backgrounds/core-features-bg.png')",
        background:
          'radial-gradient(circle at 18% 22%, rgba(93, 190, 211, 0.08), transparent 36%), radial-gradient(circle at 82% 16%, rgba(203, 187, 166, 0.14), transparent 34%), linear-gradient(180deg, #FBFAF5 0%, #F8F7F1 52%, #F3F7F5 100%)',
      }}
    >
      <div className="container mx-auto px-6 py-12">
        <h2 className="mb-4">{t('title')}</h2>
        <p className="text-lead mb-4">{t('description')}</p>
        <div>
          <div className="bg-border h-px self-stretch"></div>
          <div className="justify-between gap-4 md:flex">
            <CoreFeaturesCard
              number="01"
              title={t('card1.title')}
              description={t('card1.description')}
            />
            <div className="bg-border h-px self-stretch md:my-4 md:w-px"></div>
            <CoreFeaturesCard
              number="02"
              title={t('card2.title')}
              description={t('card2.description')}
            />
          </div>
          <div className="bg-border h-px self-stretch"></div>
          <div className="justify-between gap-4 md:flex">
            <CoreFeaturesCard
              number="03"
              title={t('card3.title')}
              description={t('card3.description')}
            />
            <div className="bg-border h-px self-stretch md:my-4 md:w-px"></div>
            <CoreFeaturesCard
              number="04"
              title={t('card4.title')}
              description={t('card4.description')}
            />
          </div>
          <div className="bg-border h-px self-stretch"></div>
        </div>
      </div>
    </section>
  )
}
