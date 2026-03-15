import clsx from 'clsx'
import { useTranslations } from 'next-intl'

type TitleProps = {
  className?: string
}
export default function Title({ className }: TitleProps) {
  const t = useTranslations('Sections.Hero.Title')
  return (
    <h1 className={clsx(className, 'text-left')}>
      <span className="mb-2 block">{t('yourPersonal')}</span>
      <span className="mb-2 block font-semibold text-nowrap">
        {t('journal')} <span className="font-normal">{t('&')}</span>{' '}
        {t('growth')}
      </span>
      <span className="block">
        {t('companion')} {t('with')}{' '}
        <span className="font-semibold">{t('ai')}</span>
      </span>
    </h1>
  )
}
