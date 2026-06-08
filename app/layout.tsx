import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { manrope, prata } from '@/lib/fonts'
import GlobalToaster from '@/components/ui/GlobalToaster'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${manrope.variable} ${prata.variable}`}
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GlobalToaster />
        {children}
      </body>
    </html>
  )
}
