export default function StatisticBlock({
  name,
  value,
  description,
  variant = 'classic',
  formattedValue,
}: {
  name: string
  value: number | undefined
  description?: string
  variant?: 'classic' | 'v2'
  formattedValue?: import('react').ReactNode
}) {
  if (variant === 'v2')
    return (
      <div className="bg-card flex min-w-0 flex-col rounded-2xl border p-5 sm:p-6">
        <p className="text-muted-foreground text-sm">{name}</p>
        <p className="my-3 text-3xl font-semibold tracking-tight tabular-nums">
          {formattedValue ?? value?.toLocaleString('uk-UA') ?? '—'}
        </p>
        {description && (
          <p className="text-muted-foreground mt-auto text-xs leading-relaxed">
            {description}
          </p>
        )}
      </div>
    )
  return (
    <div className="flex flex-col items-end justify-end">
      <div>{name}</div>
      <div>{value ?? 0}</div>
    </div>
  )
}
