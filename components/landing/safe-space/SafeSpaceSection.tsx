import { useTranslations } from 'next-intl'
import SafeSpaceCard from '@/components/landing/safe-space/SafeSpaceCard'
import { Smartphone, Shield, Brain } from 'lucide-react'

export default function SafeSpaceSection() {
  const t = useTranslations('Sections.SafeSpace')
  return (
    <section
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/assets/images/backgrounds/safe-space-bg.png')",
      }}
    >
      <div className="container mx-auto px-6 py-5">
        <h2 className="mb-4">{t('title')}</h2>
        <p className="text-lead mb-8">{t('description')}</p>
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row">
          <SafeSpaceCard
            icon={<Smartphone className="text-landing-primary lg:h-8 lg:w-8" />}
            className="flex-1"
            text={t('point1')}
          />
          <SafeSpaceCard
            icon={<Shield className="text-landing-primary lg:h-8 lg:w-8" />}
            className="flex-1"
            text={t('point2')}
          />
          <SafeSpaceCard
            icon={<Brain className="text-landing-primary lg:h-8 lg:w-8" />}
            className="flex-1"
            text={t('point3')}
          />
        </div>
      </div>
    </section>
  )
}
