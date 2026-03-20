import { useTranslations } from 'next-intl'
import StoreButton from '@/components/landing/ui/StoreButton'
import GooglePlayIcon from '@/components/landing/ui/GooglePlayIcon'

export default function FinalCTASection() {
  const t = useTranslations('Sections.FinalCTA')
  return (
    <section
      className="relativeoverflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/assets/images/backgrounds/final-cta.png')",
      }}
    >
      <div className="text-landing-text-inverse container mx-auto px-6 py-5">
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
          <StoreButton
            href="https://play.google.com/store/apps/details?id=com.soniac12.nemory"
            icon={<GooglePlayIcon />}
            sublabel={t('ctaButton')}
            className="mb-6"
          >
            Google Play
          </StoreButton>
        </div>
      </div>
    </section>
  )
}
