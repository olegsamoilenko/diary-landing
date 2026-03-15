'use client'

import Logo from '@/components/landing/header/Logo'
import LanguageSwitcher from '@/components/landing/header/LanguageSwitcher'
import Navigation from '@/components/landing/header/Navigation'
import NavigationMobile from '@/components/landing/header/NavigationMobile'
import { useState } from 'react'
import { useLandingActiveSection } from '@/lib/hooks/useLandingActiveSection'

export default function Header() {
  const [isLanguageSwitcherOpen, setIsLanguageSwitcherOpen] = useState(false)
  const [isNavigationOpen, setIsNavigationOpen] = useState(false)
  const { activeSectionId, setActiveSectionId } = useLandingActiveSection()

  const setIsLanguageSwitcherOpenAction = (open: boolean) => {
    if (open) {
      setIsNavigationOpen(false)
    }
    setIsLanguageSwitcherOpen(open)
  }

  const setIsNavigationOpenAction = (open: boolean) => {
    if (open) {
      setIsLanguageSwitcherOpen(false)
    }
    setIsNavigationOpen(open)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--landing-header-border)] bg-[var(--landing-header)]/85 px-5 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between px-3 py-4">
        <Logo />
        <Navigation
          navClassName="hidden lg:block"
          activeSectionId={activeSectionId}
          setActiveSectionIdAction={setActiveSectionId}
        />
        <div className="flex items-center gap-0 space-x-2 sm:gap-2">
          <LanguageSwitcher
            isLanguageSwitcherOpen={isLanguageSwitcherOpen}
            setIsLanguageSwitcherOpenAction={setIsLanguageSwitcherOpenAction}
          />
          <NavigationMobile
            navClassName="lg:hidden"
            isNavigationOpen={isNavigationOpen}
            setIsNavigationOpenAction={setIsNavigationOpenAction}
            activeSectionId={activeSectionId}
            setActiveSectionIdAction={setActiveSectionId}
          />
        </div>
      </div>
    </header>
  )
}
