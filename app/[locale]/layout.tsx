import { NextIntlClientProvider } from 'next-intl'
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server'
import { hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/lib/i18n/routing'
import type { Metadata } from 'next'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

const SITE_URL = 'https://nemoryai.com'
const SITE_NAME = 'Nemory'
const DEFAULT_LOCALE = 'en'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    return {}
  }

  const t = await getTranslations({
    locale,
    namespace: 'Metadata',
  })

  const isUk = locale === 'uk'
  const path = isUk ? '/uk' : '/en'
  const absoluteUrl = `${SITE_URL}${path}`
  const localeTag = isUk ? 'uk_UA' : 'en_US'
  const alternateLocaleTag = isUk ? 'en_US' : 'uk_UA'

  const title = t('title')
  const description = t('description')

  return {
    keywords: isUk
      ? [
          'AI щоденник',
          'розумний щоденник',
          'щоденник настрою',
          'щоденник саморефлексії',
          'додаток для щоденника',
          'звички і цілі',
          'особистий розвиток',
          'приватний щоденник',
        ]
      : [
          'AI journal',
          'smart journal',
          'private diary app',
          'mood tracking app',
          'self reflection journal',
          'habit tracker',
          'goal tracking app',
          'personal growth app',
        ],

    metadataBase: new URL(SITE_URL),

    title,
    description,

    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: 'productivity',
    referrer: 'origin-when-cross-origin',

    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },

    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },

    alternates: {
      canonical: absoluteUrl,
      languages: {
        en: `${SITE_URL}/en`,
        uk: `${SITE_URL}/uk`,
        'x-default': `${SITE_URL}/${DEFAULT_LOCALE}`,
      },
    },

    openGraph: {
      type: 'website',
      url: absoluteUrl,
      siteName: SITE_NAME,
      title,
      description,
      locale: localeTag,
      alternateLocale: [alternateLocaleTag],
      images: [
        {
          url: `${SITE_URL}/${locale}/opengraph-image`,
          width: 1200,
          height: 630,
          alt:
            locale === 'uk'
              ? 'Попередній перегляд застосунку Nemory — AI-щоденник для саморефлексії, відстеження настрою, цілей, звичок і особистого розвитку'
              : 'Nemory app preview — AI journal for self-reflection, mood tracking, goals, habits, and personal growth',
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@nemoryai',
      images: [
        {
          url: `${SITE_URL}/${locale}/twitter-image`,
          alt:
            locale === 'uk'
              ? 'Попередній перегляд застосунку Nemory з AI-рефлексіями, відстеженням настрою, цілями, звичками та інструментами особистого розвитку'
              : 'Nemory smart journal app preview with AI reflections, mood tracking, goals, habits, and personal growth tools',
        },
      ],
    },

    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      ],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
      shortcut: ['/favicon.ico'],
    },

    manifest: '/manifest.webmanifest',
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <div lang={locale} className="landing-theme min-h-screen">
        {children}
      </div>
    </NextIntlClientProvider>
  )
}
