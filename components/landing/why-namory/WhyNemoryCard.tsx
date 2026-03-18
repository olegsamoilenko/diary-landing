import { useTranslations } from 'next-intl'
import clsx from 'clsx'
import Image from 'next/image'
import CheckMarkIcon from '@/components/landing/ui/CheckMarkIcon'

type WhyNemoryCardProps = {
  title: string
  description: string
  point1: string
  point2: string
  point3: string
  src: string
  reverse?: boolean
  className?: string
}

export default function WhyNemoryCard({
  title,
  description,
  point1,
  point2,
  point3,
  src,
  reverse,
  className,
}: WhyNemoryCardProps) {
  const t = useTranslations('Sections.WhyNemory.Journaling')
  return (
    <div className={clsx('items-center justify-between md:flex', className)}>
      <div
        className={clsx(
          'mb-6 flex h-full flex-1 flex-col justify-center',
          reverse && 'md:order-last',
        )}
      >
        <h3 className="mb-6">{title}</h3>
        <p className="mb-6">{description}</p>
        <div>
          <ul>
            <li className="flex gap-4">
              <span>
                <CheckMarkIcon className="text-landing-primary" />
              </span>
              <span>{point1}</span>
            </li>
            <li className="flex gap-4">
              <span>
                <CheckMarkIcon className="text-landing-primary" />
              </span>
              <span>{point2}</span>
            </li>
            <li className="flex gap-4">
              <span>
                <CheckMarkIcon className="text-landing-primary" />
              </span>
              <span>{point3}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-1 justify-center">
        <Image
          src={src}
          alt="journaling card"
          width={1080}
          height={1285}
          className={clsx(
            'h-auto w-[300px] rounded-2xl',
            reverse
              ? 'md:[transform:perspective(1000px)_rotateY(24deg)_rotateX(14deg)]'
              : 'md:[transform:perspective(1000px)_rotateY(-24deg)_rotateX(14deg)]',
          )}
        />
      </div>
    </div>
  )
}
