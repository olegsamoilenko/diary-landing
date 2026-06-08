import clsx from 'clsx'
import { useTranslations } from 'next-intl'

type TitleProps = {
  className?: string
}
export default function TitlePl({ className }: TitleProps) {
  const t = useTranslations('Sections.Hero.TitleEn')
  return (
    <h1 className={clsx(className, 'text-left')}>
      <span className="text-landing-primary mb-2 block">Myśl jaśniej.</span>

      <span className="mb-2 block whitespace-nowrap">Lepiej zrozum siebie</span>

      <span className="mb-2 block whitespace-nowrap">
        dzięki <span className="text-landing-primary">AI.</span>
      </span>
    </h1>
  )
}
