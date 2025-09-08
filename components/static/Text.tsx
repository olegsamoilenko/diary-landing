import React from 'react'
import { cn } from '@/lib/utils'

type ParagraphProps = {
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
}
export default function Text({
  size = 'md',
  children,
  className,
  ...rest
}: ParagraphProps) {
  return (
    <p
      className={cn(
        size === 'sm' && 'text-[12px]',
        size === 'md' && 'text-[14px] lg:text-[16px]',
        size === 'lg' && 'text-[16px] lg:text-[20px]',
        className,
      )}
      {...rest}
    >
      {children}
    </p>
  )
}
