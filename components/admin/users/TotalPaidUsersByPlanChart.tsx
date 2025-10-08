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
  Bar,
} from 'recharts'
import dayjs from 'dayjs'

type Point = { day: string | Date; lite: number; base: number; pro: number }
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
        ly: d.lite ?? 0,
        by: d.base ?? 0,
        py: d.pro ?? 0,
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
          <Line dataKey="ly" fill="#FB9902" stroke="#FB9902" name="Lite" />
          <Line dataKey="by" fill="#00AB66" stroke="#00AB66" name="Base" />
          <Line dataKey="py" fill="#526D73" stroke="#526D73" name="Pro" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
