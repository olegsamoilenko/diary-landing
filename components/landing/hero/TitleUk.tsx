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
        Думайте ясніше.
      </span>
      <span className="l mb-2 block leading-9 md:leading-12 lg:leading-14 xl:leading-16">
        Розумійте себе глибше з{' '}
        <span className="text-landing-primary">AI.</span>
      </span>
      {/*<span className="block text-nowrap">*/}
      {/*  і зростання{' '}*/}
      {/*  <span className="text-landing-primary font-semibold">з AI</span>*/}
      {/*</span>*/}
    </h1>
  )
}
