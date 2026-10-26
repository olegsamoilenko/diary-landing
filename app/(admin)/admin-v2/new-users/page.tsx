'use client'

import { useEffect, useState } from 'react'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import { DatePicker } from '@/components/ui/DatePicker'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Pagination from '@/components/ui/pagination'
import AllUsersTable from '@/components/admin/admins/AllUsersTable'
import NewUsersStatChart from '@/components/admin/user-list/NewUsersStatChart'
import { getNewUsers, getNewUsersDays } from '@/lib/api/users'
import { getErrorMessage } from '@/lib/errors'
import {
  dateInputValue,
  defaultRegistrationPeriod,
} from '@/lib/utils/adminDates'
import type { NewUsersDay, NewUsersPageResult } from '@/types/user'

export default function NewUsersPage() {
  const [initial] = useState(defaultRegistrationPeriod)
  const [from, setFrom] = useState<Date | undefined>(initial.from)
  const [to, setTo] = useState<Date | undefined>(initial.to)
  const [limit, setLimit] = useState('200')
  const [period, setPeriod] = useState(() => ({
    from: dateInputValue(initial.from),
    to: dateInputValue(initial.to),
    revision: 0,
  }))
  const [pageSize, setPageSize] = useState(200)
  const [page, setPage] = useState(1)
  const [result, setResult] = useState<NewUsersPageResult | null>(null)
  const [days, setDays] = useState<NewUsersDay[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [chartLoading, setChartLoading] = useState(true)
  const [error, setError] = useState('')
  const [chartError, setChartError] = useState('')
  const [formError, setFormError] = useState('')
  const [retry, setRetry] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError('')
    setResult(null)
    getNewUsers(period.from, period.to, page, pageSize, controller.signal)
      .then((data) => {
        if (controller.signal.aborted) return
        if (!data || !Array.isArray(data.users))
          throw new Error('Сервер повернув некоректний список користувачів.')
        if (page > data.pageCount && data.pageCount > 0) {
          setPage(data.pageCount)
          return
        }
        setResult(data)
      })
      .catch((err) => {
        if (!controller.signal.aborted) setError(getErrorMessage(err))
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })
    return () => controller.abort()
  }, [period, page, pageSize, retry])

  useEffect(() => {
    const controller = new AbortController()
    setChartLoading(true)
    setChartError('')
    setDays(null)
    getNewUsersDays(period.from, period.to, controller.signal)
      .then((data) => {
        if (controller.signal.aborted) return
        if (!data || !Array.isArray(data.days))
          throw new Error('Сервер повернув некоректну статистику.')
        setDays(data.days)
      })
      .catch((err) => {
        if (!controller.signal.aborted) setChartError(getErrorMessage(err))
      })
      .finally(() => {
        if (!controller.signal.aborted) setChartLoading(false)
      })
    return () => controller.abort()
  }, [period, retry])

  const totals = days?.reduce(
    (sum, day) => ({
      total: sum.total + day.total,
      withAction: sum.withAction + day.withAction,
      withoutAction: sum.withoutAction + day.withoutAction,
    }),
    { total: 0, withAction: 0, withoutAction: 0 },
  )
  const summary = [
    ['Всі', totals?.total],
    ['З дією', totals?.withAction],
    ['Без дії', totals?.withoutAction],
  ] as const
  return (
    <div className="space-y-6">
      <AdminPageHeader section="Користувачі" title="Нові користувачі" />
      <form
        className="bg-card rounded-2xl border p-5"
        onSubmit={(event) => {
          event.preventDefault()
          const size = Number(limit)
          if (!from || !to || dateInputValue(from) > dateInputValue(to)) {
            setFormError(
              'Вкажіть коректний період: дата від має бути не пізніше дати до.',
            )
            return
          }
          if (!Number.isSafeInteger(size) || size < 1) {
            setFormError('Кількість рядків має бути додатним цілим числом.')
            return
          }
          setFormError('')
          setPage(1)
          setPageSize(size)
          setPeriod((previous) => ({
            from: dateInputValue(from),
            to: dateInputValue(to),
            revision: previous.revision + 1,
          }))
        }}
      >
        <div className="flex flex-wrap items-end gap-4">
          <DatePicker
            label="Від"
            placeholder="Оберіть дату"
            date={from}
            setDateAction={setFrom}
          />
          <DatePicker
            label="До"
            placeholder="Оберіть дату"
            date={to}
            setDateAction={setTo}
          />
          <div className="space-y-3">
            <Label htmlFor="new-users-limit">На сторінці</Label>
            <Input
              id="new-users-limit"
              className="w-32"
              type="number"
              min={1}
              step={1}
              required
              value={limit}
              onChange={(event) => setLimit(event.target.value)}
            />
          </div>
          <Button type="submit">Показати</Button>
        </div>
        <p className="text-muted-foreground mt-4 text-xs">
          Період реєстрації включно з обома датами · час за Києвом.
        </p>
        {formError && (
          <p role="alert" className="text-destructive mt-3 text-sm">
            {formError}
          </p>
        )}
      </form>
      <section
        aria-label="Статистика нових користувачів"
        className="bg-card min-w-0 rounded-2xl border p-5 sm:p-6"
      >
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">Нові користувачі за днями</h2>
            <p className="text-muted-foreground mt-1 text-xs">
              {period.from} — {period.to} · увесь вибраний період
            </p>
          </div>
          <div className="flex gap-8">
            {summary.map(([label, count]) => (
              <div key={label}>
                <p className="text-muted-foreground text-xs">{label}</p>
                <p className="mt-1 text-2xl font-semibold tabular-nums">
                  {count?.toLocaleString('uk-UA') ?? '—'}
                </p>
              </div>
            ))}
          </div>
        </div>
        {chartLoading ? (
          <div
            role="status"
            className="text-muted-foreground flex h-[320px] items-center justify-center"
          >
            Завантаження графіка…
          </div>
        ) : chartError ? (
          <div role="alert" className="text-destructive py-8">
            {chartError}{' '}
            <Button
              variant="outline"
              onClick={() => setRetry((value) => value + 1)}
            >
              Повторити
            </Button>
          </div>
        ) : (
          <>
            <NewUsersStatChart data={days ?? []} variant="v2" height={320} />
            {totals?.total === 0 && (
              <p className="text-muted-foreground text-center text-sm">
                За цей період нових користувачів немає.
              </p>
            )}
          </>
        )}
        <p className="text-muted-foreground mt-4 text-xs">
          З дією — користувачі, для яких зафіксовано створення запису, чекіну,
          діалогу або планера. Дія могла відбутися після вибраного періоду.
        </p>
      </section>
      <section
        aria-label="Таблиця нових користувачів"
        className="bg-card min-w-0 overflow-hidden rounded-2xl border"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b p-5">
          <div>
            <h2 className="text-lg font-semibold">Користувачі</h2>
            <p className="text-muted-foreground mt-1 text-xs">
              Найновіші спочатку · розкрийте рядок, щоб переглянути профіль і
              логи
            </p>
            <p className="text-muted-foreground mt-1 text-xs">
              Записи й чекіни: з аналізом / без аналізу / без ознаки
            </p>
          </div>
          {result && (
            <span className="text-muted-foreground text-sm tabular-nums">
              {result.total === 0 ? 0 : (result.page - 1) * result.limit + 1}–
              {Math.min(result.page * result.limit, result.total)} із{' '}
              {result.total}
            </span>
          )}
        </div>
        {loading ? (
          <p role="status" className="text-muted-foreground p-8 text-center">
            Завантаження користувачів…
          </p>
        ) : error ? (
          <div role="alert" className="text-destructive p-5">
            {error}{' '}
            <Button
              variant="outline"
              onClick={() => setRetry((value) => value + 1)}
            >
              Повторити
            </Button>
          </div>
        ) : result?.users.length ? (
          <AllUsersTable
            key={`${period.from}-${period.to}-${page}-${pageSize}-${period.revision}`}
            users={result.users}
            variant="v2"
          />
        ) : (
          <p className="text-muted-foreground p-8 text-center">
            За цей період користувачів немає.
          </p>
        )}
        {result && !loading && (
          <div className="flex flex-wrap items-center justify-between gap-3 border-t px-5">
            <span className="text-muted-foreground text-xs">
              Сторінка {result.page} з {result.pageCount} · по {result.limit}
            </span>
            <Pagination
              page={result.page}
              pageCount={result.pageCount}
              isComponent
              onPress={setPage}
            />
          </div>
        )}
      </section>
    </div>
  )
}
