import LegalDocument from '@/components/static/LegalDocument'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ locale: string }>
}

const SITE_URL = 'https://nemoryai.com'

const OG_LOCALE_MAP: Record<string, string> = {
  en: 'en_US',
  uk: 'uk_UA',
  de: 'de_DE',
  pl: 'pl_PL',
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({
    locale,
    namespace: 'PrivacyPage.Metadata',
  })

  const localeTag = OG_LOCALE_MAP[locale] ?? OG_LOCALE_MAP.en

  const alternateLocaleTags = Object.entries(OG_LOCALE_MAP)
    .filter(([key]) => key !== locale)
    .map(([, value]) => value)

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${SITE_URL}/${locale}/privacy`,
      languages: {
        en: `${SITE_URL}/en/privacy`,
        uk: `${SITE_URL}/uk/privacy`,
        de: `${SITE_URL}/de/privacy`,
        pl: `${SITE_URL}/pl/privacy`,
        'x-default': `${SITE_URL}/en/privacy`,
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${SITE_URL}/${locale}/privacy`,
      type: 'article',
      locale: localeTag,
      alternateLocale: alternateLocaleTags,
    },
    twitter: {
      card: 'summary',
      title: t('title'),
      description: t('description'),
    },
  }
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params
  return <LegalDocument locale={locale} kind="PrivacyPage" />
}
