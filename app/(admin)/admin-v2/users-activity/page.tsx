'use client'

import { useEffect, useState } from 'react'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import AdminPeriodFilter from '@/components/admin/AdminPeriodFilter'
import SimpleBarChart from '@/components/admin/users/SimpleBarChart'
import { getReturningUsersDays, type ReturningUsersDay } from '@/lib/api/users'
import { getErrorMessage } from '@/lib/errors'
import {
  dateInputValue,
  defaultRegistrationPeriod,
} from '@/lib/utils/adminDates'

export default function UsersActivityPage() {
  const [initial] = useState(defaultRegistrationPeriod)
  const [from, setFrom] = useState<Date | undefined>(initial.from)
  const [to, setTo] = useState<Date | undefined>(initial.to)
  const [period, setPeriod] = useState(() => ({
    from: dateInputValue(initial.from),
    to: dateInputValue(initial.to),
  }))
  const [days, setDays] = useState<ReturningUsersDay[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [formError, setFormError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError('')
    getReturningUsersDays(period.from, period.to, controller.signal)
      .then((result) => {
        if (!Array.isArray(result?.days))
          throw new Error('Не вдалося прочитати статистику.')
        if (!controller.signal.aborted) setDays(result.days)
      })
      .catch((err) => {
        if (!controller.signal.aborted) setError(getErrorMessage(err))
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })
    return () => controller.abort()
  }, [period])

  function applyPeriod() {
    if (!from || !to || dateInputValue(from) > dateInputValue(to)) {
      setFormError('Вкажіть обидві дати. Дата «Від» має бути не пізніше «До».')
      return
    }
    setFormError('')
    setPeriod({ from: dateInputValue(from), to: dateInputValue(to) })
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader section="Користувачі" title="Активність користувачів" />
      <AdminPeriodFilter
        from={from}
        to={to}
        onFromChange={setFrom}
        onToChange={setTo}
        onApply={applyPeriod}
        loading={loading}
        error={formError}
      />
      <section className="bg-card min-w-0 overflow-hidden rounded-2xl border shadow-sm">
        <div className="border-b p-5">
          <h2 className="text-lg font-semibold">Повернення за днями</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Рахуємо користувача один раз за день, якщо він відкрив застосунок
            або повернувся до нього з фону після дня реєстрації. Доступні
            останні 30 днів.
          </p>
        </div>
        {loading ? (
          <p role="status" className="text-muted-foreground p-5">
            Завантаження статистики…
          </p>
        ) : error ? (
          <p role="alert" className="text-destructive p-5">
            {error}
          </p>
        ) : (
          <div className="px-3 pt-5 pb-4 sm:px-5">
            <SimpleBarChart
              variant="v2"
              barName="Користувачів"
              ariaLabel="Кількість користувачів, які повернулися, за кожен день"
              formatTick={(date) =>
                date.slice(5).split('-').reverse().join('.')
              }
              data={[...days].reverse().map(({ date, count }) => ({
                date,
                count,
                label: date.split('-').reverse().join('.'),
              }))}
            />
          </div>
        )}
      </section>
    </div>
  )
}
