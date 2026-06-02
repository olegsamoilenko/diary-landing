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
} from 'recharts'
import dayjs from 'dayjs'

type Point = {
  date: string
  newUserActivity: number
  oldUserActivity: number
  totalUserActivity: number
}
type Props = {
  data: Point[]
  height?: number
  barName?: string
}

export default function TotalUserActivityBarChart({
  data,
  height = 300,
}: Props) {
  const chartData = useMemo(
    () =>
      (data ?? []).map((p) => ({
        x: p.date,
        totalUserActivity: p.totalUserActivity ?? 0,
        newUserActivity: p.newUserActivity ?? 0,
        oldUserActivity: p.oldUserActivity ?? 0,
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
          <XAxis dataKey="x" tickMargin={8} />

          <YAxis allowDecimals={false} />

          <Tooltip />

          <Legend />

          <Bar
            dataKey="totalUserActivity"
            fill="#526D73"
            name="Total active users"
          />

          <Bar
            dataKey="newUserActivity"
            fill="#6FA77A"
            name="New active users"
          />

          <Bar
            dataKey="oldUserActivity"
            fill="#C99A5B"
            name="Returning active users"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
