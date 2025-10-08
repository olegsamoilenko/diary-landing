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

type Point = { date: string | Date; lite: number; base: number; pro: number }
type Props = {
  data: Point[]
  height?: number
  barName?: string
}

export default function NewPaidUsersBarChart({
  data,
  height = 300,
  barName = 'New Paid users',
}: Props) {
  const chartData = useMemo(
    () =>
      (data ?? []).map((d) => ({
        x: d.date,
        ly: d.lite ?? 0,
        by: d.base ?? 0,
        py: d.pro ?? 0,
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
          <Tooltip
            formatter={(value: any) => [value, barName]}
            // labelFormatter={(label) => dayjs(label).format('YYYY-MM-DD')}
          />
          <Bar dataKey="ly" fill="#aad8e3" name={barName} />
          <Bar dataKey="by" fill="#83a6ae" name={barName} />
          <Bar dataKey="py" fill="#526D73" name={barName} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
