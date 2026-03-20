'use client'

import Logo from '@/components/landing/header/Logo'
import { useTranslations } from 'next-intl'
import StoreButton from '@/components/landing/ui/StoreButton'
import GooglePlayIcon from '@/components/landing/ui/GooglePlayIcon'
import { useMemo } from 'react'
import { landingNavItems } from '@/lib/constants/landingNavItems'
import clsx from 'clsx'
import { useLandingActiveSection } from '@/lib/hooks/useLandingActiveSection'

export default function Footer() {
  const t = useTranslations('Footer')
  const menuItems = [
    landingNavItems[2],
    landingNavItems[3],
    landingNavItems[5],
    landingNavItems[landingNavItems.length - 1],
  ]
  const { activeSectionId, setActiveSectionId } = useLandingActiveSection()

  const handleNavigate = (targetId: string) => {
    setActiveSectionId(targetId)

    const el = document.getElementById(targetId)
    if (!el) return

    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
  return (
    <div className="bg-landing-background">
      <footer className="container mx-auto px-6 py-6">
        <div className="border-landing-border mb-6 border-b pb-4">
          <div className="mb-4">
            <Logo />
          </div>
          <div className="">{t('description')}</div>
        </div>
        <div className="items-center md:flex md:justify-between">
          <nav className="border-landing-border mb-6 flex-1 border-b pb-4 md:pb-11">
            <ul className="sm:flex sm:items-center sm:gap-2">
              {menuItems.map((item) => {
                return (
                  <li key={item.targetId} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => handleNavigate(item.targetId)}
                      className={clsx(
                        'rounded-full px-3 py-2 font-medium whitespace-nowrap transition-all duration-200',
                        'focus-visible:ring-2 focus-visible:ring-[var(--landing-primary)]/30 focus-visible:outline-none',
                        'text-[var(--landing-text)]/88',
                        'hover:bg-[var(--landing-soft)]',
                        'hover:text-[var(--landing-text-strong)]',
                      )}
                    >
                      {t(item.label)}
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>
          <div className="md:border-landing-border mb-4 flex flex-1 justify-center md:border-b">
            <StoreButton
              href="https://play.google.com/store/apps/details?id=com.soniac12.nemory"
              icon={<GooglePlayIcon />}
              sublabel={t('downloadOn')}
              className="mb-6"
            >
              Google Play
            </StoreButton>
          </div>
        </div>
        <div
          className={clsx(
            'border-landing-border flex flex-col gap-2 border-b pb-2 md:flex-row md:items-center md:justify-center',
          )}
        >
          <a href="https://nemoryai.com/privacy" target="_blank">
            {t('privacyPolicy')}
          </a>
          <a href="https://nemoryai.com/terms" target="_blank">
            {t('termOfUse')}
          </a>
        </div>
        <div className="text-small mt-4 text-center text-[var(--landing-text-muted)]">
          Copyright © 2025 Nemory - Smart Journal. All rights reserved
        </div>
      </footer>
    </div>
  )
}
