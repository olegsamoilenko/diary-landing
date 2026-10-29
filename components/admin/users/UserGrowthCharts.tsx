'use client'

import { useEffect, useState } from 'react'
import { UsersRound, BadgeCheck } from 'lucide-react'
import SimpleBarChart from './SimpleBarChart'
import AdminPeriodFilter, {
  adminPeriodGroups as groups,
} from '@/components/admin/AdminPeriodFilter'
import { Button } from '@/components/ui/button'
import { getAdminUserGrowth } from '@/lib/api/users'
import { getErrorMessage } from '@/lib/errors'
import { dateInputValue, defaultStatisticsPeriod } from '@/lib/utils/adminDates'
import { getGrowthDataError } from '@/lib/utils/adminGrowth'
import type { AdminUserGrowth, GrowthGranularity } from '@/types/adminGrowth'

const dayLabel = (value: string) => value.split('-').reverse().join('.')
const rangeLabel = (from: string, to: string) =>
  from === to ? dayLabel(from) : `${dayLabel(from)} — ${dayLabel(to)}`
const metrics = [
  {
    key: 'newUsers',
    title: 'Нові користувачі',
    description: 'Зареєструвалися за вибраний період',
    color: 'var(--admin-brand)',
    icon: UsersRound,
  },
  {
    key: 'newPaidUsers',
    title: 'Нові платні користувачі',
    description: 'Перша зафіксована платна підписка',
    color: 'var(--admin-chart-action)',
    icon: BadgeCheck,
  },
] as const

const paidSeries = [
  {
    key: 'ad-free-m1',
    name: 'Без реклами · місяць',
    color: 'var(--admin-chart-adfree-month)',
  },
  {
    key: 'ad-free-y1',
    name: 'Без реклами · рік',
    color: 'var(--admin-chart-adfree-year)',
  },
  { key: 'lite-m1', name: 'Lite', color: 'var(--admin-chart-lite)' },
  { key: 'base-m1', name: 'Base', color: 'var(--admin-chart-base)' },
  { key: 'pro-m1', name: 'Pro', color: 'var(--admin-chart-pro)' },
]
const paidPlanIds = paidSeries.map((plan) => plan.key)

