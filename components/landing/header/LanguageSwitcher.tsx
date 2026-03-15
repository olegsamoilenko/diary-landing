'use client'

import React, { useEffect, useRef } from 'react'
import { Globe, ChevronDown } from 'lucide-react'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/lib/i18n/navigation'

type LanguageOption = {
  code: 'en' | 'uk'
  label: string
  shortLabel: string
}

const LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', shortLabel: 'EN' },
  { code: 'uk', label: 'Українська', shortLabel: 'UA' },
]

type LanguageSwitcherProps = {
  isLanguageSwitcherOpen: boolean
  setIsLanguageSwitcherOpenAction: (open: boolean) => void
}

export default function LanguageSwitcher({
  isLanguageSwitcherOpen,
  setIsLanguageSwitcherOpenAction,
}: LanguageSwitcherProps) {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!rootRef.current) return
      if (!rootRef.current.contains(event.target as Node)) {
        setIsLanguageSwitcherOpenAction(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [setIsLanguageSwitcherOpenAction])

  const currentLanguage =
    LANGUAGES.find((lang) => lang.code === locale)?.shortLabel ?? 'EN'

  const handleChangeLanguage = (nextLocale: 'en' | 'uk') => {
    if (nextLocale === locale) {
      setIsLanguageSwitcherOpenAction(false)
      return
    }

    setIsLanguageSwitcherOpenAction(false)
    router.replace(pathname, { locale: nextLocale })
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setIsLanguageSwitcherOpenAction(!isLanguageSwitcherOpen)}
        aria-haspopup="menu"
        aria-expanded={isLanguageSwitcherOpen}
        className="border-landing-header-border bg-landing-header text-landing-header-foreground hover:bg-landing-surface flex h-8 items-center gap-2 rounded-full border px-2 text-sm font-medium transition-colors sm:h-10 sm:px-3"
      >
        <Globe className="hidden h-4 w-4 sm:block" />
        <span>{currentLanguage}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            isLanguageSwitcherOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`border-landing-header-border bg-landing-surface absolute top-full right-0 z-50 mt-2 min-w-[168px] origin-top-right transform-gpu rounded-2xl border p-1 shadow-lg transition-[opacity,transform] duration-300 ease-out ${
          isLanguageSwitcherOpen
            ? 'pointer-events-auto visible translate-y-0 opacity-100'
            : 'pointer-events-none invisible -translate-y-3 opacity-0'
        }`}
      >
        {LANGUAGES.map((language) => {
          const isActive = locale === language.code

          return (
            <button
              key={language.code}
              type="button"
              onClick={() => handleChangeLanguage(language.code)}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors ${
                isActive
                  ? 'bg-landing-primary text-landing-primary-foreground'
                  : 'text-landing-text-strong hover:bg-landing-surface-2'
              }`}
            >
              <span>{language.label}</span>
              <span
                className={
                  isActive
                    ? 'text-landing-primary-foreground/80 text-xs'
                    : 'text-landing-text-muted text-xs'
                }
              >
                {language.shortLabel}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
