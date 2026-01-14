'use client'

import React, { useEffect, useState } from 'react'
import { getCommonFinanceStats } from '@/lib/api/financeStatistics'
import TotalStatChart from '@/components/admin/users/TotalStatChart'
import EntriesByUserTable from '@/components/admin/entries/EntriesByUserTable'
import { DatePicker } from '@/components/ui/DatePicker'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FinancePeriod, Granularity } from '@/types'
import { granularityOptions } from '@/lib/constants/granularity'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import CommonFinanceStats from '@/components/admin/finance/ComonFinanceStats'
import BalanceChart from '@/components/admin/finance/BalanceChart'

export default function FinancePage() {
  const [commonFinanceStats, setCommonFinanceStats] = useState<
    { day: string; revenue: number; expenses: number }[]
  >([])
  const [period, setPeriod] = useState<FinancePeriod>(FinancePeriod.DAY)
  const [periodCounts, setPeriodCounts] = useState<number>(0)
  const [errorGranularity, setErrorGranularity] = useState<string | null>(null)

  const fetchCommonFinanceStats = async () => {
    try {
      const data = await getCommonFinanceStats(period, periodCounts)
      setCommonFinanceStats(data)
    } catch (error) {
      console.error('Error fetching total diary:', error)
    }
  }

  return (
    <>
      <h1 className="mb-4 text-2xl font-semibold">Finance Statistics</h1>
      <div className="my-4 flex items-end gap-4">
        <div className="items-end">
          <Select
            value={period}
            onValueChange={(p) => {
              setPeriod(p as FinancePeriod)
              setErrorGranularity(null)
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              {granularityOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errorGranularity && (
            <p className="mt-1 text-sm text-red-600">{errorGranularity}</p>
          )}
        </div>
        <div>
          <Label htmlFor="userId" className="mb-2">
            Period Count
          </Label>
          <Input
            id="periodCount"
            type="number"
            value={periodCounts}
            onChange={(e) => setPeriodCounts(Number(e.target.value))}
            placeholder="User Id"
          ></Input>
        </div>
        <Button onClick={fetchCommonFinanceStats}>Show</Button>
      </div>

      <div className="mb-8">
        <h3 className="mb-4 text-xl font-semibold">Common Finance Stats</h3>
        <CommonFinanceStats data={commonFinanceStats} />
      </div>

      <div>
        <h3 className="mb-4 text-xl font-semibold">Balance chart</h3>
        <BalanceChart data={commonFinanceStats} />
      </div>
    </>
  )
}
