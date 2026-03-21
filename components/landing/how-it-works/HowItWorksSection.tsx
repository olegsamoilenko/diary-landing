import { useTranslations } from 'next-intl'
import HowItWorksCard from '@/components/landing/how-it-works/HowItWorksCard'

export default function HowItWorksSection() {
  const t = useTranslations('Sections.HowItWorks')
  return (
    <section
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/assets/images/backgrounds/how-it-work-bg.png')",
      }}
    >
      <div className="container mx-auto px-6 py-12">
        <h2 className="mb-4">{t('title')}</h2>
        <p className="text-lead mb-4">{t('description')}</p>
        <div className="flex flex-col items-center justify-center md:hidden">
          <HowItWorksCard
            title={t('card1.title')}
            description={t('card1.description')}
          />
          <div className="bg-landing-primary relative mx-auto -mt-1 h-2 w-2 rounded-full"></div>
          <div className="bg-landing-primary mx-auto my-2 h-6 w-px"></div>
          <div className="bg-landing-primary relative mx-auto -mb-1 h-2 w-2 rounded-full"></div>
          <HowItWorksCard
            title={t('card2.title')}
            description={t('card2.description')}
          />
          <div className="bg-landing-primary relative mx-auto -mt-1 h-2 w-2 rounded-full"></div>
          <div className="bg-landing-primary mx-auto my-2 h-6 w-px"></div>
          <div className="bg-landing-primary relative mx-auto -mb-1 h-2 w-2 rounded-full"></div>
          <HowItWorksCard
            title={t('card3.title')}
            description={t('card3.description')}
          />
          <div className="bg-landing-primary relative mx-auto -mt-1 h-2 w-2 rounded-full"></div>
          <div className="bg-landing-primary mx-auto my-2 h-6 w-px"></div>
          <div className="bg-landing-primary relative mx-auto -mb-1 h-2 w-2 rounded-full"></div>
          <HowItWorksCard
            title={t('card4.title')}
            description={t('card4.description')}
          />
        </div>
        <div className="hidden flex-col items-center justify-center md:flex">
          <div className="relative flex">
            <HowItWorksCard
              title={t('card1.title')}
              description={t('card1.description')}
              className="flex-1"
            />
            <div className="bg-landing-primary relative my-auto -ml-1 h-2 w-2 rounded-full"></div>
            <div className="bg-landing-primary mx-2 my-auto h-px w-6"></div>
            <div className="bg-landing-primary relative my-auto -mr-1 h-2 w-2 rounded-full"></div>
            <HowItWorksCard
              title={t('card2.title')}
              description={t('card2.description')}
              className="flex-1"
            />
            <div className="bg-landing-primary relative my-auto -mr-1 -ml-1 h-2 w-2 rounded-full"></div>
            <div className="border-landing-primary absolute -right-6 -bottom-6 z-10 h-[65%] w-[53%] rounded-r-3xl border-r border-b lg:h-[66%] lg:w-[52%] xl:h-[69%] xl:w-[52%]"></div>
          </div>

          <div className="bg-landing-primary invisible mx-auto my-2 h-6 w-px"></div>
          <div className="bg-landing-primary invisible relative mx-auto -mb-1 h-2 w-2 rounded-full"></div>
          <div className="relative flex">
            <div className="bg-landing-primary relative my-auto -mr-1 -ml-1 h-2 w-2 rounded-full"></div>
            <div className="border-landing-primary absolute -top-[21px] -left-6 z-10 h-[63%] w-[54%] rounded-l-3xl border-t border-l lg:h-[64%] lg:w-[52%] xl:h-[67%]"></div>
            <HowItWorksCard
              title={t('card3.title')}
              description={t('card3.description')}
              className="flex-1"
            />
            <div className="bg-landing-primary relative my-auto -ml-1 h-2 w-2 rounded-full"></div>
            <div className="bg-landing-primary mx-2 my-auto h-px w-6"></div>
            <div className="bg-landing-primary relative my-auto -mr-1 h-2 w-2 rounded-full"></div>
            <HowItWorksCard
              title={t('card4.title')}
              description={t('card4.description')}
              className="flex-1"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
