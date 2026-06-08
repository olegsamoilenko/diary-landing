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
import Script from 'next/script'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

const SITE_URL = 'https://nemoryai.com'
const SITE_NAME = 'Nemory'
const DEFAULT_LOCALE = 'en'

const SEO_LOCALES = routing.locales

const OG_LOCALE_MAP: Record<string, string> = {
  en: 'en_US',
  uk: 'uk_UA',
  de: 'de_DE',
  pl: 'pl_PL',
}

const KEYWORDS_MAP: Record<string, string[]> = {
  en: [
    'AI journal',
    'smart journal',
    'private diary app',
    'mood tracking app',
    'self reflection journal',
    'habit tracker',
    'goal tracking app',
    'personal growth app',
  ],
  uk: [
    'AI щоденник',
    'розумний щоденник',
    'щоденник настрою',
    'щоденник саморефлексії',
    'додаток для щоденника',
    'звички і цілі',
    'особистий розвиток',
    'приватний щоденник',
  ],
  de: [
    'KI Tagebuch',
    'intelligentes Tagebuch',
    'privates Tagebuch App',
    'Stimmungstagebuch',
    'Selbstreflexion Tagebuch',
    'Gewohnheiten Tracker',
    'Ziele Tracker App',
    'persönliche Entwicklung App',
  ],
  pl: [
    'dziennik AI',
    'inteligentny dziennik',
    'prywatny pamiętnik aplikacja',
    'aplikacja do śledzenia nastroju',
    'dziennik autorefleksji',
    'tracker nawyków',
    'aplikacja do celów',
    'aplikacja rozwoju osobistego',
  ],
}

const OG_ALT_MAP: Record<string, string> = {
  en: 'Nemory app preview — AI journal for self-reflection, mood tracking, goals, habits, and personal growth',
  uk: 'Попередній перегляд застосунку Nemory — AI-щоденник для саморефлексії, відстеження настрою, цілей, звичок і особистого розвитку',
  de: 'Vorschau der Nemory App — KI-Tagebuch für Selbstreflexion, Stimmungsverfolgung, Ziele, Gewohnheiten und persönliche Entwicklung',
  pl: 'Podgląd aplikacji Nemory — dziennik AI do autorefleksji, śledzenia nastroju, celów, nawyków i rozwoju osobistego',
}

const TWITTER_ALT_MAP: Record<string, string> = {
  en: 'Nemory smart journal app preview with AI reflections, mood tracking, goals, habits, and personal growth tools',
  uk: 'Попередній перегляд застосунку Nemory з AI-рефлексіями, відстеженням настрою, цілями, звичками та інструментами особистого розвитку',
  de: 'Vorschau der Nemory Smart-Journal-App mit KI-Reflexionen, Stimmungsverfolgung, Zielen, Gewohnheiten und Tools für persönliche Entwicklung',
  pl: 'Podgląd aplikacji Nemory z refleksjami AI, śledzeniem nastroju, celami, nawykami i narzędziami rozwoju osobistego',
}

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

  const absoluteUrl = `${SITE_URL}/${locale}`
  const localeTag = OG_LOCALE_MAP[locale] ?? OG_LOCALE_MAP[DEFAULT_LOCALE]

  const alternateLocaleTags = SEO_LOCALES.filter((item) => item !== locale).map(
    (item) => OG_LOCALE_MAP[item],
  )

  const title = t('title')
  const description = t('description')

  return {
    keywords: KEYWORDS_MAP[locale] ?? KEYWORDS_MAP[DEFAULT_LOCALE],

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
        de: `${SITE_URL}/de`,
        pl: `${SITE_URL}/pl`,
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
      alternateLocale: alternateLocaleTags,
      images: [
        {
          url: `${SITE_URL}/${locale}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: OG_ALT_MAP[locale] ?? OG_ALT_MAP[DEFAULT_LOCALE],
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
          alt: TWITTER_ALT_MAP[locale] ?? TWITTER_ALT_MAP[DEFAULT_LOCALE],
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

  const GA_ID = 'G-6GHVVK4BB3'

  return (
    <NextIntlClientProvider messages={messages}>
      <div lang={locale} className="landing-theme min-h-screen">
        {children}
      </div>

      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', '${GA_ID}');
      `}
      </Script>
    </NextIntlClientProvider>
  )
}
