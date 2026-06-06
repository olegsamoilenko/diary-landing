'use client'

import React, { use, useEffect, useState } from 'react'
import { getCommunityActivity } from '@/lib/api/community'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import CommunityActivityChart from '@/components/admin/community-activity/CommunityActivityChart'
import dayjs from 'dayjs'

type SP = { page?: string }

export default function CommunityActivityClient({
  spPromise,
  adminId,
}: {
  spPromise: Promise<SP>
  adminId: number
}) {
  const sp = use(spPromise)

  const page = Number(sp.page ?? '1') || 1
  const [days, setDays] = useState<number>(14)
  const [communityActivity, setCommunityActivity] = useState<
    { date: string; usersCount: number }[]
  >([])

  useEffect(() => {
    loadCommunityActivity()
  }, [])

  const loadCommunityActivity = async () => {
    const res = await getCommunityActivity(days)

    setCommunityActivity(
      res.map((item: { date: string; usersCount: number }) => ({
        date: dayjs(item.date).format('DD-MM-YYYY'),
        usersCount: Number(item.usersCount ?? 0),
      })),
    )
  }

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold">Community Activity</h1>
      <div>
        <div className="mb-10 flex items-end gap-10">
          <div>
            <Label htmlFor="uuid" className="mb-2">
              Days
            </Label>
            <Input
              id="uuid"
              type="number"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              placeholder="Uuid"
            />
          </div>
          <Button
            onClick={async () => {
              await loadCommunityActivity()
            }}
          >
            Load
          </Button>
        </div>
      </div>
      <CommunityActivityChart data={communityActivity} />
    </div>
  )
}
