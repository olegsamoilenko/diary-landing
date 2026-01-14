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
  Cell,
} from 'recharts'
import dayjs from 'dayjs'

type Point = { day: string; revenue: number; expenses: number }
type Props = {
  data: Point[]
  height?: number
  barName?: string
}

export default function BalanceChart({
  data,
  height = 300,
  barName = 'Balance Stats',
}: Props) {
  const chartData = useMemo(
    () =>
      (data ?? []).map((d) => ({
        x: d.day,
        ey: Math.round(d.revenue - d.expenses),
      })),
    [data],
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
          <Bar dataKey="ey" name="Balance">
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.ey >= 0 ? '#16a34a' : '#dc2626'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
