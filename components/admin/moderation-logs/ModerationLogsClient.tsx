'use client'

import CommunityPage, {
  CommunityLoadState,
} from '@/components/admin/community/CommunityPage'

import {
  ForumAutoModerationLogsResp,
  ForumModerationTargetType,
  TopicsResponse,
} from '@/types'
import { useRouter, usePathname } from 'next/navigation'
import React, { use, useEffect, useState, useRef, useCallback } from 'react'
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
  variant = 'classic',
  spPromise,
  adminId,
}: {
  variant?: 'classic' | 'v2'
  spPromise: Promise<SP>
  adminId: number
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [appliedFilters, setAppliedFilters] = useState<{
    targetType?: 'topic' | 'comment'
    userId?: number
  }>({})
  const sp = use(spPromise)
  const page = Number(sp.page ?? '1') || 1
  const limit = 20
  const requestId = useRef(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [autoModerationLogsResp, setAutoModerationLogsResp] =
    useState<ForumAutoModerationLogsResp | null>(null)
  const [targetType, setTargetType] = useState<'topic' | 'comment' | 'all'>(
    'all',
  )
  const [userId, setUserId] = useState<number | undefined>(undefined)

  const loadModerationLogs = useCallback(async () => {
    const request = ++requestId.current
    setLoading(true)
    setError(null)
    const res = await getModerationLogs({
      page,
      limit,
      ...appliedFilters,
    })

    if (request !== requestId.current) return
    if (!res) {
      setError('Не вдалося завантажити дані. Спробуйте ще раз.')
    } else {
      setAutoModerationLogsResp(res)
    }
    setLoading(false)
  }, [page, appliedFilters])

  useEffect(() => {
    void loadModerationLogs()
  }, [loadModerationLogs])

  const fetchLogs = async () => {
    await loadModerationLogs()
  }

  return (
    <CommunityPage
      variant={variant}
      title="Журнал модерації"
      description="Рішення автоматичної модерації, причини та контекст перевірки."
    >
      {variant === 'classic' && (
        <h1 className="mb-4 text-xl font-semibold">Moderation Logs</h1>
      )}
      <div className="community-toolbar mb-6 flex flex-wrap items-end gap-4">
        <div className="items-end">
          <Label htmlFor="moderation-type" className="mb-2">
            Тип контенту
          </Label>
          <Select
            value={targetType}
            onValueChange={(t) => {
              setTargetType(t as 'topic' | 'comment' | 'all')
            }}
          >
            <SelectTrigger id="moderation-type" className="w-[180px]">
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
          <Label htmlFor="userId" className="mb-2">
            ID користувача
          </Label>
          <Input
            id="userId"
            type="number"
            value={userId ?? ''}
            onChange={(e) => setUserId(Number(e.target.value))}
            placeholder="ID"
          />
        </div>
        <Button
          disabled={loading}
          onClick={async () => {
            if (page !== 1) router.replace(pathname + '?page=1')
            setAppliedFilters({
              targetType: targetType === 'all' ? undefined : targetType,
              userId: userId || undefined,
            })
          }}
        >
          Показати
        </Button>
      </div>
      <CommunityLoadState
        loading={loading}
        error={error}
        empty={!autoModerationLogsResp?.logs.length}
        onRetry={loadModerationLogs}
      />
      {!loading && !error && (
        <ModerationLogsTable
          key={page}
          moderationLogs={autoModerationLogsResp?.logs ?? []}
          adminId={adminId}
        />
      )}
      <Pagination
        page={autoModerationLogsResp?.page ?? 0}
        pageCount={autoModerationLogsResp?.pageCount ?? 0}
      />
    </CommunityPage>
  )
}
