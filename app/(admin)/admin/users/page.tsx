'use client'

import React, { useEffect, useState } from 'react'

import StatisticBlock from '@/components/admin/users/StatisticBlock'
import { Granularity, Platforms, UserStatisticsData } from '@/types'
import {
  getUsersStatistics,
  getNewUsers,
  getNewPaidUsers,
  getTotalPaidUsers,
  getPaidUsersByPlan,
} from '@/lib/api/usersStatistics'
import dayjs from 'dayjs'
import { DatePicker } from '@/components/ui/DatePicker'
import { Button } from '@/components/ui/button'
import NewUsersBarChart from '@/components/admin/users/NewUsersChart'
import NewPaidUsersBarChart from '@/components/admin/users/NewPaidUsersChart'
import TotalPaidUsersChart from '@/components/admin/users/TotalPaidUsersChart'
import TotalPaidUsersByPlanChart from '@/components/admin/users/TotalPaidUsersByPlanChart'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { granularityOptions } from '@/lib/constants/granularity'
import { string } from 'yup'

export default function UsersPage() {
  const [userStatisticsData, setUserStatisticsData] =
    useState<UserStatisticsData | null>(null)
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [newUsers, setNewUsers] = useState<{ date: string; count: number }[]>(
    [],
  )
  const [totalPaidUsers, setTotalPaidUsers] = useState<
    { day: string; count: number }[]
  >([])
  const [totalPaidUsersByPlan, setTotalPaidUsersByPlan] = useState<
    {
      day: string
      lite: number
      base: number
      pro: number
    }[]
  >([])
  const [granularity, setGranularity] = useState<Granularity>('day')
  const [errorGranularity, setErrorGranularity] = useState<string | null>(null)
  const [newPaidUsers, setNewPaidUsers] = useState<
    { date: string; lite: number; base: number; pro: number }[]
  >([])

  useEffect(() => {
    fetchGetUsersStatistics()
    fetchTotalPaidUsers()
    fetchTotalPaidUsersByPlan()
  }, [])

  const fetchGetUsersStatistics = async () => {
    try {
      const data = await getUsersStatistics()
      setUserStatisticsData(data)
    } catch (error) {
      console.error('Error fetching user statistics:', error)
    }
  }

  const fetchTotalPaidUsers = async () => {
    try {
      const data = await getTotalPaidUsers()
      setTotalPaidUsers(data)
    } catch (error) {
      console.error('Error fetching total paid users:', error)
    }
  }

  const fetchTotalPaidUsersByPlan = async () => {
    try {
      const data = await getPaidUsersByPlan()
      setTotalPaidUsersByPlan(data)
    } catch (error) {
      console.error('Error fetching paid users by plan:', error)
    }
  }

  const loadStatistic = async () => {
    if (!startDate || !endDate) return
    if (!granularity) {
      setErrorGranularity('Please select a granularity')
      return
    }
    const newUsersRes = await getNewUsers(startDate, endDate, granularity)
    setNewUsers(newUsersRes)

    const newPaidUsersRes = await getNewPaidUsers(
      startDate,
      endDate,
      granularity,
    )
    setNewPaidUsers(newPaidUsersRes)
  }

  // function fillMissingDays(
  //   rows: { date: string; count: number }[],
  //   start: string,
  //   end: string,
  // ) {
  //   const map = new Map(rows.map((r) => [r.date, r.count]))
  //   const out: { date: string; count: number }[] = []
  //   let d = dayjs(start)
  //   const last = dayjs(end)
  //   while (d.isBefore(last) || d.isSame(last, 'day')) {
  //     const key = d.format('YYYY-MM-DD')
  //     out.push({ date: key, count: map.get(key) ?? 0 })
  //     d = d.add(1, 'day')
  //   }
  //   return out
  // }

  return (
    <>
      <h1 className="mb-4 text-2xl font-semibold">Users Statistics</h1>
      <div className="mb-8 flex gap-4">
        <StatisticBlock
          name="In Trial period"
          value={userStatisticsData?.inTrialUsers}
        />
        <StatisticBlock
          name="Past Trial period"
          value={userStatisticsData?.pastTrialUsers}
        />
        <StatisticBlock
          name="Lite users"
          value={userStatisticsData?.liteUsers}
        />
        <StatisticBlock
          name="Base users"
          value={userStatisticsData?.baseUsers}
        />
        <StatisticBlock name="Pro users" value={userStatisticsData?.proUsers} />
        <StatisticBlock
          name="Total paid users"
          value={userStatisticsData?.totalPaidUsers}
        />
        <StatisticBlock
          name="Not active users"
          value={userStatisticsData?.inactiveUsers}
        />
        <StatisticBlock
          name="Total users"
          value={userStatisticsData?.totalUsers}
        />
      </div>
      <div className="mb-8">
        <h3 className="mb-4 text-xl font-semibold">Total Paid Users</h3>
        <TotalPaidUsersChart data={totalPaidUsers} />
      </div>
      <div className="mb-8">
        <h3 className="mb-4 text-xl font-semibold">Total Paid Users by Plan</h3>
        <TotalPaidUsersByPlanChart data={totalPaidUsersByPlan} />
      </div>
      <div className="my-4 flex items-end gap-4">
        <DatePicker
          label={'Start date'}
          placeholder={'Start date'}
          date={startDate}
          setDate={setStartDate}
        />
        <DatePicker
          label={'End date'}
          placeholder={'End date'}
          date={endDate}
          setDate={setEndDate}
        />
        <div className="items-end">
          <Select
            value={granularity}
            onValueChange={(g) => {
              setGranularity(g as Granularity)
              setErrorGranularity(null)
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              {granularityOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errorGranularity && (
            <p className="mt-1 text-sm text-red-600">{errorGranularity}</p>
          )}
        </div>
        <Button onClick={loadStatistic}>Show</Button>
      </div>
      <div>
        <h3 className="mb-4 text-xl font-semibold">New Users</h3>
        <NewUsersBarChart data={newUsers} />
      </div>
      <div>
        <h3 className="mb-4 text-xl font-semibold">New Paid Users</h3>
        <NewPaidUsersBarChart data={newPaidUsers} />
      </div>
    </>
  )
}
