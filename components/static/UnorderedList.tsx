import React from 'react'
import { cn } from '@/lib/utils'

type UnorderedListProps = {
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
}

export default function UnorderedList({
  size = 'md',
  children,
  className,
}: UnorderedListProps) {
  return (
    <ul
      className={cn(
        'list-inside list-disc',
        size === 'sm' && 'text-[12px]',
        size === 'md' && 'text-[14px] lg:text-[16px]',
        size === 'lg' && 'text-[16px] lg:text-[20px]',
        className,
      )}
    >
      {children}
    </ul>
  )
}
