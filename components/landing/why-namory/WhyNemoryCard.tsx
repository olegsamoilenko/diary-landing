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
      <div className="relative flex flex-1 justify-center">
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-[260px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-[36px] bg-[radial-gradient(circle,rgba(93,190,211,0.12)_0%,rgba(203,187,166,0.07)_42%,transparent_70%)] blur-xl" />

        <Image
          src={src}
          alt="Nemory app preview"
          width={1080}
          height={1285}
          className={clsx(
            'relative z-10 h-auto w-[300px] rounded-2xl',
            'drop-shadow-[0_28px_40px_rgba(34,38,51,0.22)]',
            'contrast-[1.04] saturate-[1.04]',
            reverse
              ? 'md:[transform:perspective(1000px)_rotateY(18deg)_rotateX(10deg)]'
              : 'md:[transform:perspective(1000px)_rotateY(-18deg)_rotateX(10deg)]',
          )}
        />
      </div>
    </div>
  )
}
