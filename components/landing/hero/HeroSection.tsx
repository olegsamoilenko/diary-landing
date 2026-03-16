import Image from 'next/image'
import Title from './Title'
import { useTranslations } from 'next-intl'
import Pill from '@/components/landing/ui/Pill'
import { Brain, ChartNoAxesColumn, Flame, Target } from 'lucide-react'
import StoreButton from '@/components/landing/ui/StoreButton'
import GooglePlayIcon from '@/components/landing/ui/GooglePlayIcon'

export default function HeroSection() {
  const t = useTranslations('Sections.Hero')
  return (
    <section
      className="relative h-[680px] overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/assets/images/backgrounds/hero-bg.png')",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-4">
        <Title className="mb-6" />
        <div className="mb-4 flex items-center justify-center gap-4">
          <Image
            src="/assets/images/screens/screen-3.png"
            alt="Nemory logo"
            width={100}
            height={200}
            className="relative left-14 z-1 h-[190px] w-auto bg-transparent"
            priority
          />
          <Image
            src="/assets/images/screens/screen-1.png"
            alt="Nemory logo"
            width={100}
            height={200}
            className="relative z-2 w-auto bg-transparent"
            priority
          />
          <Image
            src="/assets/images/screens/screen-2.png"
            alt="Nemory logo"
            width={100}
            height={200}
            className="relative right-14 z-1 h-[190px] w-auto bg-transparent"
            priority
          />
        </div>
        <div className="mb-6">
          <p>{t('subtitle')}</p>
        </div>
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-center gap-2">
            <Pill
              icon={
                <Brain
                  className="h-3 w-3 md:h-3.5 md:w-3.5"
                  strokeWidth={1.8}
                  color="var(--landing-primary)"
                />
              }
              // iconWrapperClassName="bg-landing-primary-soft"
              // iconClassName="text-landing-primary"
            >
              {t('aiReflections')}
            </Pill>
            <Pill
              icon={
                <Flame
                  className="h-3 w-3 md:h-3.5 md:w-3.5"
                  strokeWidth={1.8}
                  color="var(--destructive)"
                />
              }
              // iconWrapperClassName="bg-destructive"
              // iconClassName="text-destructive"
            >
              {t('moodTracking')}
            </Pill>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Pill
              icon={
                <Target
                  className="h-3 w-3 md:h-3.5 md:w-3.5"
                  strokeWidth={1.8}
                  color="var(--landing-primary)"
                />
              }
              // iconWrapperClassName="bg-landing-primary-soft"
              // iconClassName="text-landing-primary"
            >
              {t('goalsAndHabits')}
            </Pill>
            <Pill
              icon={
                <ChartNoAxesColumn
                  className="h-3 w-3 md:h-3.5 md:w-3.5"
                  strokeWidth={1.8}
                  color="var(--landing-primary)"
                />
              }
              // iconWrapperClassName="bg-landing-primary-soft"
              // iconClassName="text-landing-primary"
            >
              {t('progressAnalytics')}
            </Pill>
          </div>
        </div>
        <div>
          <StoreButton href="#" icon={<GooglePlayIcon />}>
            {t('getItOn')}
          </StoreButton>
        </div>
      </div>
    </section>
  )
}
