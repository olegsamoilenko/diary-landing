export default function StatisticBlock({
  name,
  value = 0,
}: {
  name: string
  value: number | undefined
}) {
  return (
    <div className="flex flex-col items-end justify-end">
      <div>{name}</div>
      <div>{value}</div>
    </div>
  )
}
