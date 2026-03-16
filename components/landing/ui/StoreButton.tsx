import React from 'react'
import clsx from 'clsx'

type StoreButtonProps = {
  icon?: React.ReactNode
  children: React.ReactNode
  href?: string
  className?: string
  iconClassName?: string
  contentClassName?: string
}

export default function StoreButton({
  icon,
  children,
  href,
  className,
  iconClassName,
  contentClassName,
}: StoreButtonProps) {
  const content = (
    <>
      {icon ? (
        <span
          className={clsx(
            'flex shrink-0 items-center justify-center',
            'h-6 w-6 md:h-7 md:w-7',
            iconClassName,
          )}
        >
          {icon}
        </span>
      ) : null}

      <span
        className={clsx(
          'text-[15px] leading-none font-semibold tracking-[-0.02em]',
          'md:text-[18px]',
          contentClassName,
        )}
      >
        {children}
      </span>
    </>
  )

  const sharedClassName = clsx(
    'inline-flex items-center justify-center gap-3 rounded-full',
    'min-h-14 px-7',
    'md:min-h-16 md:px-9',
    'bg-[var(--landing-text-strong)] text-[var(--landing-text-inverse)]',
    'shadow-[0_10px_24px_-12px_var(--landing-shadow-color)]',
    'transition-all duration-200',
    'hover:-translate-y-[1px] hover:shadow-[0_14px_30px_-12px_var(--landing-shadow-color)]',
    'active:translate-y-0 active:scale-[0.99]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--landing-focus-ring)] focus-visible:ring-offset-2',
    className,
  )

  if (href) {
    return (
      <a href={href} className={sharedClassName}>
        {content}
      </a>
    )
  }

  return <button className={sharedClassName}>{content}</button>
}
