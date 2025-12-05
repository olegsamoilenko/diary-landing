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
import { Font } from '@/types'

type Point = { font: Font; count: number }
type Props = {
  data: Point[]
  height?: number
  barName?: string
}

export default function FontStatisticsChart({
  data,
  height = 300,
  barName = 'New users',
}: Props) {
  const chartData = useMemo(
    () =>
      (data ?? []).map((p) => ({
        x: p.font,
        y: p.count ?? 0,
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
          <Bar dataKey="y" fill="#526D73" name={barName} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
