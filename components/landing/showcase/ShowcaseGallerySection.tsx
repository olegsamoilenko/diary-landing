import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import clsx from 'clsx'
import ShowcaseGallerySlider from '@/components/landing/showcase/ShowcaseGallerySlider'

export default function ShowcaseGallerySection() {
  const t = useTranslations('Sections.Showcase')
  const locale = useLocale()
  return (
    <section
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('/assets/images/backgrounds/showcase-gallery-bg.png')",
      }}
    >
      <div className="container mx-auto px-6 py-10">
        <h2 className="mb-4">{t('title')}</h2>
        <p className="text-lead mb-4">{t('description')}</p>
        <div>
          <ShowcaseGallerySlider />
        </div>
      </div>
    </section>
  )
}
