import clsx from 'clsx'
import { useTranslations } from 'next-intl'

type TitleProps = {
  className?: string
}
export default function TitleEn({ className }: TitleProps) {
  const t = useTranslations('Sections.Hero.TitleEn')
  return (
    <h1 className={clsx(className, 'text-left')}>
      <span className="text-landing-primary mb-2 block">Smart journal</span>
      <span className="mb-2 block">for thoughts,</span>
      <span className="block text-nowrap">
        goals & growth{' '}
        <span className="text-landing-primary font-semibold">with AI</span>
      </span>
    </h1>
  )
}
