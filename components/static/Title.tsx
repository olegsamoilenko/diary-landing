import React from 'react'
import { cn } from '@/lib/utils'

type TitleTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
type TitleLevel = 1 | 2 | 3 | 4

type TitleProps = {
  level?: TitleLevel
  children: React.ReactNode
  className?: string
} & React.HTMLAttributes<HTMLHeadingElement>

export default function Title({
  level = 1,
  children,
  className,
  ...rest
}: TitleProps) {
  const Tag = `h${level}` as TitleTag
  return (
    <Tag
      className={cn(
        'font-bold',
        level === 1 && 'text-[22px] lg:text-[28px]',
        level === 2 && 'text-[18px] lg:text-[24px]',
        level === 3 && 'text-[16px] lg:text-[20px]',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
}
