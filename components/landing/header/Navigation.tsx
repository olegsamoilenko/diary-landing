'use client'

import clsx from 'clsx'
import { useEffect, useMemo, useRef, useState } from 'react'
import { MoreHorizontal } from 'lucide-react'
import { landingNavItems } from '@/lib/constants/landingNavItems'
import { useTranslations } from 'next-intl'

type NavigationProps = {
  navClassName?: string
  activeSectionId: string
  setActiveSectionIdAction: (id: string) => void
}

export default function Navigation({
  navClassName,
  activeSectionId,
  setActiveSectionIdAction,
}: NavigationProps) {
  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const [regularVisibleCount, setRegularVisibleCount] = useState(5)
  const moreRef = useRef<HTMLLIElement | null>(null)
  const t = useTranslations('Header.Menu')

  const ctaItem = useMemo(
    () => landingNavItems.find((item) => item.label === 'getStarted'),
    [],
  )

  const regularItems = useMemo(
    () => landingNavItems.filter((item) => item.label !== 'getStarted'),
    [],
  )

  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth

      if (width >= 1360) {
        setRegularVisibleCount(regularItems.length)
      } else if (width >= 1280) {
        setRegularVisibleCount(7)
      } else if (width >= 1024) {
        setRegularVisibleCount(5)
      } else {
        setRegularVisibleCount(0)
      }
    }

    updateVisibleCount()
    window.addEventListener('resize', updateVisibleCount)

    return () => {
      window.removeEventListener('resize', updateVisibleCount)
    }
  }, [regularItems.length])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!moreRef.current) return
      if (!moreRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const visibleRegularItems = useMemo(
    () => regularItems.slice(0, regularVisibleCount),
    [regularItems, regularVisibleCount],
  )

  const hiddenItems = useMemo(
    () => regularItems.slice(regularVisibleCount),
    [regularItems, regularVisibleCount],
  )

  const handleNavigate = (targetId: string) => {
    setActiveSectionIdAction(targetId)
    setIsMoreOpen(false)

    const el = document.getElementById(targetId)
    if (!el) return

    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <nav className={navClassName} aria-label="Primary navigation">
      <ul className="flex items-center gap-2">
        {visibleRegularItems.map((item) => {
          const isActive = activeSectionId === item.targetId

          return (
            <li key={item.targetId} className="shrink-0">
              <button
                type="button"
                onClick={() => handleNavigate(item.targetId)}
                className={clsx(
                  'rounded-full px-3 py-2 text-[14px] font-medium whitespace-nowrap transition-all duration-200',
                  'focus-visible:ring-2 focus-visible:ring-[var(--landing-primary)]/30 focus-visible:outline-none',
                  isActive
                    ? [
                        'bg-[var(--landing-soft)]',
                        'text-[var(--landing-text-strong)]',
                      ]
                    : [
                        'text-[var(--landing-text)]/88',
                        'hover:bg-[var(--landing-soft)]',
                        'hover:text-[var(--landing-text-strong)]',
                      ],
                )}
              >
                {t(item.label)}
              </button>
            </li>
          )
        })}

        {ctaItem && (
          <li className="shrink-0">
            <button
              type="button"
              onClick={() => handleNavigate(ctaItem.targetId)}
              className={clsx(
                'rounded-full px-4 py-2 text-[14px] font-medium whitespace-nowrap transition-all duration-200',
                'focus-visible:ring-2 focus-visible:ring-[var(--landing-primary)]/30 focus-visible:outline-none',
                activeSectionId === ctaItem.targetId
                  ? [
                      'bg-[var(--landing-primary-hover)]',
                      'text-[var(--landing-primary-foreground)]',
                      'shadow-[0_6px_16px_rgba(15,23,42,0.06)]',
                    ]
                  : [
                      'bg-[var(--landing-primary)]',
                      'text-[var(--landing-primary-foreground)]',
                      'hover:bg-[var(--landing-primary-hover)]',
                      'shadow-[0_6px_16px_rgba(15,23,42,0.06)]',
                    ],
              )}
            >
              {t(ctaItem.label)}
            </button>
          </li>
        )}

        {hiddenItems.length > 0 && (
          <li ref={moreRef} className="relative shrink-0">
            <button
              type="button"
              aria-label="Open more navigation items"
              aria-expanded={isMoreOpen}
              onClick={() => setIsMoreOpen((prev) => !prev)}
              className={clsx(
                'inline-flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200',
                hiddenItems.some((item) => item.targetId === activeSectionId)
                  ? 'bg-[var(--landing-soft)] text-[var(--landing-text-strong)]'
                  : 'text-[var(--landing-text)]/88 hover:bg-[var(--landing-soft)] hover:text-[var(--landing-text-strong)]',
                'focus-visible:ring-2 focus-visible:ring-[var(--landing-primary)]/30 focus-visible:outline-none',
              )}
            >
              <MoreHorizontal size={18} />
            </button>

            {isMoreOpen && (
              <div className="absolute top-[calc(100%+10px)] left-1/2 z-[80] w-[220px] -translate-x-1/2 overflow-hidden rounded-[24px] border border-[var(--landing-header-border)] bg-[var(--landing-surface)]/96 shadow-[0_24px_80px_rgba(15,23,42,0.16)] backdrop-blur-xl">
                <ul className="p-2">
                  {hiddenItems.map((item) => {
                    const isActive = activeSectionId === item.targetId

                    return (
                      <li key={item.targetId}>
                        <button
                          type="button"
                          onClick={() => handleNavigate(item.targetId)}
                          className={clsx(
                            'flex w-full items-center rounded-2xl px-4 py-3 text-left text-[14px] font-medium transition-all duration-200',
                            isActive
                              ? 'bg-[var(--landing-soft)] text-[var(--landing-text-strong)]'
                              : 'text-[var(--landing-text)] hover:bg-[var(--landing-soft)] hover:text-[var(--landing-text-strong)]',
                          )}
                        >
                          {t(item.label)}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
          </li>
        )}
      </ul>
    </nav>
  )
}
