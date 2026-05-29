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
import ReportsTable from '@/components/admin/reports/ReportsTable'
import { getReports } from '@/lib/api/reports'
import { ReportsResp } from '@/types/reports'

type SP = { page?: string }

export default function ReportsClient({
  spPromise,
  adminId,
}: {
  spPromise: Promise<SP>
  adminId: number
}) {
  const sp = use(spPromise)
  const page = Number(sp.page ?? '1') || 1
  const limit = 20
  const [reportsResp, setReportsResp] = useState<ReportsResp | null>(null)
  const [reportId, setReportId] = useState<string>('')

  useEffect(() => {
    loadReports()
  }, [page])

  const loadReports = async () => {
    const res = await getReports({
      page,
      limit,
      reportId: reportId ?? undefined,
    })

    console.log('report resp', res)

    setReportsResp(res)
  }

  const fetchReports = async () => {
    await loadReports()
  }

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold">Reports</h1>
      <div className="mb-10 flex items-end gap-10">
        <div>
          <Label htmlFor="email" className="mb-2">
            Report ID
          </Label>
          <Input
            id="reportId"
            type="string"
            value={reportId}
            onChange={(e) => setReportId(e.target.value)}
            placeholder="ID"
          />
        </div>
        <Button
          onClick={async () => {
            await fetchReports()
          }}
        >
          Load
        </Button>
      </div>
      <ReportsTable
        reports={reportsResp?.items ?? []}
        adminId={adminId}
        onSuccessRemoveTopic={fetchReports}
        onSuccessRemoveComment={fetchReports}
        onSuccessUpdateStatus={fetchReports}
      />
      <Pagination
        page={reportsResp?.page ?? 0}
        pageCount={reportsResp?.pageCount ?? 0}
      />
    </div>
  )
}
