import clsx from 'clsx'
import { useTranslations } from 'next-intl'

type TitleProps = {
  className?: string
}
export default function TitleDe({ className }: TitleProps) {
  const t = useTranslations('Sections.Hero.TitleDe')
  return (
    <h1 className={clsx(className, 'text-left')}>
      <span className="text-landing-primary mb-2 block">Klarer denken.</span>

      <span className="mb-2 block whitespace-nowrap">Sich selbst besser</span>

      <span className="mb-2 block whitespace-nowrap">
        verstehen mit <span className="text-landing-primary">KI.</span>
      </span>
    </h1>
  )
}
