import { clsx } from 'clsx'

type CoreFeaturesCardProps = {
  number: string
  title: string
  description: string
  className?: string
}

export default function CoreFeaturesCard({
  number,
  title,
  description,
  className,
}: CoreFeaturesCardProps) {
  return (
    <div
      className={clsx(
        'flex flex-1 flex-col items-center justify-start gap-5 px-3 py-4',
        className,
      )}
    >
      <div className="bg-landing-secondary text-landing-primary h-10 w-10 rounded-full p-2 text-center">
        {number}
      </div>
      <h3 className="text-center">{title}</h3>
      <p className="text-center">{description}</p>
    </div>
  )
}
