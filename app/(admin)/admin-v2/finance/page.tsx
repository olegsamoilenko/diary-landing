'use client'

import { useEffect, useState } from 'react'
import { Banknote, ReceiptText, Wallet } from 'lucide-react'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import AdminPeriodFilter from '@/components/admin/AdminPeriodFilter'
import StatisticBlock from '@/components/admin/users/StatisticBlock'
import SimpleBarChart from '@/components/admin/users/SimpleBarChart'
import { Button } from '@/components/ui/button'
import { apiFetch } from '@/lib/api/apiFetch'
import { getErrorMessage } from '@/lib/errors'
import {
  defaultRegistrationPeriod,
  dateInputValue,
  formatAdminDate,
} from '@/lib/utils/adminDates'
import type { GrowthGranularity } from '@/types/adminGrowth'
import type { AdminFinance, FinanceSummary } from '@/types/adminFinance'

const usd = (value: number) =>
  value.toLocaleString('uk-UA', {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
const percent = (value: number | null) =>
  value === null
    ? '—'
    : `${value.toLocaleString('uk-UA', { maximumFractionDigits: 1 })}%`
const colors = [
  'adfree-month',
  'adfree-year',
  'lite',
  'base',
  'pro',
  'credits-small',
  'credits-medium',
  'credits-large',
]
const dayLabel = (day: string) => day.split('-').reverse().join('.')
const total = (values: Record<string, number>) =>
  Object.values(values).reduce((sum, value) => sum + value, 0)

function PaymentValue({ value }: { value: FinanceSummary }) {
  return (
    <span className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-xl leading-snug">
      <span>
        {value.count.toLocaleString('uk-UA')}{' '}
        <span className="text-muted-foreground text-xs font-normal">шт</span>
      </span>
      <span className="text-muted-foreground font-normal">/</span>
      <span>
        {value.estimatedCount > 0 ? '≈ ' : ''}
        {usd(value.grossUsd)}
        {value.missingAmountCount > 0 ? '*' : ''}
      </span>
      <span className="text-muted-foreground font-normal">/</span>
      <span>
        {value.netEstimatedCount > 0 && value.retainedPercent !== null
          ? '≈ '
          : ''}
        {percent(value.retainedPercent)}
      </span>
    </span>
  )
}

export default function FinancePage() {
  const [initial] = useState(() => defaultRegistrationPeriod(new Date(), 30))
  const [from, setFrom] = useState<Date | undefined>(initial.from)
  const [to, setTo] = useState<Date | undefined>(initial.to)
  const [granularity, setGranularity] = useState<GrowthGranularity>('day')
  const [includeTest, setIncludeTest] = useState(
    process.env.NODE_ENV === 'development',
  )
  const [period, setPeriod] = useState(() => ({
    from: dateInputValue(initial.from),
    to: dateInputValue(initial.to),
    granularity: 'day' as GrowthGranularity,
    includeTest: process.env.NODE_ENV === 'development',
    revision: 0,
  }))
  const [data, setData] = useState<AdminFinance | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [formError, setFormError] = useState('')
  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError('')
    const query = new URLSearchParams({
      from: period.from,
      to: period.to,
      granularity: period.granularity,
      includeTest: String(period.includeTest),
    })
    apiFetch<AdminFinance>(`/api/finance-statistics/admin-revenue?${query}`, {
      signal: controller.signal,
      cache: 'no-store',
      toastOnError: false,
    })
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
  }, [period])
  function apply() {
    if (!from || !to || from > to) {
      setFormError('Вкажіть коректний період: «Від» не пізніше «До».')
      return
    }
    setFormError('')
    setPeriod({
      from: dateInputValue(from),
      to: dateInputValue(to),
      granularity,
      includeTest,
      revision: period.revision + 1,
    })
  }
  function tick(day: string) {
    const [year, month, date] = day.split('-')
    return period.granularity === 'year'
      ? year
      : period.granularity === 'quarter'
        ? `${Math.ceil(Number(month) / 3)} кв. ${year}`
        : period.granularity === 'month'
          ? `${month}.${year}`
          : `${date}.${month}`
  }
  const series = data?.products.map((p, index) => ({
    key: p.id,
    name: p.name,
    color: `var(--admin-chart-${colors[index]})`,
  }))
  return (
    <div className="space-y-6">
      <AdminPageHeader section="Фінанси" title="Надходження" />
      <p className="text-muted-foreground text-sm">
        Оплати підписок і пакетів кредитів. Усі суми — у доларах США.
      </p>
      <AdminPeriodFilter
        from={from}
        to={to}
        onFromChange={setFrom}
        onToChange={setTo}
        granularity={granularity}
        onGranularityChange={setGranularity}
        onApply={apply}
        loading={loading}
        error={formError}
      >
        <Button
          type="button"
          variant={includeTest ? 'secondary' : 'outline'}
          aria-pressed={includeTest}
          onClick={() => setIncludeTest(!includeTest)}
        >
          Тестові оплати: {includeTest ? 'увімкнено' : 'вимкнено'}
        </Button>
      </AdminPeriodFilter>
      {loading ? (
        <div
          role="status"
          className="bg-card text-muted-foreground rounded-2xl border p-12 text-center"
        >
          Завантаження оплат і курсів валют…
        </div>
      ) : error ? (
        <div role="alert" className="bg-card rounded-2xl border p-6">
          <p className="text-destructive">{error}</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() =>
              setPeriod((p) => ({ ...p, revision: p.revision + 1 }))
            }
          >
            Повторити
          </Button>
        </div>
      ) : (
        data && (
          <>
            <div className="text-muted-foreground flex flex-wrap justify-between gap-2 text-xs">
              <span>
                {dayLabel(data.from)} — {dayLabel(data.to)} ·{' '}
                {data.includeTest
                  ? 'Тестові оплати включено'
                  : 'Без тестових оплат'}
              </span>
              <span>Оновлено {formatAdminDate(data.calculatedAt)}</span>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  title: 'Кількість оплат',
                  value: data.totals.count.toLocaleString('uk-UA'),
                  icon: ReceiptText,
                  note: 'Підписки, продовження та пакети кредитів',
                },
                {
                  title: 'Сплатили користувачі',
                  value: `${data.totals.estimatedCount ? '≈ ' : ''}${usd(data.totals.grossUsd)}${data.totals.missingAmountCount ? '*' : ''}`,
                  icon: Banknote,
                  note: 'До комісій і податків · USD',
                },
                {
                  title: 'Дохід після утримань',
                  value:
                    data.totals.netUsd === null
                      ? '—'
                      : `${data.totals.netEstimatedCount ? '≈ ' : ''}${usd(data.totals.netUsd)}`,
                  icon: Wallet,
                  note:
                    data.totals.retainedPercent === null
                      ? `Дані відомі для ${data.totals.netKnownCount} із ${data.totals.count} оплат`
                      : `${data.totals.netEstimatedCount ? 'Орієнтовно ' : ''}${percent(data.totals.retainedPercent)} від суми оплат`,
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="bg-card flex justify-between gap-3 rounded-2xl border p-6 shadow-sm"
                >
                  <div>
                    <h2 className="text-muted-foreground text-sm">
                      {item.title}
                    </h2>
                    <p className="my-3 text-3xl font-semibold tracking-tight tabular-nums">
                      {item.value}
                    </p>
                    <p className="text-muted-foreground text-xs">{item.note}</p>
                  </div>
                  <item.icon
                    className="text-primary size-5 shrink-0"
                    aria-hidden="true"
                  />
                </article>
              ))}
            </div>
            {(data.totals.estimatedCount > 0 ||
              data.totals.netEstimatedCount > 0 ||
              data.totals.missingAmountCount > 0 ||
              data.coverage.unresolvedOrders > 0 ||
              data.coverage.unmapped > 0) && (
              <div
                role="status"
                className="bg-muted/50 text-muted-foreground space-y-1 rounded-xl border p-4 text-sm"
              >
                {data.totals.netEstimatedCount > 0 && (
                  <p>
                    ≈ Дохід для {data.totals.netEstimatedCount} оплат
                    розраховано з фактичного податку та резервної комісії. Це
                    оцінка, а не підтверджена виплата Google.
                  </p>
                )}
                {data.totals.estimatedCount > 0 && (
                  <p>
                    ≈ За тарифами оцінено {data.totals.estimatedCount} оплат. Ці
                    суми не є підтвердженими надходженнями.
                  </p>
                )}
                {data.totals.missingAmountCount > 0 && (
                  <p>
                    * Для {data.totals.missingAmountCount} оплат немає суми або
                    курсу. Підсумки та графік сум неповні; кількість оплат
                    збережено.
                  </p>
                )}
                {data.estimatedDates > 0 && (
                  <p>
                    Для {data.estimatedDates} замовлень використано дату першої
                    фіксації на бекенді.
                  </p>
                )}
                {data.coverage.unresolvedOrders > 0 && (
                  <p>
                    Деталі {data.coverage.unresolvedOrders} замовлень
                    недоступні. Звіт може містити оцінки або бути неповним.
                  </p>
                )}
                {data.coverage.unmapped > 0 && (
                  <p>
                    Не вдалося визначити план для {data.coverage.unmapped}{' '}
                    замовлень; вони не включені.
                  </p>
                )}
              </div>
            )}
            {(['subscription', 'credits'] as const).map((kind) => (
              <section key={kind} className="space-y-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="text-lg font-semibold">
                    {kind === 'subscription' ? 'Підписки' : 'Пакети кредитів'}
                  </h2>
                  <p className="text-muted-foreground text-xs">
                    Кількість / оплати USD / частка доходу
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {data.products
                    .filter((p) => p.kind === kind)
                    .map((p) => (
                      <StatisticBlock
                        key={p.id}
                        variant="v2"
                        name={p.name}
                        value={undefined}
                        formattedValue={<PaymentValue value={p} />}
                        description={
                          p.netUsd === null
                            ? '— Частка доходу невідома: бракує даних після утримань'
                            : `${p.netEstimatedCount ? 'Орієнтовний дохід' : 'Дохід після утримань'}: ${usd(p.netUsd)}`
                        }
                      />
                    ))}
                </div>
              </section>
            ))}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold">Динаміка надходжень</h2>
              <div className="grid min-w-0 gap-5 xl:grid-cols-2">
                {(['counts', 'amounts'] as const).map((metric) => (
                  <article
                    key={metric}
                    className="bg-card min-w-0 overflow-hidden rounded-2xl border p-5 shadow-sm sm:p-6"
                  >
                    <h3 className="font-medium">
                      {metric === 'counts'
                        ? 'Кількість оплат'
                        : 'Сума оплат користувачів'}
                    </h3>
                    <p className="text-muted-foreground mt-1 mb-6 text-xs">
                      {metric === 'counts'
                        ? 'Окремий колір для кожного плану й пакета'
                        : `USD · до комісій${data.totals.estimatedCount ? ' · містить оцінки' : ''}${data.totals.missingAmountCount ? ' · неповні дані' : ''}`}
                    </p>
                    <SimpleBarChart
                      variant="v2"
                      height={310}
                      barName={
                        metric === 'counts' ? 'Кількість оплат' : 'Сума оплат'
                      }
                      series={series}
                      data={data.points.map((p) => ({
                        date: p.date,
                        label:
                          p.from === p.to
                            ? dayLabel(p.from)
                            : `${dayLabel(p.from)} — ${dayLabel(p.to)}`,
                        count: total(p[metric]),
                        values: p[metric],
                      }))}
                      formatTick={tick}
                      allowDecimals={metric === 'amounts'}
                      formatValue={metric === 'amounts' ? usd : undefined}
                    />
                  </article>
                ))}
              </div>
            </section>
            <details className="text-muted-foreground rounded-xl border p-4 text-xs leading-relaxed">
              <summary className="cursor-pointer font-medium">
                Як рахуємо надходження
              </summary>
              <ul className="mt-3 list-disc space-y-2 pl-4">
                {data.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
                <li>
                  Купівля кредитів: дата покупки, сума й валюта зі збереженого
                  платежу. Ручні суми мають пріоритет над резервним тарифом.
                </li>
              </ul>
            </details>
          </>
        )
      )}
    </div>
  )
}
