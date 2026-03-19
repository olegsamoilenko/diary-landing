import { clsx } from 'clsx'

type SafeSpaceCardProps = {
  icon: React.ReactNode
  text: string
  className?: string
}

export default function SafeSpaceCard({
  icon,
  text,
  className,
}: SafeSpaceCardProps) {
  return (
    <div className={clsx('flex gap-4 px-3 py-4', className)}>
      <div>{icon}</div>
      <p>{text}</p>
    </div>
  )
}
