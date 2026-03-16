import { headers, cookies } from 'next/headers'
import { redirect } from 'next/navigation'

function detectLocale(
  acceptLanguage: string | null,
  countryCode: string | null,
  cookieLocale: string | null,
): 'uk' | 'en' {
  if (cookieLocale === 'uk' || cookieLocale === 'en') {
    return cookieLocale
  }

  if (countryCode?.toUpperCase() === 'UA') {
    return 'uk'
  }

  const lang = (acceptLanguage || '').toLowerCase()

  if (lang.includes('uk') || lang.includes('ru')) {
    return 'uk'
  }

  return 'en'
}

export default async function RootPage() {
  const h = await headers()
  const c = await cookies()

  const acceptLanguage = h.get('accept-language')
  const countryCode = h.get('x-country-code')
  const cookieLocale = c.get('NEXT_LOCALE')?.value ?? null

  const locale = detectLocale(acceptLanguage, countryCode, cookieLocale)

  redirect(`/${locale}`)
}
