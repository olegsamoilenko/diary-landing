import clsx from 'clsx'
import { useTranslations } from 'next-intl'

type TitleProps = {
  className?: string
}
export default function TitleUk({ className }: TitleProps) {
  const t = useTranslations('Sections.Hero.TitleEn')
  return (
    <h1 className={clsx(className, 'text-left')}>
      <span className="text-landing-primary mb-2 block text-nowrap">
        Розумний щоденник
      </span>
      <span className="mb-2 block">для думок, цілей</span>
      <span className="block text-nowrap">
        і зростання{' '}
        <span className="text-landing-primary font-semibold">з AI</span>
      </span>
    </h1>
  )
}
