import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { UserEntryResponse } from '@/types'
import React, { useEffect, useMemo, useState } from 'react'

export default function EntriesByUserTable() {
  const [usersEntries, setUsersEntries] = useState<UserEntryResponse[]>([])

  const getUsersEntriesForStatistics = async () => {
    try {
      const res = await fetch('/api/statistics/get-users-entries', {
        method: 'GET',
      })
      const data = await res.json()
      console.log('res', data)
      setUsersEntries(data)
    } catch (error) {
      console.error('Error fetching diary:', error)
    }
  }

  useEffect(() => {
    ;(async () => {
      await getUsersEntriesForStatistics()
    })()
  }, [])
  function lastNDates(n = 30, tz = 'Europe/Kyiv') {
    const fmt = new Intl.DateTimeFormat('uk-UA', {
      timeZone: tz,
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })

    const today = new Date()
    const out = []

    for (let i = 0; i < n; i++) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      out.push(fmt.format(d))
    }

    out.reverse()

    return out
  }

  const dates = useMemo(() => lastNDates(30), [])
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>UUID</TableHead>
          <TableHead>Email</TableHead>
          {dates.map((d) => (
            <TableHead key={d} className="text-right">
              {d}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {usersEntries &&
          usersEntries.map((raw: UserEntryResponse) => (
            <TableRow key={raw.user.id}>
              <TableCell className="font-medium">{raw.user.name}</TableCell>
              <TableCell>{raw.user.uuid}</TableCell>
              <TableCell>{raw.user.email || null}</TableCell>
              {dates.map((d) => {
                const cell = raw.entries?.[d]
                return (
                  <TableCell
                    key={`${raw.user.id ?? raw.user.uuid}-${d}`}
                    className="text-right"
                  >
                    <div
                      className={cell?.entries ? 'text-black' : 'text-gray-300'}
                    >
                      e: {cell?.entries ?? 0}
                    </div>
                    <div
                      className={cell?.dialogs ? 'text-black' : 'text-gray-300'}
                    >
                      d: {cell?.dialogs ?? 0}
                    </div>
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}
