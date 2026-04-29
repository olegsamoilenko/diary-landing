'use client'

import React, { useEffect, useState, use } from 'react'
import { Button } from '@/components/ui/button'
import {
  GetAllUsersResp,
  User,
  ActivityPlanType,
  ActivityRecords,
} from '@/types'
import AllUsersTable from '@/components/admin/admins/AllUsersTable'
import Pagination from '@/components/ui/pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DatePicker } from '@/components/ui/DatePicker'
import { userActivityTypeOptions } from '@/lib/constants/userActivityType'
import {
  getUsersActivityCountByDays,
  getUsersActivityRecords,
} from '@/lib/api/usersStatistics'
import TotalStatChart from '@/components/admin/users/TotalStatChart'
import TotalUserActivityStatChart from '@/components/admin/users-activity/TotalUserActivityStatChart'
import UsersActivityTable from '@/components/admin/users-activity/UsersActivityTable'

type SP = { page?: string }

export default function AdminsClient({
  searchParams,
}: {
  searchParams?: Promise<SP>
}) {
  const spPromise: Promise<SP> = searchParams ?? Promise.resolve({})
  const sp = use(spPromise)
  const [fetchUsersRes, setFetchUsersRes] = useState<GetAllUsersResp | null>(
    null,
  )
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [activityType, setActivityType] = useState<ActivityPlanType>('inTrial')
  const [activityCountByDayStats, setActivityCountByDayStats] = useState<
    | {
        date: string
        usersStat: number
      }[]
    | null
  >(null)
  const [activityRecords, setActivityRecords] = useState<
    ActivityRecords[] | null
  >(null)

  const loadStatistic = async () => {
    const activityCountByDayStatsRes = await getUsersActivityCountByDays(
      startDate,
      endDate,
      activityType,
    )
    setActivityCountByDayStats(activityCountByDayStatsRes)
    const setActivityRecordsRes = await getUsersActivityRecords(
      startDate,
      endDate,
      activityType,
    )
    setActivityRecords(setActivityRecordsRes)
  }

  return (
    <>
      <h1 className="mb-4 text-xl font-semibold">Users Activity</h1>
      <div className="my-4 flex items-end gap-4">
        <DatePicker
          label={'Start date'}
          placeholder={'Start date'}
          date={startDate}
          setDateAction={setStartDate}
        />
        <DatePicker
          label={'End date'}
          placeholder={'End date'}
          date={endDate}
          setDateAction={setEndDate}
        />
        <div className="items-end">
          <Select
            value={activityType}
            onValueChange={(t) => {
              setActivityType(t as ActivityPlanType)
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              {userActivityTypeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={loadStatistic}>Show</Button>
      </div>
      <div className="mb-8">
        <h3 className="mb-4 text-xl font-semibold">Total Paid Users</h3>
        <TotalUserActivityStatChart
          data={activityCountByDayStats ? [...activityCountByDayStats] : []}
          barName="Users activity"
        />
      </div>
      <div className="mb-8">
        <UsersActivityTable
          activityRecords={activityRecords as ActivityRecords[]}
        />
        <Pagination
          page={fetchUsersRes?.page ?? 0}
          pageCount={fetchUsersRes?.pageCount ?? 0}
        />
      </div>
    </>
  )
}
