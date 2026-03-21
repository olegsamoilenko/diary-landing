import { useTranslations } from 'next-intl'
import StoreButton from '@/components/landing/ui/StoreButton'
import GooglePlayIcon from '@/components/landing/ui/GooglePlayIcon'
import { Suspense } from 'react'

export default function FinalCTASection() {
  const t = useTranslations('Sections.FinalCTA')
  return (
    <section
      className="relativeoverflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/assets/images/backgrounds/final-cta.png')",
      }}
    >
      <div className="text-landing-text-inverse container mx-auto px-6 py-10">
        <div className="mb-4 text-center">
          <span className="text-landing-text-inverse/70 text-center text-sm">
            {t('subTitle')}
          </span>
        </div>
        <h2 className="mb-1 text-center">
          <span className="text-landing-text-inverse text-center">
            {t('title1')}
          </span>
        </h2>
        <h2 className="mb-4 text-center">
          <span className="text-landing-text-inverse text-center">
            {t('title2')}
          </span>
        </h2>
        <p className="mb-6 text-center">{t('description')}</p>
        <div className="flex justify-center">
          <Suspense fallback={null}>
            <StoreButton
              icon={<GooglePlayIcon />}
              sublabel={t('ctaButton')}
              className="mb-6"
            >
              Google Play
            </StoreButton>
          </Suspense>
        </div>
      </div>
    </section>
  )
}
