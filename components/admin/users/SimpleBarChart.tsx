'use client'

import { useMemo } from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import { useId } from 'react'

type Point = {
  date: string | Date
  count: number
  label?: string
  values?: Record<string, number>
}
type Series = { key: string; name: string; color: string }
type Props = {
  data: Point[]
  height?: number
  barName?: string
  variant?: 'v1' | 'v2'
  color?: string
  formatTick?: (value: string) => string
  series?: Series[]
  formatValue?: (value: number) => string
  allowDecimals?: boolean
}

export default function SimpleBarChart({
  data,
  height = 300,
  barName = 'New users',
  variant = 'v1',
  color = 'var(--admin-brand)',
  formatTick,
  series,
  formatValue = (value) => value.toLocaleString('uk-UA'),
  allowDecimals = false,
}: Props) {
  const gradientId = useId().replace(/:/g, '')
  const chartData = useMemo(
    () =>
      (data ?? []).map((p) => ({
        x: p.date,
        y: p.count ?? 0,
        label: p.label,
        ...p.values,
      })),
    [data],
  )
  const chartSeries = series ?? [{ key: 'y', name: barName, color }]

  if (variant === 'v2')
    return (
      <div
        className="w-full min-w-0"
        role={series ? 'group' : 'img'}
        aria-label={`${barName}: ${formatValue(data.reduce((sum, point) => sum + point.count, 0))} за вибраний період`}
      >
        <ResponsiveContainer width="100%" height={height}>
          <BarChart
            data={chartData}
            margin={{ top: 16, right: 12, left: -18, bottom: 0 }}
            accessibilityLayer
            barCategoryGap="28%"
          >
            <defs>
              {chartSeries.map((item, index) => (
                <linearGradient
                  key={item.key}
                  id={`${gradientId}-${index}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={item.color} stopOpacity={0.95} />
                  <stop
                    offset="100%"
                    stopColor={item.color}
                    stopOpacity={0.7}
                  />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid
              vertical={false}
              stroke="var(--border)"
              strokeDasharray="3 5"
            />
            <XAxis
              dataKey="x"
              tickFormatter={formatTick}
              tickMargin={12}
              tickLine={false}
              axisLine={false}
              fontSize={11}
              minTickGap={28}
              stroke="var(--muted-foreground)"
            />
            <YAxis
              allowDecimals={allowDecimals}
              tickFormatter={formatValue}
              tickLine={false}
              axisLine={false}
              fontSize={11}
              stroke="var(--muted-foreground)"
              width={allowDecimals ? 86 : 54}
              domain={[0, (maximum: number) => Math.max(1, maximum)]}
            />
            <Tooltip
              cursor={{ fill: color, fillOpacity: 0.06 }}
              content={({ active, payload }) => {
                const point = payload?.[0]?.payload as
                  | ({ x: string; y: number; label?: string } & Record<
                      string,
                      unknown
                    >)
                  | undefined
                return active && point ? (
                  <div className="bg-popover text-popover-foreground min-w-44 rounded-xl border px-4 py-3 shadow-lg">
                    <p className="text-muted-foreground text-xs">
                      {point.label ?? point.x}
                    </p>
                    {chartSeries.map((item) => (
                      <div
                        key={item.key}
                        className="mt-2 flex items-center gap-3 text-sm"
                      >
                        <span
                          className="size-2 rounded-full"
                          style={{ background: item.color }}
                        />
                        <span>{item.name}</span>
                        <strong className="ml-auto tabular-nums">
                          {formatValue(Number(point[item.key] ?? 0))}
                        </strong>
                      </div>
                    ))}
                    {series && (
                      <div className="mt-3 flex justify-between gap-4 border-t pt-2 text-sm font-semibold">
                        <span>Усього</span>
                        <span className="tabular-nums">
                          {formatValue(point.y)}
                        </span>
                      </div>
                    )}
                  </div>
                ) : null
              }}
            />
            {chartSeries.map((item, index) => (
              <Bar
                key={item.key}
                dataKey={item.key}
                name={item.name}
                stackId={series ? 'plans' : undefined}
                fill={`url(#${gradientId}-${index})`}
                radius={series ? [2, 2, 0, 0] : [5, 5, 0, 0]}
                maxBarSize={52}
                isAnimationActive={false}
                activeBar={{ fill: item.color }}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
        {series && (
          <ul
            className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs"
            aria-label="Плани та підсумки за період"
          >
            {series.map((item) => (
              <li key={item.key} className="flex items-center gap-2">
                <span
                  className="size-2 shrink-0 rounded-full"
                  style={{ background: item.color }}
                />
                <span className="text-muted-foreground">{item.name}</span>
                <strong className="tabular-nums">
                  {formatValue(
                    data.reduce(
                      (sum, point) => sum + (point.values?.[item.key] ?? 0),
                      0,
                    ),
                  )}
                </strong>
              </li>
            ))}
          </ul>
        )}
      </div>
    )

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={chartData}
          margin={{ top: 8, right: 16, left: 0, bottom: 8 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" tickMargin={8} />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="y" fill="#526D73" name={barName} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
