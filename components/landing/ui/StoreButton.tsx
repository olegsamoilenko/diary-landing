'use client'

import React from 'react'
import clsx from 'clsx'
import { useSearchParams } from 'next/navigation'

type StoreButtonProps = {
  icon?: React.ReactNode
  children: React.ReactNode
  isLink?: boolean
  className?: string
  iconClassName?: string
  contentClassName?: string
  sublabel?: React.ReactNode
  placement: 'hero' | 'middle' | 'footer'
}

const PLAY_STORE_PACKAGE = 'com.soniac12.nemory'

function buildPlayStoreHref(campaignId?: string | null) {
  const referrerParams = new URLSearchParams()

  referrerParams.set('source', 'landing')
  referrerParams.set('campaignId', campaignId?.trim() ? campaignId : 'organic')

  const playStoreUrl = new URL('https://play.google.com/store/apps/details')
  playStoreUrl.searchParams.set('id', PLAY_STORE_PACKAGE)
  playStoreUrl.searchParams.set('referrer', referrerParams.toString())

  return playStoreUrl.toString()
}

function trackGooglePlayClick(placement: 'hero' | 'middle' | 'footer') {
  if (typeof window === 'undefined') return

  const gtag = (
    window as Window & {
      gtag?: (...args: unknown[]) => void
    }
  ).gtag

  if (!gtag) return

  gtag('event', 'click_google_play', {
    placement,
    destination: 'google_play',
  })
}

export default function StoreButton({
  icon,
  children,
  isLink = true,
  className,
  iconClassName,
  contentClassName,
  sublabel,
  placement,
}: StoreButtonProps) {
  const searchParams = useSearchParams()
  const campaignId = searchParams.get('campaignId')
  const playStoreHref = buildPlayStoreHref(campaignId)

  const content = (
    <>
      {icon ? (
        <span
          className={clsx(
            'flex h-5 w-5 shrink-0 items-center justify-center md:h-6 md:w-6',
            iconClassName,
          )}
        >
          {icon}
        </span>
      ) : null}

      <span className="flex min-w-0 flex-col items-start justify-center">
        {sublabel ? (
          <span className="text-[10px] leading-none font-medium tracking-[0.04em] text-[var(--landing-text-inverse)]/72 md:text-[11px]">
            {sublabel}
          </span>
        ) : null}

        <span
          className={clsx(
            'text-[17px] leading-none font-semibold tracking-[-0.03em] text-[var(--landing-text-inverse)] md:text-[17px]',
            contentClassName,
          )}
        >
          {children}
        </span>
      </span>
    </>
  )

  const sharedClassName = clsx(
    'group inline-flex items-center justify-center gap-3 rounded-[12px]',
    'px-3 py-2 md:px-5 md:py-3',
    'border border-white/6',
    'bg-[linear-gradient(180deg,rgba(44,49,63,0.98)_0%,rgba(28,33,46,0.98)_100%)]',
    'text-[var(--landing-text-inverse)]',
    'shadow-[0_14px_34px_-18px_rgba(34,38,51,0.45),0_2px_10px_0_rgba(255,255,255,0.05)_inset]',
    'transition-[transform,box-shadow,background-color,border-color] duration-200 ease-out',
    'hover:-translate-y-[1px]',
    'hover:shadow-[0_18px_40px_-18px_rgba(34,38,51,0.52),0_2px_12px_0_rgba(255,255,255,0.06)_inset]',
    'active:translate-y-0 active:scale-[0.985]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--landing-focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--landing-header)]',
    className,
  )

  if (isLink) {
    return (
      <a
        href={playStoreHref}
        className={sharedClassName}
        target="_blank"
        rel="noreferrer"
        onClick={() => trackGooglePlayClick(placement)}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      type="button"
      className={sharedClassName}
      onClick={() => trackGooglePlayClick(placement)}
    >
      {content}
    </button>
  )
}
