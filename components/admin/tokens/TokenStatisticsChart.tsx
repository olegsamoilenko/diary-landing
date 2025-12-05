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
  inputUsedTokens: number
  outputUsedTokens: number
}
type Props = {
  data: Point[]
  height?: number
}

export default function TokenStatisticsChart({ data, height = 800 }: Props) {
  const chartData = useMemo(
    () =>
      (data ?? []).map((d) => ({
        uuid: d.userUuid,
        input: d.inputUsedTokens ?? 0,
        output: d.outputUsedTokens ?? 0,
        userName: d.userName,
        userEmail: d.userEmail ?? '',
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
          <XAxis dataKey="uuid" tickMargin={8} angle={-90} textAnchor="end" />
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
  const { userName, userEmail, input, output } = payload[0]?.payload ?? {}
  if (active) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${input} / ${output}`}</p>
        <p className="intro">{userName}</p>
        <p className="desc">{userEmail ?? ''}</p>
      </div>
    )
  }

  return null
}
