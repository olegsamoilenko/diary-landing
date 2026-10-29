'use client'

import { useEffect, useState } from 'react'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import StatisticBlock from '@/components/admin/users/StatisticBlock'
import UserGrowthCharts from '@/components/admin/users/UserGrowthCharts'
import { Button } from '@/components/ui/button'
import { getAdminUserOverview } from '@/lib/api/users'
import { getErrorMessage } from '@/lib/errors'
import { formatAdminDate } from '@/lib/utils/adminDates'
import type { AdminUserOverview } from '@/types/user'

const displayDay = (day: string) => day.split('-').reverse().join('.')

export default function UsersStatisticsPage() {
  const [data, setData] = useState<AdminUserOverview | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [revision, setRevision] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError('')
    getAdminUserOverview(controller.signal)
      .then((result) => {
        if (!controller.signal.aborted) setData(result)
      })
      .catch((err) => {
        if (!controller.signal.aborted) setError(getErrorMessage(err))
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })
    return () => controller.abort()
  }, [revision])

  return (
    <div className="space-y-6">
      <AdminPageHeader section="Користувачі" title="Статистика користувачів" />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-muted-foreground text-sm">
          {data
            ? `Оновлено ${formatAdminDate(data.calculatedAt)} · Київ`
            : 'Поточний стан користувачів у базі'}
        </p>
        <Button
          variant="outline"
          disabled={loading}
          onClick={() => setRevision((value) => value + 1)}
        >
          {loading ? 'Оновлення…' : 'Оновити'}
        </Button>
      </div>
      {loading ? (
        <div
          role="status"
          className="bg-card text-muted-foreground rounded-2xl border p-10 text-center"
        >
          Завантаження статистики…
        </div>
      ) : error ? (
        <div
          role="alert"
          className="bg-card text-destructive rounded-2xl border p-6"
        >
          <p>{error}</p>
          <Button
            className="mt-4"
            variant="outline"
            onClick={() => setRevision((value) => value + 1)}
          >
            Повторити
          </Button>
        </div>
      ) : (
        data && (
          <>
            <section
              aria-label="Загальна статистика користувачів"
              className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
            >
              <StatisticBlock
                variant="v2"
                name="Усього користувачів"
                value={data.total}
                description="Усі користувачі, які зараз є в базі"
              />
              <StatisticBlock
                variant="v2"
                name="Активні за 30 днів"
                value={data.active}
                description="Поверталися після дня реєстрації"
              />
              <StatisticBlock
                variant="v2"
                name="Початковий пробний доступ"
                value={data.trial}
                description="Пробний період ще діє та має доступні кредити"
              />
              <StatisticBlock
                variant="v2"
                name="З купленими кредитами"
                value={data.purchasedCredits}
                description="Додатний залишок куплених кредитів"
              />
            </section>
            <section aria-label="Підписки користувачів" className="space-y-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-lg font-semibold">Чинні підписки</h2>
                <p className="text-muted-foreground text-sm tabular-nums">
                  Усього: {data.subscribed.toLocaleString('uk-UA')}
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
                {[...data.subscriptions]
                  .sort(
                    (a, b) =>
                      Number(b.basePlanId.startsWith('ad-free-')) -
                      Number(a.basePlanId.startsWith('ad-free-')),
                  )
                  .map((plan) => (
                    <StatisticBlock
                      key={plan.basePlanId}
                      variant="v2"
                      name={plan.name}
                      value={plan.count}
                      description={
                        plan.basePlanId.endsWith('-y1')
                          ? 'Річна підписка'
                          : 'Місячна підписка'
                      }
                    />
                  ))}
              </div>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Скасоване автопродовження враховується до завершення оплаченого
                періоду. Вичерпані AI-кредити не скасовують підписку. Користувач
                може одночасно мати підписку й куплені кредити.
              </p>
            </section>
            <section
              aria-label="Як рахується активність"
              className="bg-muted/40 rounded-2xl border p-5 text-sm leading-relaxed"
            >
              <h2 className="font-medium">Як рахується активність</h2>
              <p className="text-muted-foreground mt-2">
                Остання активність із {displayDay(data.activePeriod.from)} до{' '}
                {displayDay(data.activePeriod.to)} включно, станом на час
                оновлення. День останньої активності відрізняється від дня
                реєстрації. Порівнюємо календарні дні за Києвом, а не час входу.
              </p>
            </section>
          </>
        )
      )}
      <UserGrowthCharts />
    </div>
  )
}
