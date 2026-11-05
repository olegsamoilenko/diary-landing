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
import ReportsTable from '@/components/admin/reports/ReportsTable'
import { getReports } from '@/lib/api/reports'
import { ReportsResp } from '@/types/reports'

type SP = { page?: string }

export default function ReportsClient({
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
  const [appliedReportId, setAppliedReportId] = useState('')
  const sp = use(spPromise)
  const page = Number(sp.page ?? '1') || 1
  const limit = 20
  const requestId = useRef(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reportsResp, setReportsResp] = useState<ReportsResp | null>(null)
  const [reportId, setReportId] = useState<string>('')

  const loadReports = useCallback(async () => {
    const request = ++requestId.current
    setLoading(true)
    setError(null)
    const res = await getReports({
      page,
      limit,
      reportId: appliedReportId || undefined,
    })

    if (request !== requestId.current) return
    if (!res) {
      setError('Не вдалося завантажити дані. Спробуйте ще раз.')
    } else {
      setReportsResp(res)
    }
    setLoading(false)
  }, [page, appliedReportId])

  useEffect(() => {
    void loadReports()
  }, [loadReports])

  const fetchReports = async () => {
    await loadReports()
  }

  return (
    <CommunityPage
      variant={variant}
      title="Скарги"
      description="Скарги користувачів, їхній статус і рішення модератора."
    >
      {variant === 'classic' && (
        <h1 className="mb-4 text-xl font-semibold">Reports</h1>
      )}
      <div className="community-toolbar mb-6 flex flex-wrap items-end gap-4">
        <div>
          <Label htmlFor="reportId" className="mb-2">
            ID скарги
          </Label>
          <Input
            id="reportId"
            type="text"
            value={reportId}
            onChange={(e) => setReportId(e.target.value)}
            placeholder="ID"
          />
        </div>
        <Button
          disabled={loading}
          onClick={async () => {
            if (page !== 1) router.replace(pathname + '?page=1')
            setAppliedReportId(reportId.trim())
            if (page === 1 && reportId.trim() === appliedReportId)
              await fetchReports()
          }}
        >
          Показати
        </Button>
      </div>
      <CommunityLoadState
        loading={loading}
        error={error}
        empty={!reportsResp?.items.length}
        onRetry={loadReports}
      />
      {!loading && !error && (
        <ReportsTable
          key={page}
          reports={reportsResp?.items ?? []}
          adminId={adminId}
          onSuccessRemoveTopic={fetchReports}
          onSuccessRemoveComment={fetchReports}
          onSuccessUpdateStatus={fetchReports}
        />
      )}
      <Pagination
        page={reportsResp?.page ?? 0}
        pageCount={reportsResp?.pageCount ?? 0}
      />
    </CommunityPage>
  )
}
