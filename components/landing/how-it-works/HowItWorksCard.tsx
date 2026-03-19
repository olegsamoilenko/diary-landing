import { clsx } from 'clsx'

type Props = {
  title: string
  description: string
  className?: string
}

export default function HowItWorksCard({
  title,
  description,
  className,
}: Props) {
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center gap-2 rounded-3xl bg-white px-3 py-4 shadow-2xl',
        className,
      )}
    >
      <h3>{title}</h3>
      <p className="text-center">{description}</p>
    </div>
  )
}
