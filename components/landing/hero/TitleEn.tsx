import clsx from 'clsx'
import { useTranslations } from 'next-intl'

type TitleProps = {
  className?: string
}
export default function TitleEn({ className }: TitleProps) {
  const t = useTranslations('Sections.Hero.TitleEn')
  return (
    <h1 className={clsx(className, 'text-left')}>
      <span className="text-landing-primary mb-2 block">
        Think more clearly.
      </span>

      <span className="mb-2 block whitespace-nowrap">
        Understand yourself deeply.
      </span>
      {/*<span className="block text-nowrap">*/}
      {/*  <span>with</span>{' '}*/}
      {/*  <span className="text-landing-primary font-semibold">AI</span>*/}
      {/*</span>*/}
    </h1>
  )
}
