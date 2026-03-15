'use client'

import { Menu, X } from 'lucide-react'
import clsx from 'clsx'
import { useEffect, useRef } from 'react'
import { landingNavItems } from '@/lib/constants/landingNavItems'
import { useTranslations } from 'next-intl'

type NavigationProps = {
  navClassName?: string
  isNavigationOpen: boolean
  setIsNavigationOpenAction: (isOpen: boolean) => void
  activeSectionId: string
  setActiveSectionIdAction: (id: string) => void
}

export default function NavigationMobile({
  navClassName,
  isNavigationOpen,
  setIsNavigationOpenAction,
  activeSectionId,
  setActiveSectionIdAction,
}: NavigationProps) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const t = useTranslations('Header.Menu')

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!rootRef.current) return
      if (!rootRef.current.contains(event.target as Node)) {
        setIsNavigationOpenAction(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [setIsNavigationOpenAction])

  const handleNavigate = (targetId: string) => {
    setActiveSectionIdAction(targetId)
    setIsNavigationOpenAction(false)

    const el = document.getElementById(targetId)
    if (!el) return

    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <nav ref={rootRef} className={clsx(navClassName, 'relative z-50')}>
      <button
        type="button"
        aria-label={
          isNavigationOpen ? 'Close navigation menu' : 'Open navigation menu'
        }
        aria-expanded={isNavigationOpen}
        aria-haspopup="menu"
        onClick={() => setIsNavigationOpenAction(!isNavigationOpen)}
        className={clsx(
          'relative z-[60] inline-flex h-9 w-9 items-center justify-center rounded-full sm:h-11 sm:w-11',
          'border border-[var(--landing-header-border)]',
          'bg-[var(--landing-header)]/88 backdrop-blur-md',
          'text-[var(--landing-text-strong)]',
          'transition-all duration-200',
          'hover:bg-[var(--landing-surface)]',
          'active:scale-[0.97]',
        )}
      >
        <span
          className={clsx(
            'transition-transform duration-200',
            isNavigationOpen && 'rotate-90',
          )}
        >
          {isNavigationOpen ? (
            <X size={20} strokeWidth={1.8} />
          ) : (
            <Menu size={20} strokeWidth={1.8} />
          )}
        </span>
      </button>

      <div
        className={clsx(
          'absolute top-[calc(100%+12px)] right-0 z-50 origin-top-right',
          'w-[280px]',
          'transition-all duration-300 ease-out',
          isNavigationOpen
            ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none -translate-y-2 scale-[0.98] opacity-0',
        )}
      >
        <div
          className={clsx(
            'overflow-hidden rounded-[28px] border',
            'border-[var(--landing-header-border)]',
            'bg-[var(--landing-surface)] backdrop-blur-xl',
            'shadow-[0_20px_60px_rgba(15,23,42,0.14)]',
          )}
        >
          <div className="px-4 pt-4 pb-2">
            <div className="text-xs font-medium tracking-[0.18em] text-[var(--landing-text-muted)] uppercase">
              Navigation
            </div>
          </div>

          <ul className="px-2 pb-2">
            {landingNavItems.map((item, index) => {
              const isPrimary = item.label === 'getStarted'
              const isActive = activeSectionId === item.targetId

              return (
                <li key={item.targetId}>
                  <button
                    type="button"
                    className={clsx(
                      'flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left',
                      'transition-all duration-200',
                      isPrimary
                        ? isActive
                          ? [
                              'mt-2 bg-[var(--landing-primary-soft)]',
                              'text-[var(--landing-text-strong)]',
                              'ring-1 ring-[var(--landing-primary)]/25',
                            ]
                          : [
                              'mt-2 bg-[var(--landing-primary-soft)]',
                              'text-[var(--landing-text-strong)]',
                              'hover:bg-[var(--landing-primary-soft)]/80',
                            ]
                        : isActive
                          ? [
                              'bg-[var(--landing-soft)]',
                              'text-[var(--landing-text-strong)]',
                            ]
                          : [
                              'text-[var(--landing-text)]',
                              'hover:bg-[var(--landing-soft)]',
                              'hover:text-[var(--landing-text-strong)]',
                            ],
                    )}
                    onClick={() => handleNavigate(item.targetId)}
                  >
                    <span className="text-[15px] font-medium">
                      {t(item.label)}
                    </span>

                    {isPrimary ? (
                      <span
                        className={clsx(
                          'rounded-full px-2.5 py-1 text-xs font-semibold',
                          isActive
                            ? 'bg-[var(--landing-primary)] text-[var(--landing-primary-foreground)]'
                            : 'bg-[var(--landing-primary)] text-[var(--landing-primary-foreground)]',
                        )}
                      >
                        Start
                      </span>
                    ) : (
                      <span
                        className={clsx(
                          isActive
                            ? 'text-[var(--landing-text-strong)]/60'
                            : 'text-[var(--landing-text-muted)]',
                        )}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </nav>
  )
}
