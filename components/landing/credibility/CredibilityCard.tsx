import clsx from 'clsx'
import React from 'react'

type Props = {
  icon: React.ReactNode
  className?: string
  iconClassName?: string
  contentClassName?: string
  children: React.ReactNode
}

export default function CredibilityCard({
  icon,
  className,
  iconClassName,
  contentClassName,
  children,
}: Props) {
  return (
    <div
      className={clsx(
        'border-landing-border flex items-center gap-4 rounded-3xl border bg-white/80 px-3 py-2 shadow-sm',
        className,
      )}
    >
      <span
        className={clsx(
          'flex shrink-0 items-center justify-center md:h-6 md:w-6',
          iconClassName,
        )}
      >
        {icon}
      </span>
      <span className={clsx('', contentClassName)}>{children}</span>
    </div>
  )
}
