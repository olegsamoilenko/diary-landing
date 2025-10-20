'use client'

import React, { use, useEffect, useState } from 'react'
import ReleaseNotificationsDialog from '@/components/admin/notifications/ReleaseNotificationsDialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Platforms } from '@/types'
import type { ReleaseNotification, ReleaseNotificationsResponse } from '@/types'
import { Button } from '@/components/ui/button'
import { getAllReleaseNotificationsByPlatform } from '@/lib/api/releaseNotifications'
import AllReleaseNotificationsTable from '@/components/admin/notifications/AllReleaseNotificationsTable'
import Pagination from '@/components/ui/pagination'

type SP = { page?: string; platform?: Platforms }

export default function ReleaseNotificationsPage({
  searchParams,
}: {
  searchParams?: Promise<SP>
}) {
  const spPromise: Promise<SP> = searchParams ?? Promise.resolve({})
  const sp = use(spPromise)

  const page = Number(sp.page ?? '1') || 1
  const limit = 10
  const [platform, setPlatform] = useState<Platforms>(
    sp.platform ?? Platforms.ANDROID,
  )
  const [errorPlatform, setErrorPlatform] = useState<string | null>(null)
  const [releaseNotifications, setReleaseNotifications] =
    useState<ReleaseNotificationsResponse | null>(null)

  useEffect(() => {
    loadNotifications()
  }, [platform, page])

  const loadNotifications = async () => {
    const res = await getAllReleaseNotificationsByPlatform(
      platform,
      page,
      limit,
    )

    setReleaseNotifications(res)
  }

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold">Release Notifications</h1>
      <div className="mb-4">
        <ReleaseNotificationsDialog onSuccess={loadNotifications} />
      </div>
      <div className="mb-4 flex gap-6">
        <div>
          <Select
            value={platform}
            onValueChange={(v) => {
              setPlatform(v as Platforms)
              setErrorPlatform(null)
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="android">Android</SelectItem>
              <SelectItem value="ios">iOS</SelectItem>
            </SelectContent>
          </Select>
          {errorPlatform && (
            <p className="mt-1 text-sm text-red-600">{errorPlatform}</p>
          )}
        </div>
        <Button onClick={loadNotifications}>Show</Button>
      </div>
      <div>
        <AllReleaseNotificationsTable
          notifications={
            (releaseNotifications?.notifications as ReleaseNotification[]) ?? []
          }
          onSuccessDelete={loadNotifications}
        />
        <Pagination
          page={releaseNotifications?.page ?? 0}
          pageCount={releaseNotifications?.pageCount ?? 0}
        />
      </div>
    </div>
  )
}
