// Shared by both documents. Keep the supplied Latin spelling across Latin locales.
export function getLegalContact(locale: string) {
  return {
    name: locale === 'uk' ? 'Олег Самойленко' : 'Oleg Samoilenko',
    email: 'olegsamoilenko78@gmail.com',
    phone: '+380688357227',
  } as const
}

export const legalUpdatedAt = '2026-11-05'
