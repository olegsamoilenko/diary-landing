'use client'

import React, { RefObject, use, useEffect, useState } from 'react'
import { DatePicker } from '@/components/ui/DatePicker'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { logsLevelOptions } from '@/lib/constants/logs'
import { Log, LogsLevel } from '@/types'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { getLogs } from '@/lib/api/logs'
import AllLogsTable from '@/components/admin/logs/AllLogsTable'
import Pagination from '@/components/ui/pagination'

type SP = { page?: string; userUuid?: string }

const getDefaultStartDate = () => {
  const d = new Date()
  d.setDate(d.getDate() - 7)
  d.setHours(0, 0, 0, 0)
  return d
}

const getDefaultEndDate = () => {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  d.setHours(0, 0, 0, 0)
  return d
}
export default function UserLogs({
  userUuid,
  scrollContainerRef,
}: {
  userUuid: string
  scrollContainerRef?: RefObject<HTMLDivElement | null>
}) {
  const [startDate, setStartDate] = useState<Date | undefined>(
    getDefaultStartDate,
  )
  const [endDate, setEndDate] = useState<Date | undefined>(getDefaultEndDate)
  const [logsLevel, setLogsLevel] = useState<LogsLevel>(LogsLevel.ALL)
  const [errorLogsLevel, setErrorLogsLevel] = useState<string | null>(null)
  const [userId, setUserId] = useState<number | undefined>(undefined)
  const [page, setPage] = useState<number>(1)
  const limit = 50
  const [logs, setLogs] = useState<{
    logs: Log[]
    page: number
    pageCount: number
  }>({
    logs: [],
    page: 0,
    pageCount: 0,
  })

  const loadLogs = async (pageNumber: number) => {
    if (!startDate || !endDate) return

    const logsRes = await getLogs(
      startDate,
      endDate,
      logsLevel,
      userId,
      userUuid,
      pageNumber,
      limit,
    )
    setLogs(logsRes)
  }

  useEffect(() => {
    loadLogs(page)
  }, [page, startDate, endDate, logsLevel, userId, userUuid])

  const scrollToTop = () => {
    scrollContainerRef?.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold">Logs</h1>
      <div className="my-4 flex items-end gap-4">
        <DatePicker
          label={'Start date'}
          placeholder={'Start date'}
          date={startDate}
          setDate={setStartDate}
        />
        <DatePicker
          label={'End date'}
          placeholder={'End date'}
          date={endDate}
          setDate={setEndDate}
        />
        <div className="items-end">
          <div className="mb-2">Level</div>
          <Select
            value={logsLevel}
            onValueChange={(l) => {
              setLogsLevel(l as LogsLevel)
              setErrorLogsLevel(null)
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              {logsLevelOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errorLogsLevel && (
            <p className="mt-1 text-sm text-red-600">{errorLogsLevel}</p>
          )}
        </div>
        <Button onClick={() => loadLogs(1)}>Load</Button>
      </div>
      <div>
        <AllLogsTable logs={logs.logs} />
        <Pagination
          page={logs?.page ?? 0}
          pageCount={logs?.pageCount ?? 0}
          onPress={(p) => {
            scrollToTop()
            setPage(p)
          }}
          isComponent={true}
        />
      </div>
    </div>
  )
}