export default function UserGrowthCharts() {
  const [initial] = useState(defaultStatisticsPeriod)
  const [from, setFrom] = useState<Date | undefined>(initial.from)
  const [to, setTo] = useState<Date | undefined>(initial.to)
  const [granularity, setGranularity] = useState<GrowthGranularity>('day')
  const [period, setPeriod] = useState(() => ({
    from: dateInputValue(initial.from),
    to: dateInputValue(initial.to),
    granularity: 'day' as GrowthGranularity,
    revision: 0,
  }))
  const [data, setData] = useState<AdminUserGrowth | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [formError, setFormError] = useState('')
  // Also check retained React state: Fast Refresh can keep a response from an older API shape.
  const displayError =
    error || (!loading && data ? getGrowthDataError(data, paidPlanIds) : '')

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError('')
    getAdminUserGrowth(
      period.from,
      period.to,
      period.granularity,
      controller.signal,
    )
      .then((result) => {
        const dataError = getGrowthDataError(result, paidPlanIds)
        if (dataError) throw new Error(dataError)
        if (!controller.signal.aborted) setData(result)
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
    if (!from || !to || from > to) {
      setFormError('Вкажіть обидві дати. Дата «Від» має бути не пізніше «До».')
      return
    }
    setFormError('')
    setPeriod({
      from: dateInputValue(from),
      to: dateInputValue(to),
      granularity,
      revision: period.revision + 1,
    })
  }

  function tickLabel(value: string) {
    const [year, month, day] = value.split('-')
    if (period.granularity === 'year') return year
    if (period.granularity === 'quarter')
      return `${Math.ceil(Number(month) / 3)} кв. ${year}`
    if (period.granularity === 'month') return `${month}.${year}`
    return `${day}.${month}`
  }

  return (
    <section className="space-y-5 pt-3" aria-labelledby="growth-title">
      <div>
        <h2 id="growth-title" className="text-xl font-semibold tracking-tight">
          Динаміка користувачів
        </h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Реєстрації та перехід на платну підписку
        </p>
      </div>
      <AdminPeriodFilter
        from={from}
        to={to}
        onFromChange={setFrom}
        onToChange={setTo}
        granularity={granularity}
        onGranularityChange={setGranularity}
        onApply={applyPeriod}
        loading={loading}
        error={formError}
      />
      {displayError ? (
        <div role="alert" className="bg-card rounded-2xl border p-6">
          <p className="text-destructive text-sm">{displayError}</p>
          <Button
            variant="outline"
            className="mt-3"
            onClick={() =>
              setPeriod((value) => ({ ...value, revision: value.revision + 1 }))
            }
          >
            Повторити
          </Button>
        </div>
      ) : (
        <div className="grid min-w-0 gap-5 xl:grid-cols-2" aria-busy={loading}>
          {metrics.map(({ key, title, description, color, icon: Icon }) => (
            <article
              key={key}
              className="bg-card flex min-w-0 flex-col overflow-hidden rounded-2xl border shadow-sm"
            >
              <div className="flex items-start justify-between gap-4 px-6 pt-6">
                <div>
                  <h3 className="text-sm font-medium">{title}</h3>
                  <p className="text-muted-foreground mt-3 text-xs">
                    Усього за період
                    {key === 'newPaidUsers' ? ' · усі плани' : ''}
                  </p>
                  <p className="mt-1 text-4xl leading-none font-semibold tracking-tight tabular-nums">
                    {loading ? '—' : data?.totals[key].toLocaleString('uk-UA')}
                  </p>
                  <p className="text-muted-foreground mt-3 text-xs">
                    {description}
                  </p>
                </div>
                <span className="bg-muted/60 rounded-xl p-3" style={{ color }}>
                  <Icon className="size-5" aria-hidden="true" />
                </span>
              </div>
              <div className="flex-1 px-3 pt-5 pb-4 sm:px-5">
                {loading ? (
                  <div
                    role="status"
                    className="bg-muted/30 text-muted-foreground flex h-64 items-center justify-center rounded-xl text-sm"
                  >
                    Завантаження графіка…
                  </div>
                ) : (
                  data && (
                    <SimpleBarChart
                      variant="v2"
                      height={256}
                      barName={title}
                      color={color}
                      formatTick={tickLabel}
                      series={key === 'newPaidUsers' ? paidSeries : undefined}
                      data={data.points.map((point) => ({
                        date: point.date,
                        count: point[key],
                        label: rangeLabel(point.from, point.to),
                        values:
                          key === 'newPaidUsers' ? point.paidByPlan : undefined,
                      }))}
                    />
                  )
                )}
              </div>
              <div className="text-muted-foreground bg-muted/20 flex flex-wrap justify-between gap-2 border-t px-6 py-3 text-xs">
                <span>{rangeLabel(period.from, period.to)}</span>
                <span>
                  {!loading && data?.totals[key] === 0
                    ? 'За цей період користувачів немає'
                    : `Групування: ${groups.find((group) => group.value === period.granularity)?.label.toLowerCase()}`}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
      <p className="text-muted-foreground text-xs leading-relaxed">
        Платні підписки: Без реклами (місяць і рік), Lite, Base та Pro. Кожен
        користувач враховується один раз за першою зафіксованою підпискою з
        успішним замовленням, у серії першого плану; продовження та зміна плану
        не додають нового користувача. Купівля лише кредитів сюди не входить.
        Історія залежить від збережених даних підписок. Неповні тижні, місяці,
        квартали й роки враховують лише вибрані дати.
      </p>
    </section>
  )
}
