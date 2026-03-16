import React from 'react'
import clsx from 'clsx'

type PillProps = {
  icon?: React.ReactNode
  children: React.ReactNode
  className?: string
  iconWrapperClassName?: string
  iconClassName?: string
  contentClassName?: string
}

export default function Pill({
  icon,
  children,
  className,
  iconWrapperClassName,
  iconClassName,
  contentClassName,
}: PillProps) {
  return (
    <div
      className={clsx(
        'inline-flex items-center rounded-full border whitespace-nowrap',
        'border-landing-border bg-landing-surface',
        'gap-2 px-3 py-2',
        'md:gap-2.5 md:px-4 md:py-2.5',
        'shadow-[0_8px_24px_-12px_var(--landing-shadow-color)]',
        className,
      )}
    >
      {icon ? (
        <span
          className={clsx(
            'flex h-4 w-4 shrink-0 items-center justify-center rounded-full',
            // 'bg-landing-accent-soft',
            'md:h-6 md:w-6',
            iconWrapperClassName,
          )}
        >
          <span
            className={clsx(
              'flex items-center justify-center',
              'text-landing-secondary-foreground',
              iconClassName,
            )}
          >
            {icon}
          </span>
        </span>
      ) : null}

      <span
        className={clsx(
          'text-landing-text text-[13px] leading-none font-medium',
          'md:text-[14px]',
          contentClassName,
        )}
      >
        {children}
      </span>
    </div>
  )
}
