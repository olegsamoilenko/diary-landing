import type { Granularity } from '@/types'

export const getNewEntriesAndDialogsByDate = async (
  startDate: Date | string,
  endDate: Date | string,
  granularity: Granularity,
) => {
  try {
    const res = await fetch(
      '/api/diary-statistics/get-new-entries-and-dialogs',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ startDate, endDate, granularity }),
      },
    )

    if (!res.ok) {
      throw new Error('Failed to fetch diary and dialogs By Dates')
    }

    const data = await res.json()
    console.log('getNewEntriesAndDialogsByDate', data)
    return data
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('fetch diary and dialogs failed:', msg)
    return undefined
  }
}

export const getTotalEntries = async () => {
  try {
    const res = await fetch('/api/diary-statistics/get-total-entries-stat', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!res.ok) {
      throw new Error('Failed to fetch total diary')
    }

    const data = await res.json()
    console.log('getTotalEntries', data)
    return data
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('fetch total diary failed:', msg)
    return undefined
  }
}

export const getTotalDialogs = async () => {
  try {
    const res = await fetch('/api/diary-statistics/get-total-dialogs-stat', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!res.ok) {
      throw new Error('Failed to fetch total dialogs')
    }

    const data = await res.json()
    console.log('getTotalDialogs', data)
    return data
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('fetch total dialogs failed:', msg)
    return undefined
  }
}
