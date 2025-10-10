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

type Point = { date: string | Date; entries: number; dialogs: number }
type Props = {
  data: Point[]
  height?: number
  barName?: string
}

export default function NewPaidUsersBarChart({
  data,
  height = 300,
  barName = 'New Entries and Dialogs',
}: Props) {
  const chartData = useMemo(
    () =>
      (data ?? []).map((d) => ({
        x: d.date,
        ey: d.entries ?? 0,
        dy: d.dialogs ?? 0,
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
          <Bar dataKey="ey" fill="#aad8e3" name="Entries" />
          <Bar dataKey="dy" fill="#83a6ae" name="Dialogs" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
