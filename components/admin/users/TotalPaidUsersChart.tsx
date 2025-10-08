'use client'

import { useMemo } from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import dayjs from 'dayjs'

type Point = { day: string | Date; count: number }
type Props = {
  data: Point[]
  height?: number
  barName?: string
}

export default function NewPaidUsersBarChart({
  data,
  height = 300,
  barName = 'Total Paid users',
}: Props) {
  const chartData = useMemo(
    () =>
      (data ?? []).map((d) => ({
        x: d.day,
        y: d.count ?? 0,
      })),
    [data],
  )

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          data={chartData}
          margin={{ top: 8, right: 16, left: 0, bottom: 8 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" tickMargin={8} />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Line dataKey="y" fill="#aad8e3" name={barName} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
