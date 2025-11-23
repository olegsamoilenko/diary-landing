'use client'

import React, { use, useEffect, useState } from 'react'
import CommonNotificationsDialog from '@/components/admin/notifications/CommonNotificationsDialog'
import { Platforms } from '@/types'
import { Button } from '@/components/ui/button'
import { getAllCommonNotifications } from '@/lib/api/commonNotifications'
import AllCommonNotificationsTable from '@/components/admin/notifications/AllCommonNotificationsTable'
import Pagination from '@/components/ui/pagination'
import { CommonNotificationsResponse, CommonNotification } from '@/types'

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
  const [commonNotifications, setCommonNotifications] =
    useState<CommonNotificationsResponse | null>(null)

  useEffect(() => {
    loadNotifications()
  }, [page])

  const loadNotifications = async () => {
    const res = await getAllCommonNotifications(page, limit)

    setCommonNotifications(res)
  }

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold">Common Notifications</h1>
      <div className="mb-4">
        <CommonNotificationsDialog onSuccess={loadNotifications} />
      </div>
      <div>
        <AllCommonNotificationsTable
          notifications={
            (commonNotifications?.notifications as CommonNotification[]) ?? []
          }
          onSuccessDelete={loadNotifications}
        />
        <Pagination
          page={commonNotifications?.page ?? 0}
          pageCount={commonNotifications?.pageCount ?? 0}
        />
      </div>
    </div>
  )
}
