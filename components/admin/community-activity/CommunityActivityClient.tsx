'use client'

import React, { useEffect, useState } from 'react'
import { getCommunityActivity } from '@/lib/api/community'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import CommunityActivityChart from './CommunityActivityChart'
import SimpleBarChart from '@/components/admin/users/SimpleBarChart'
import CommunityPage, {
  CommunityLoadState,
} from '@/components/admin/community/CommunityPage'
import dayjs from 'dayjs'

type Point = { date: string; usersCount: number }
export default function CommunityActivityClient({
  variant = 'classic',
}: {
  variant?: 'classic' | 'v2'
  spPromise: Promise<{ page?: string }>
  adminId: number
}) {
  const [days, setDays] = useState('14')
  const [appliedDays, setAppliedDays] = useState(14)
  const [communityActivity, setCommunityActivity] = useState<Point[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const validDays =
    Number.isInteger(Number(days)) && Number(days) >= 1 && Number(days) <= 365
  async function loadCommunityActivity(count: number) {
    setLoading(true)
    setError(null)
    const res = await getCommunityActivity(count)
    if (!Array.isArray(res))
      setError('Не вдалося завантажити активність спільноти.')
    else {
      setCommunityActivity(
        res.map((item: Point) => ({
          date: item.date,
          usersCount: Number(item.usersCount ?? 0),
        })),
      )
      setAppliedDays(count)
    }
    setLoading(false)
  }
  useEffect(() => {
    void loadCommunityActivity(14)
  }, [])
  return (
    <CommunityPage
      variant={variant}
      title="Активність спільноти"
      description="Кількість користувачів, які відвідали спільноту кожного дня. Один користувач враховується один раз на день."
    >
      {variant === 'classic' && (
        <h1 className="mb-4 text-xl font-semibold">Community Activity</h1>
      )}
      <form
        className="community-toolbar mb-6 flex flex-wrap items-end gap-4"
        onSubmit={(event) => {
          event.preventDefault()
          if (validDays && !loading) void loadCommunityActivity(Number(days))
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="community-days">Останні дні</Label>
          <Input
            id="community-days"
            className="w-44"
            type="number"
            min={1}
            max={365}
            step={1}
            value={days}
            onChange={(event) => setDays(event.target.value)}
          />
        </div>
        <Button disabled={!validDays || loading}>Показати</Button>
        <span className="text-muted-foreground pb-2 text-xs">
          Від 1 до 365 днів
        </span>
      </form>
      <CommunityLoadState
        loading={loading}
        error={error}
        empty={!communityActivity.length}
        onRetry={() => loadCommunityActivity(appliedDays)}
      />
      {!loading && !error && communityActivity.length > 0 && (
        <section
          className={
            variant === 'v2' ? 'bg-card rounded-2xl border p-6 shadow-sm' : ''
          }
        >
          {variant === 'v2' ? (
            <>
              <h2 className="font-semibold">Відвідувачі за день</h2>
              <p className="text-muted-foreground mt-1 mb-6 text-sm">
                Останні {appliedDays} днів · денні значення не є кількістю
                унікальних користувачів за весь період
              </p>
              <SimpleBarChart
                variant="v2"
                data={communityActivity.map((item) => ({
                  date: item.date,
                  count: item.usersCount,
                }))}
                barName="Відвідувачі за день"
                formatTick={(value) => dayjs(value).format('DD.MM')}
              />
            </>
          ) : (
            <CommunityActivityChart
              data={communityActivity.map((item) => ({
                ...item,
                date: dayjs(item.date).format('DD-MM-YYYY'),
              }))}
            />
          )}
        </section>
      )}
    </CommunityPage>
  )
}
