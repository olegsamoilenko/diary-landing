'use client'

import { RefObject, useEffect, useState } from 'react'
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
import { getErrorMessage } from '@/lib/errors'
import AllLogsTable from '@/components/admin/logs/AllLogsTable'
import Pagination from '@/components/ui/pagination'

function defaultStart() {
  const date = new Date()
  date.setDate(date.getDate() - 7)
  date.setHours(0, 0, 0, 0)
  return date
}
function defaultEnd() {
  const date = new Date()
  date.setDate(date.getDate() + 1)
  date.setHours(0, 0, 0, 0)
  return date
}

export default function UserLogs({
  userUuid,
  scrollContainerRef,
  initialStartDate,
}: {
  userUuid: string
  scrollContainerRef?: RefObject<HTMLDivElement | null>
  initialStartDate?: Date
}) {
  const [startDate, setStartDate] = useState<Date | undefined>(
    () => initialStartDate ?? defaultStart(),
  )
  const [endDate, setEndDate] = useState<Date | undefined>(defaultEnd)
  const [level, setLevel] = useState<LogsLevel>(LogsLevel.ALL)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState(() => ({
    startDate,
    endDate,
    level,
    search,
  }))
  const [attempt, setAttempt] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [logs, setLogs] = useState<{
    logs: Log[]
    page: number
    pageCount: number
  } | null>(null)

  useEffect(() => {
    let current = true
    setLoading(true)
    setError('')
    setLogs(null)
    if (!filters.startDate || !filters.endDate) {
      setLoading(false)
      return
    }
    getLogs(
      filters.startDate,
      filters.endDate,
      filters.level,
      undefined,
      userUuid,
      filters.search,
      page,
      50,
    )
      .then((result) => {
        if (!current) return
        if (!result || !Array.isArray(result.logs))
          throw new Error('Не вдалося завантажити логи.')
        setLogs(result)
      })
      .catch((err) => {
        if (current) setError(getErrorMessage(err))
      })
      .finally(() => {
        if (current) setLoading(false)
      })
    return () => {
      current = false
    }
  }, [userUuid, page, filters, attempt])

  return (
    <div className="min-w-0">
      <h3 className="mb-4 text-lg font-semibold">Логи користувача</h3>
      <form
        className="mb-5 flex flex-wrap items-end gap-3"
        onSubmit={(event) => {
          event.preventDefault()
          if (!startDate || !endDate || startDate > endDate) {
            setError('Вкажіть коректний період логів.')
            return
          }
          setPage(1)
          setFilters({ startDate, endDate, level, search })
        }}
      >
        <DatePicker
          label="Від"
          placeholder="Від"
          date={startDate}
          setDateAction={setStartDate}
        />
        <DatePicker
          label="До"
          placeholder="До"
          date={endDate}
          setDateAction={setEndDate}
        />
        <div className="flex flex-col gap-3">
          <Label htmlFor={`log-level-${userUuid}`}>Рівень</Label>
          <Select
            value={level}
            onValueChange={(value) => setLevel(value as LogsLevel)}
          >
            <SelectTrigger id={`log-level-${userUuid}`} className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {logsLevelOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor={`log-search-${userUuid}`}>Пошук</Label>
          <Input
            id={`log-search-${userUuid}`}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <Button type="submit" disabled={loading}>
          Показати
        </Button>
      </form>
      {loading && (
        <p role="status" className="text-muted-foreground py-4">
          Завантаження логів…
        </p>
      )}
      {error && (
        <div role="alert" className="text-destructive py-4">
          {error}{' '}
          <Button
            variant="outline"
            onClick={() => setAttempt((value) => value + 1)}
          >
            Повторити
          </Button>
        </div>
      )}
      {!loading && logs && (
        <>
          {logs.logs.length ? (
            <div className="max-h-[600px] overflow-auto">
              <AllLogsTable logs={logs.logs} />
            </div>
          ) : (
            <p className="text-muted-foreground py-4">
              Логів за цей період немає.
            </p>
          )}
          <Pagination
            page={logs.page || 1}
            pageCount={Math.max(1, logs.pageCount)}
            isComponent
            onPress={(next) => {
              setPage(next)
              scrollContainerRef?.current?.scrollTo({
                top: 0,
                behavior: 'smooth',
              })
            }}
          />
        </>
      )}
    </div>
  )
}
