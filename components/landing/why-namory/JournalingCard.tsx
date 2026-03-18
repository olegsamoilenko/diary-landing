import { useTranslations } from 'next-intl'
import clsx from 'clsx'
import Image from 'next/image'

type JournalingCardProps = {
  className?: string
}

export default function JournalingCard({ className }: JournalingCardProps) {
  const t = useTranslations('Sections.WhyNemory.Journaling')
  return (
    <div className={clsx('items-start justify-between md:flex', className)}>
      <div className="flex-1">
        <h3 className="mb-10">{t('title')}</h3>
        <p className="mb-10">{t('description')}</p>
        <div>
          <ul>
            <li>{t('point1')}</li>
            <li>{t('point2')}</li>
            <li>{t('point3')}</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-1 justify-center">
        <Image
          src="/assets/images/screens/screen-04-uk.jpg"
          alt="journaling card"
          width={1080}
          height={1285}
          className="h-auto w-[300px] rounded-2xl"
        />
      </div>
    </div>
  )
}
