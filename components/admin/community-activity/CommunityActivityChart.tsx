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
  usersCount: number
}
type Props = {
  data: Point[]
  height?: number
  barName?: string
}

export default function CommunityActivityChart({ data, height = 300 }: Props) {
  const chartData = useMemo(
    () =>
      (data ?? []).map((p) => ({
        x: p.date,
        usersCount: p.usersCount ?? 0,
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

          <Bar dataKey="usersCount" fill="#526D73" name="Total users" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
