import React from 'react'
import { cn } from '@/lib/utils'

type OrderedListProps = {
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
}

export default function OrderedList({
  size = 'md',
  children,
  className,
}: OrderedListProps) {
  return (
    <ol
      className={cn(
        'list-inside list-decimal text-[16px]',
        size === 'sm' && 'text-[12px]',
        size === 'md' && 'text-[14px] lg:text-[16px]',
        size === 'lg' && 'text-[16px] lg:text-[20px]',
        className,
      )}
    >
      {children}
    </ol>
  )
}
