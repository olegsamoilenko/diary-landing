'use client'

import { useMemo } from 'react'
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
} from 'recharts'

type Point = {
  userUuid: string
  userName: string
  userEmail?: string
  input: number
  output: number
  finishReason: string
}
type Props = {
  data: Point[]
  height?: number
}

export default function TokenUsageStatisticsChart({
  data,
  height = 800,
}: Props) {
  const chartData = useMemo(
    () =>
      (data ?? []).map((d, i) => ({
        key: `${d.userUuid}-${i}`,
        // uuid: d.userUuid,
        input: d.input ?? 0,
        output: d.output ?? 0,
        userName: d.userName,
        userEmail: d.userEmail ?? '',
        finishReason: d.finishReason ?? '',
      })),
    [data],
  )

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={chartData}
          margin={{ top: 8, right: 16, left: 0, bottom: 320 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="key" tickMargin={8} angle={-90} textAnchor="end" />
          <YAxis allowDecimals={false} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="input" fill="#aad8e3" name="Input" />
          <Bar dataKey="output" fill="#83a6ae" name="Output" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

type ChartPoint = {
  uuid: string
  input: number
  output: number
  userName: string
  userEmail?: string
  finishReason?: string
}

type CustomTooltipProps = {
  active?: boolean
  label?: string
  payload?: {
    value: number
    dataKey: string
    payload: ChartPoint
  }[]
}

function CustomTooltip({ payload, label, active }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null
  const { userName, userEmail, input, output, finishReason } =
    payload[0]?.payload ?? {}
  if (active) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${input} / ${output}`}</p>
        <p className="intro">{userName}</p>
        <p className="desc">{userEmail ?? ''}</p>
        <p className="desc">{finishReason ?? ''}</p>
      </div>
    )
  }

  return null
}
