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

type Point = { date: string | Date; checkins: number; checkinDialogs: number }
type Props = {
  data: Point[]
  height?: number
  barName?: string
}

export default function NewCheckinsAndDialogsChart({
  data,
  height = 300,
  barName = 'New Checkins and Dialogs',
}: Props) {
  const chartData = useMemo(
    () =>
      (data ?? []).map((d) => ({
        x: d.date,
        ey: d.checkins ?? 0,
        dy: d.checkinDialogs ?? 0,
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
          <Bar dataKey="ey" fill="#aad8e3" name="checkins" />
          <Bar dataKey="dy" fill="#83a6ae" name="checkinDialogs" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
