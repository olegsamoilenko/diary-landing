'use client'

import { useId, type ReactNode } from 'react'
import { DatePicker } from '@/components/ui/DatePicker'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { GrowthGranularity } from '@/types/adminGrowth'

export const adminPeriodGroups: { value: GrowthGranularity; label: string }[] =
  [
    { value: 'day', label: 'День' },
    { value: 'week', label: 'Тиждень' },
    { value: 'month', label: 'Місяць' },
    { value: 'quarter', label: 'Квартал' },
    { value: 'year', label: 'Рік' },
  ]

export default function AdminPeriodFilter({
  from,
  to,
  onFromChange,
  onToChange,
  granularity,
  onGranularityChange,
  onApply,
  loading,
  error,
  children,
}: {
  from: Date | undefined
  to: Date | undefined
  onFromChange: (date: Date | undefined) => void
  onToChange: (date: Date | undefined) => void
  granularity: GrowthGranularity
  onGranularityChange: (group: GrowthGranularity) => void
  onApply: () => void
  loading: boolean
  error?: string
  children?: ReactNode
}) {
  const id = useId()
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onApply()
      }}
      className="bg-card flex flex-wrap items-end gap-4 rounded-2xl border p-5"
    >
      <DatePicker
        label="Від"
        placeholder="Початок періоду"
        date={from}
        setDateAction={onFromChange}
      />
      <DatePicker
        label="До"
        placeholder="Кінець періоду"
        date={to}
        setDateAction={onToChange}
      />
      <div className="flex flex-col gap-3">
        <Label htmlFor={id} className="px-1">
          Групування
        </Label>
        <Select
          value={granularity}
          onValueChange={(v) => onGranularityChange(v as GrowthGranularity)}
        >
          <SelectTrigger id={id} className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {adminPeriodGroups.map((g) => (
              <SelectItem key={g.value} value={g.value}>
                {g.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? 'Завантаження…' : 'Показати'}
      </Button>
      {children}
      <p className="text-muted-foreground pb-2 text-xs sm:ml-auto">
        Календарні періоди · Київ
      </p>
      {error && (
        <p role="alert" className="text-destructive w-full text-sm">
          {error}
        </p>
      )}
    </form>
  )
}
