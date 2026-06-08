import { useLocale, useTranslations } from 'next-intl'
import WhyNemoryCard from '@/components/landing/why-namory/WhyNemoryCard'
import { useSectionViewTracking } from '@/lib/hooks/useSectionViewTracking'

export default function WhyNemorySection() {
  const t = useTranslations('Sections.WhyNemory')
  const locale = useLocale()
  const sectionRef = useSectionViewTracking('why_nemory_3')
  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        // backgroundImage: "url('/assets/images/backgrounds/why-nemory.png')",
        background:
          'radial-gradient(circle at 18% 18%, rgba(203, 187, 166, 0.20), transparent 34%), radial-gradient(circle at 84% 22%, rgba(93, 190, 211, 0.12), transparent 30%), linear-gradient(180deg, #FBFAF5 0%, #F7F3EC 48%, #F2F6F5 100%)',
      }}
    >
      <div className="container mx-auto px-6 py-10">
        <h2 className="mb-4">{t('title')}</h2>
        <WhyNemoryCard
          title={t('Journaling.title')}
          description={t('Journaling.description')}
          point1={t('Journaling.point1')}
          point2={t('Journaling.point2')}
          point3={t('Journaling.point3')}
          src={
            locale === 'uk'
              ? '/assets/images/screens/screen-06-uk-v2.jpg'
              : '/assets/images/screens/screen-06-en-v2.jpg'
          }
        />
        <WhyNemoryCard
          title={t('AiReflection.title')}
          description={t('AiReflection.description')}
          point1={t('AiReflection.point1')}
          point2={t('AiReflection.point2')}
          point3={t('AiReflection.point3')}
          src={
            locale === 'uk'
              ? '/assets/images/screens/screen-08-uk-v2.jpg'
              : '/assets/images/screens/screen-08-en-v2.jpg'
          }
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
              ? '/assets/images/screens/screen-09-uk-v2.jpg'
              : '/assets/images/screens/screen-09-en-v2.jpg'
          }
          className="mb-3"
        />
      </div>
    </section>
  )
}
