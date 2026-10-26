'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ActivityPlanType, ActivityRecords } from '@/types'
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
  type UserActivityDayStat,
} from '@/lib/api/usersStatistics'
import { getErrorMessage } from '@/lib/errors'
import TotalUserActivityStatChart from '@/components/admin/users-activity/TotalUserActivityStatChart'
import UsersActivityTable from '@/components/admin/users-activity/UsersActivityTable'

export default function AdminsClient() {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [activityType, setActivityType] = useState<ActivityPlanType>('all')
  const [activityCountByDayStats, setActivityCountByDayStats] = useState<
    UserActivityDayStat[]
  >([])
  const [activityRecords, setActivityRecords] = useState<ActivityRecords[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadStatistic = async () => {
    if (loading) return
    setError(null)
    if (!startDate || !endDate || startDate > endDate) {
      setError(
        'Select a start and end date. Start date must not be after end date.',
      )
      return
    }
    setLoading(true)
    setActivityCountByDayStats([])
    setActivityRecords([])
    try {
      const days = await getUsersActivityCountByDays(
        startDate,
        endDate,
        activityType,
      )
      const records = await getUsersActivityRecords(
        startDate,
        endDate,
        activityType,
      )
      if (!Array.isArray(days) || !Array.isArray(records)) {
        throw new Error('The server returned an invalid activity response.')
      }
      setActivityCountByDayStats(days)
      setActivityRecords(records)
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
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
        <Button onClick={loadStatistic} disabled={loading}>
          {loading ? 'Loading…' : 'Show'}
        </Button>
      </div>
      {error && (
        <p role="alert" className="mb-4 text-sm text-red-600">
          {error}
        </p>
      )}
      <div className="mb-8">
        <h3 className="mb-4 text-xl font-semibold">Users Activity</h3>
        <TotalUserActivityStatChart
          data={activityCountByDayStats}
          barName="Users activity"
        />
      </div>
      <div className="mb-8">
        <UsersActivityTable activityRecords={activityRecords} />
      </div>
    </>
  )
}
