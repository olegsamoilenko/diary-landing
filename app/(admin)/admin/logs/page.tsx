'use client'

import React, { use, useEffect, useState } from 'react'
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

type SP = { page?: string }
export default function LogsPage({
  searchParams,
}: {
  searchParams?: Promise<SP>
}) {
  const spPromise: Promise<SP> = searchParams ?? Promise.resolve({})
  const sp = use(spPromise)
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [logsLevel, setLogsLevel] = useState<LogsLevel>(LogsLevel.ALL)
  const [errorLogsLevel, setErrorLogsLevel] = useState<string | null>(null)
  const [userId, setUserId] = useState<number | undefined>(undefined)
  const [userUuid, setUserUuid] = useState<string | undefined>(undefined)
  const page = Number(sp.page ?? '1') || 1
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

  const loadLogs = async () => {
    if (!startDate || !endDate) return

    const logsRes = await getLogs(
      startDate,
      endDate,
      logsLevel,
      userId,
      userUuid,
      page,
      limit,
    )
    setLogs(logsRes)
  }

  useEffect(() => {
    loadLogs()
  }, [page])

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
        <div>
          <Label htmlFor="userId" className="mb-2">
            User Id
          </Label>
          <Input
            id="userId"
            type="number"
            value={userId}
            onChange={(e) => setUserId(Number(e.target.value))}
            placeholder="User Id"
          ></Input>
        </div>
        <div>
          <Label htmlFor="userUuid" className="mb-2">
            User Uuid
          </Label>
          <Input
            id="userUuid"
            type="text"
            value={userUuid}
            onChange={(e) => setUserUuid(e.target.value)}
            placeholder="User Uuid"
          ></Input>
        </div>
        <Button onClick={loadLogs}>Load</Button>
      </div>
      <div>
        <AllLogsTable logs={logs.logs} />
        <Pagination page={logs?.page ?? 0} pageCount={logs?.pageCount ?? 0} />
      </div>
    </div>
  )
}
