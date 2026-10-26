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
  Legend,
  ComposedChart,
  Line,
} from 'recharts'
import dayjs from 'dayjs'

type Point = {
  date: string
  total: number
  withAction: number
  withoutAction: number
}
type Props = {
  data: Point[]
  height?: number
  barName?: string
  variant?: 'classic' | 'v2'
}

export default function NewUserStatChart({
  data,
  height = 300,
  variant = 'classic',
}: Props) {
  const chartData = useMemo(
    () =>
      (data ?? []).map((p) => ({
        x: p.date,
        total: p.total ?? 0,
        withAction: p.withAction ?? 0,
        withoutAction: p.withoutAction ?? 0,
      })),
    [data],
  )

  if (variant === 'v2')
    return (
      <div
        className="w-full min-w-0"
        role="img"
        aria-label="Нові користувачі за днями: всі, з дією та без дії"
      >
        <ResponsiveContainer width="100%" height={height}>
          <ComposedChart
            data={chartData}
            margin={{ top: 12, right: 16, left: -16, bottom: 8 }}
            accessibilityLayer
          >
            <CartesianGrid
              vertical={false}
              stroke="var(--border)"
              strokeDasharray="3 4"
            />
            <XAxis
              dataKey="x"
              tickFormatter={(date: string) =>
                `${date.slice(8)}.${date.slice(5, 7)}`
              }
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              fontSize={12}
              minTickGap={24}
              stroke="var(--muted-foreground)"
            />
            <YAxis
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
              fontSize={12}
              stroke="var(--muted-foreground)"
            />
            <Tooltip
              cursor={{ fill: 'var(--muted)', opacity: 0.5 }}
              contentStyle={{
                borderRadius: 12,
                border: '1px solid var(--border)',
                background: 'var(--card)',
                color: 'var(--foreground)',
              }}
            />
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ paddingTop: 20, fontSize: 12 }}
            />
            <Bar
              dataKey="withAction"
              stackId="users"
              fill="var(--admin-chart-action)"
              name="З дією"
              maxBarSize={40}
            />
            <Bar
              dataKey="withoutAction"
              stackId="users"
              fill="var(--admin-chart-inactive)"
              name="Без дії"
              maxBarSize={40}
              radius={[5, 5, 0, 0]}
            />
            <Line
              dataKey="total"
              stroke="var(--admin-brand)"
              name="Всі"
              strokeWidth={2}
              dot={{ r: 3, strokeWidth: 2, fill: 'var(--card)' }}
              activeDot={{ r: 5 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    )

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={chartData}
          margin={{ top: 8, right: 16, left: 0, bottom: 8 }}
        >
          <XAxis dataKey="x" tickMargin={8} />

          <YAxis allowDecimals={false} />

          <Tooltip />

          <Legend />

          <Bar dataKey="total" fill="#526D73" name="Total users" />

          <Bar dataKey="withAction" fill="#6FA77A" name="With Action" />

          <Bar dataKey="withoutAction" fill="#C99A5B" name="Without Action" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
