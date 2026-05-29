'use client'

import {
  ForumAutoModerationLogsResp,
  ForumModerationTargetType,
  TopicsResponse,
} from '@/types'
import React, { use, useEffect, useState } from 'react'
import ModerationCoastTable from '@/components/admin/moderation-coast/ModerationCoastTable'
import { getModerationLogs } from '@/lib/api/moderation'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { moderationTargetTypeOptions } from '@/lib/constants/community'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Pagination from '@/components/ui/pagination'
import ModerationLogsTable from '@/components/admin/moderation-logs/ModerationLogsTable'

type SP = { page?: string }

export default function ModerationLogsClient({
  spPromise,
  adminId,
}: {
  spPromise: Promise<SP>
  adminId: number
}) {
  const sp = use(spPromise)
  const page = Number(sp.page ?? '1') || 1
  const limit = 20
  const [autoModerationLogsResp, setAutoModerationLogsResp] =
    useState<ForumAutoModerationLogsResp | null>(null)
  const [targetType, setTargetType] = useState<'topic' | 'comment' | 'all'>(
    'all',
  )
  const [userId, setUserId] = useState<number | undefined>(undefined)

  useEffect(() => {
    loadModerationLogs()
  }, [page])

  const loadModerationLogs = async () => {
    const res = await getModerationLogs({
      page,
      limit,
      targetType: targetType === 'all' ? undefined : targetType,
      userId: userId === undefined || userId === 0 ? undefined : userId,
    })

    console.log('moderation logs resp', res)

    setAutoModerationLogsResp(res)
  }

  const fetchLogs = async () => {
    await loadModerationLogs()
  }

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold">Moderation Logs</h1>
      <div className="mb-10 flex items-end gap-10">
        <div className="items-end">
          <Label htmlFor="uuid" className="mb-2">
            Target Type
          </Label>
          <Select
            value={targetType}
            onValueChange={(t) => {
              setTargetType(t as 'topic' | 'comment' | 'all')
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              {moderationTargetTypeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="email" className="mb-2">
            User ID
          </Label>
          <Input
            id="userId"
            type="number"
            value={userId as number}
            onChange={(e) => setUserId(Number(e.target.value))}
            placeholder="ID"
          />
        </div>
        <Button
          onClick={async () => {
            await fetchLogs()
          }}
        >
          Load
        </Button>
      </div>
      <ModerationLogsTable
        moderationLogs={autoModerationLogsResp?.logs ?? []}
        adminId={adminId}
      />
      <Pagination
        page={autoModerationLogsResp?.page ?? 0}
        pageCount={autoModerationLogsResp?.pageCount ?? 0}
      />
    </div>
  )
}
