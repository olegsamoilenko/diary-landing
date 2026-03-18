import { useTranslations } from 'next-intl'
import { clsx } from 'clsx'

type AiReflectionCardProps = {
  className?: string
}
export default function AiReflectionCard({ className }: AiReflectionCardProps) {
  const t = useTranslations('Sections.WhyNemory.AiReflection')
  return (
    <div className={clsx('items-center justify-between md:flex', className)}>
      <div>
        <h3>{t('title')}</h3>
        <p>{t('description')}</p>
        <div>
          <ul>
            <li>{t('point1')}</li>
            <li>{t('point2')}</li>
            <li>{t('point3')}</li>
          </ul>
        </div>
      </div>
      <div>Image</div>
    </div>
  )
}
