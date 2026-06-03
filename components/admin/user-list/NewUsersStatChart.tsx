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
  total: number
  withAction: number
  withoutAction: number
}
type Props = {
  data: Point[]
  height?: number
  barName?: string
}

export default function NewUserStatChart({ data, height = 300 }: Props) {
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
