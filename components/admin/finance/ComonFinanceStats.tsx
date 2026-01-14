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
import dayjs from 'dayjs'

type Point = { day: string; revenue: number; expenses: number }
type Props = {
  data: Point[]
  height?: number
  barName?: string
}

export default function CommonFinanceStat({
  data,
  height = 300,
  barName = 'Finance Stats',
}: Props) {
  const chartData = useMemo(
    () =>
      (data ?? []).map((d) => ({
        x: d.day,
        ey: d.revenue ?? 0,
        dy: d.expenses ?? 0,
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
          <Bar dataKey="ey" fill="#83a6ae" name="Revenue" />
          <Bar dataKey="dy" fill="#aad8e3" name="Expenses" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
