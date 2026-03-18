'use client'

import Image from 'next/image'
import TitleEn from './TitleEn'
import { useTranslations } from 'next-intl'
import Pill from '@/components/landing/ui/Pill'
import { Brain, ChartNoAxesColumn, Flame, Target } from 'lucide-react'
import StoreButton from '@/components/landing/ui/StoreButton'
import GooglePlayIcon from '@/components/landing/ui/GooglePlayIcon'
import { useLocale } from 'next-intl'
import { useEffect } from 'react'
import TitleUk from '@/components/landing/hero/TitleUk'

export default function HeroSection() {
  const t = useTranslations('Sections.Hero')
  const locale = useLocale()

  return (
    <section
      className="relative h-[690px] overflow-hidden bg-cover bg-center bg-no-repeat md:h-[500px] lg:h-[530px] xl:h-[530px]"
      style={{
        backgroundImage: "url('/assets/images/backgrounds/hero-bg.png')",
      }}
    >
      <div className="container mx-auto md:flex">
        <div className="max-w-7xl flex-1 px-6 py-4">
          {locale === 'uk' && <TitleUk className="mb-6"></TitleUk>}
          {locale === 'en' && <TitleEn className="mb-6"></TitleEn>}
          <div className="mb-6">
            <p>{t('subtitle')}</p>
          </div>
          <div>
            <StoreButton
              href="https://play.google.com/store/apps/details?id=com.soniac12.nemory"
              icon={<GooglePlayIcon />}
              sublabel={t('downloadOn')}
              className="mb-6"
            >
              Google Play
            </StoreButton>
          </div>
          {locale === 'en' && (
            <div className="mb-4 flex items-center justify-center gap-4 md:hidden">
              <Image
                src="/assets/images/screens/screen-02-en.png"
                alt="Nemory prom screen"
                width={1152}
                height={2048}
                className="relative left-14 z-1 -mb-4 h-[210px] w-auto [transform:perspective(1000px)_rotateY(-24deg)] bg-transparent"
                priority
              />
              <Image
                src="/assets/images/screens/screen-01-en.png"
                alt="Nemory prom screen"
                width={1152}
                height={2048}
                className="relative z-2 h-[250px] w-auto bg-transparent"
                priority
              />
              <Image
                src="/assets/images/screens/screen-03-en.png"
                alt="Nemory prom screen"
                width={1152}
                height={2048}
                className="relative right-14 z-1 -mb-4 h-[210px] w-auto [transform:perspective(1000px)_rotateY(24deg)] bg-transparent"
                priority
              />
            </div>
          )}
          {locale === 'uk' && (
            <div className="mb-4 flex items-center justify-center gap-4 md:hidden">
              <Image
                src="/assets/images/screens/screen-02-uk.png"
                alt="Nemory prom screen"
                width={1152}
                height={2048}
                className="relative left-14 z-1 -mb-4 h-[210px] w-auto [transform:perspective(1000px)_rotateY(-24deg)] bg-transparent"
                priority
              />
              <Image
                src="/assets/images/screens/screen-01-uk.png"
                alt="Nemory prom screen"
                width={1152}
                height={2048}
                className="relative z-2 h-[250px] w-auto bg-transparent"
                priority
              />
              <Image
                src="/assets/images/screens/screen-03-uk.png"
                alt="Nemory prom screen"
                width={1152}
                height={2048}
                className="relative right-14 z-1 -mb-4 h-[210px] w-auto [transform:perspective(1000px)_rotateY(24deg)] bg-transparent"
                priority
              />
            </div>
          )}

          <div className="mb-6">
            <div className="mb-2 flex items-center justify-center gap-2 md:justify-start">
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
            <div className="flex items-center justify-center gap-2 md:justify-start">
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
        </div>
        {locale === 'en' && (
          <div className="mb-4 hidden flex-1 items-center justify-center gap-4 md:flex">
            <Image
              src="/assets/images/screens/screen-02-en.png"
              alt="Nemory prom screen"
              width={1152}
              height={2048}
              className="relative left-20 z-1 -mb-4 h-[250px] w-auto [transform:perspective(1000px)_rotateY(-24deg)] bg-transparent lg:h-[280px] xl:left-22 xl:h-[310px]"
              priority
            />
            <Image
              src="/assets/images/screens/screen-01-en.png"
              alt="Nemory prom screen"
              width={1152}
              height={2048}
              className="relative z-2 h-[320px] w-auto bg-transparent lg:h-[350px] xl:h-[380px]"
              priority
            />
            <Image
              src="/assets/images/screens/screen-03-en.png"
              alt="Nemory prom screen"
              width={1152}
              height={2048}
              className="relative right-20 z-1 -mb-4 h-[250px] w-auto [transform:perspective(1000px)_rotateY(24deg)] bg-transparent lg:h-[280px] xl:right-22 xl:h-[310px]"
              priority
            />
          </div>
        )}
        {locale === 'uk' && (
          <div className="mb-4 hidden flex-1 items-center justify-center gap-4 md:flex">
            <Image
              src="/assets/images/screens/screen-02-uk.png"
              alt="Nemory prom screen"
              width={1152}
              height={2048}
              className="relative left-20 z-1 -mb-4 h-[250px] w-auto [transform:perspective(1000px)_rotateY(-24deg)] bg-transparent lg:h-[280px] xl:left-22 xl:h-[310px]"
              priority
            />
            <Image
              src="/assets/images/screens/screen-01-uk.png"
              alt="Nemory prom screen"
              width={1152}
              height={2048}
              className="relative z-2 h-[320px] w-auto bg-transparent lg:h-[350px] xl:h-[380px]"
              priority
            />
            <Image
              src="/assets/images/screens/screen-03-uk.png"
              alt="Nemory prom screen"
              width={1152}
              height={2048}
              className="relative right-20 z-1 -mb-4 h-[250px] w-auto [transform:perspective(1000px)_rotateY(24deg)] bg-transparent lg:h-[280px] xl:right-22 xl:h-[310px]"
              priority
            />
          </div>
        )}
      </div>
    </section>
  )
}
