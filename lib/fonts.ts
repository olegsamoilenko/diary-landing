import { Manrope, Prata } from 'next/font/google'

export const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-manrope',
  display: 'swap',
})

export const prata = Prata({
  subsets: ['latin', 'cyrillic'],
  weight: '400',
  variable: '--font-prata',
  display: 'swap',
})
