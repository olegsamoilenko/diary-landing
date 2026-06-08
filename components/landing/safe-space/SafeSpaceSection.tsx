'use client'

import { useTranslations } from 'next-intl'
import SafeSpaceCard from '@/components/landing/safe-space/SafeSpaceCard'
import { Smartphone, Shield, Brain } from 'lucide-react'
import { useSectionViewTracking } from '@/lib/hooks/useSectionViewTracking'

export default function SafeSpaceSection() {
  const t = useTranslations('Sections.SafeSpace')
  const sectionRef = useSectionViewTracking('privacy_6')
  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        // backgroundImage: "url('/assets/images/backgrounds/safe-space-bg.png')",
        background:
          'radial-gradient(circle at 20% 24%, rgba(93, 190, 211, 0.06), transparent 34%), radial-gradient(circle at 82% 18%, rgba(203, 187, 166, 0.12), transparent 32%), linear-gradient(180deg, #FCFBF7 0%, #F8F8F3 54%, #F4F7F5 100%)',
      }}
    >
      <div className="container mx-auto px-6 py-12">
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
