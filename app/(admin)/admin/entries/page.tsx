'use client'

import React, { useEffect, useState } from 'react'
import {
  getTotalEntries,
  getTotalDialogs,
  getNewEntriesAndDialogsByDate,
} from '@/lib/api/usersStatistics'
import TotalStatChart from '@/components/admin/users/TotalStatChart'
import EntriesByUserTable from '@/components/admin/entries/EntriesByUserTable'
import { DatePicker } from '@/components/ui/DatePicker'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Granularity } from '@/types'
import { granularityOptions } from '@/lib/constants/granularity'
import { Button } from '@/components/ui/button'
import NewEntriesAndDialogsChart from '@/components/admin/entries/NewEntriesAndDialogsChart'

export default function EntriesPage() {
  const [totalEntries, setTotalEntries] = useState<
    { day: string; count: number }[]
  >([])
  const [totalDialogs, setTotalDialogs] = useState<
    { day: string; count: number }[]
  >([])
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [granularity, setGranularity] = useState<Granularity>('day')
  const [errorGranularity, setErrorGranularity] = useState<string | null>(null)
  const [newEntriesAndDialogs, setNewEntriesAndDialogs] = useState<
    {
      date: string
      entries: number
      dialogs: number
    }[]
  >([])

  useEffect(() => {
    ;(async () => {
      await fetchTotalEntries()
      await fetchTotalDialogs()
    })()
  }, [])

  const fetchTotalEntries = async () => {
    try {
      const data = await getTotalEntries()
      setTotalEntries(data)
    } catch (error) {
      console.error('Error fetching total entries:', error)
    }
  }

  const fetchTotalDialogs = async () => {
    try {
      const data = await getTotalDialogs()
      setTotalDialogs(data)
    } catch (error) {
      console.error('Error fetching total dialogs:', error)
    }
  }

  const loadStatistic = async () => {
    if (!startDate || !endDate) return
    if (!granularity) {
      setErrorGranularity('Please select a granularity')
      return
    }
    try {
      const res = await getNewEntriesAndDialogsByDate(
        startDate,
        endDate,
        granularity,
      )
      setNewEntriesAndDialogs(res)
    } catch (error) {
      console.error('Error fetching new entries and dialogs:', error)
    }
  }

  return (
    <>
      <h1 className="mb-4 text-2xl font-semibold">Entries Statistics</h1>
      <div className="mb-8">
        <h3 className="mb-4 text-xl font-semibold">Total entries</h3>
        <TotalStatChart data={totalEntries} barName="Total entries" />
      </div>
      <div className="mb-8">
        <h3 className="mb-4 text-xl font-semibold">Total dialogs</h3>
        <TotalStatChart data={totalDialogs} barName="Total dialogs" />
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
        <h3 className="mb-4 text-xl font-semibold">New Entries And Dialogs</h3>
        <NewEntriesAndDialogsChart data={newEntriesAndDialogs} />
      </div>

      {/*<div className="mb-8">*/}
      {/*  <h3 className="mb-4 text-xl font-semibold">Entries by User</h3>*/}
      {/*  <EntriesByUserTable />*/}
      {/*</div>*/}
    </>
  )
}
