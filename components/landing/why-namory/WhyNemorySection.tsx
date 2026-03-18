import { useLocale, useTranslations } from 'next-intl'
import WhyNemoryCard from '@/components/landing/why-namory/WhyNemoryCard'

export default function WhyNemorySection() {
  const t = useTranslations('Sections.WhyNemory')
  const locale = useLocale()
  return (
    <section
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/assets/images/backgrounds/why-nemory.png')",
      }}
    >
      <div className="container mx-auto px-6 py-4">
        <h2 className="mb-4">{t('title')}</h2>
        <WhyNemoryCard
          title={t('Journaling.title')}
          description={t('Journaling.description')}
          point1={t('Journaling.point1')}
          point2={t('Journaling.point2')}
          point3={t('Journaling.point3')}
          src={
            locale === 'uk'
              ? '/assets/images/screens/screen-06-uk.jpg'
              : '/assets/images/screens/screen-06-en.jpg'
          }
          className="mb-10"
        />
        <WhyNemoryCard
          title={t('AiReflection.title')}
          description={t('AiReflection.description')}
          point1={t('AiReflection.point1')}
          point2={t('AiReflection.point2')}
          point3={t('AiReflection.point3')}
          src={
            locale === 'uk'
              ? '/assets/images/screens/screen-08-uk.jpg'
              : '/assets/images/screens/screen-08-en.jpg'
          }
          className="mb-10"
          reverse={true}
        />
        <WhyNemoryCard
          title={t('Goals.title')}
          description={t('Goals.description')}
          point1={t('Goals.point1')}
          point2={t('Goals.point2')}
          point3={t('Goals.point3')}
          src={
            locale === 'uk'
              ? '/assets/images/screens/screen-09-uk.jpg'
              : '/assets/images/screens/screen-09-en.jpg'
          }
          className="mb-3"
        />
      </div>
    </section>
  )
}
