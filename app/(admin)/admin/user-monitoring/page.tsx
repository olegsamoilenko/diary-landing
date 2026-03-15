'use client'

import React, { useEffect, useState, use } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { getAll, getUser } from '@/lib/api/users'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import ChangeRoleDialog from '@/components/admin/admins/ChangeRoleDialog'
import {
  GetAllUsersResp,
  Granularity,
  PlanStatus,
  User,
  SortBy,
  HasPlan,
  Limit,
} from '@/types'
import { getErrorMessage } from '@/lib/errors'
import ChangeStatusDialog from '@/components/admin/admins/ChangeStatusDialog'
import { JsonViewer } from '@/components/ui/JsonViewer'
import AllMonitoringUsersTable from '@/components/admin/user-monitoring/AllMonitoringUsersTable'
import Pagination from '@/components/ui/pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { UsersHavePlanOptions, UsersSortByOptions } from '@/lib/constants/users'
import { LimitOptions } from '@/lib/constants/pagination'
import { monitoringOptions } from '@/lib/constants/monitoring'
import { MonitoringType, UserMonitoringRes } from '@/types/monitoring'
import { getUserMonitoring } from '@/lib/api/monitoring'
import AddUserMonitoringDialog from '@/components/admin/user-monitoring/AddUserMonitoringDialog'

type SP = { page?: string }

export default function UserMonitoringPage({
  searchParams,
}: {
  searchParams?: Promise<SP>
}) {
  const spPromise: Promise<SP> = searchParams ?? Promise.resolve({})
  const sp = use(spPromise)
  const page = Number(sp.page ?? '1') || 1
  const [fetchUsersRes, setFetchUsersRes] = useState<GetAllUsersResp | null>(
    null,
  )
  const [monitoringType, setMonitoringType] = useState<MonitoringType>(
    MonitoringType.ALL,
  )
  const [userMonitoringRes, setUserMonitoringRes] = useState<
    UserMonitoringRes[] | []
  >([])

  useEffect(() => {
    fetchUserMonitoring()
  }, [page])

  const fetchUserMonitoring = async () => {
    try {
      const res = await getUserMonitoring(monitoringType)

      if (!res) {
        throw new Error('No response')
      }

      console.log('res', res)
      setUserMonitoringRes(res)
    } catch (err: unknown) {
      console.error('error', err)
    }
  }

  return (
    <>
      <h1 className="mb-4 text-xl font-semibold">Users</h1>
      <div className="mb-4">
        <AddUserMonitoringDialog onSuccess={fetchUserMonitoring} />
      </div>

      <div className="mb-4 flex items-end gap-4">
        <div className="items-end">
          <Label className="mb-2">Monitoring Type</Label>
          <Select
            value={monitoringType}
            onValueChange={async (m: MonitoringType) => {
              setMonitoringType(m as MonitoringType)
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              {monitoringOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Button onClick={fetchUserMonitoring}>Load</Button>
        </div>
      </div>
      <div className="mb-8">
        <AllMonitoringUsersTable
          monitoringRes={userMonitoringRes}
          onSuccessDelete={fetchUserMonitoring}
        />
        <Pagination
          page={fetchUsersRes?.page ?? 0}
          pageCount={fetchUsersRes?.pageCount ?? 0}
        />
      </div>
    </>
  )
}
