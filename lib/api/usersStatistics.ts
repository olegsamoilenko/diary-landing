import type { Granularity } from '@/types'

export const getUsersStatistics = async () => {
  try {
    const res = await fetch('/api/statistics/get-user-count', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!res.ok) {
      throw new Error('Failed to fetch users')
    }

    const data = await res.json()
    console.log('res', data)
    return data
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('fetch users failed:', msg)
    return undefined
  }
}

export const getNewUsers = async (
  startDate: Date | string,
  endDate: Date | string,
  granularity: Granularity,
) => {
  try {
    const res = await fetch('/api/statistics/get-new-users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ startDate, endDate, granularity }),
    })

    if (!res.ok) {
      throw new Error('Failed to fetch users By Dates')
    }

    const data = await res.json()
    console.log('getNewUsers', data)
    return data
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('fetch new users failed:', msg)
    return undefined
  }
}

export const getNewPaidUsers = async (
  startDate: Date | string,
  endDate: Date | string,
  granularity: Granularity,
) => {
  try {
    const res = await fetch('/api/statistics/get-new-paid-users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ startDate, endDate, granularity }),
    })

    if (!res.ok) {
      throw new Error('Failed to fetch users By Dates')
    }

    const data = await res.json()
    console.log('getNewPaidUsers', data)
    return data
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('fetch paid users failed:', msg)
    return undefined
  }
}

export const getTotalPaidUsers = async () => {
  try {
    const res = await fetch('/api/statistics/get-total-paid-users', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!res.ok) {
      throw new Error('Failed to fetch get total paid users')
    }

    const data = await res.json()
    console.log('getTotalPaidUsers', data)
    return data
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('fetch total paid users failed:', msg)
    return undefined
  }
}

export const getPaidUsersByPlan = async () => {
  try {
    const res = await fetch('/api/statistics/get-paid-users-by-plan', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!res.ok) {
      throw new Error('Failed to fetch get paid users by plan')
    }

    const data = await res.json()
    console.log('getPaidUsersByPlan', data)
    return data
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('fetch paid users by plan failed:', msg)
    return undefined
  }
}

export const getTotalEntries = async () => {
  try {
    const res = await fetch('/api/statistics/get-total-entries', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!res.ok) {
      throw new Error('Failed to fetch total entries')
    }

    const data = await res.json()
    console.log('getTotalEntries', data)
    return data
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('fetch total entries failed:', msg)
    return undefined
  }
}

export const getTotalDialogs = async () => {
  try {
    const res = await fetch('/api/statistics/get-total-dialogs', {
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

export const getNewEntriesAndDialogsByDate = async (
  startDate: Date | string,
  endDate: Date | string,
  granularity: Granularity,
) => {
  try {
    const res = await fetch('/api/statistics/get-new-entries-and-dialogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ startDate, endDate, granularity }),
    })

    if (!res.ok) {
      throw new Error('Failed to fetch entries and dialogs By Dates')
    }

    const data = await res.json()
    console.log('getNewEntriesAndDialogsByDate', data)
    return data
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('fetch entries and dialogs failed:', msg)
    return undefined
  }
}

export const getUsersActivityByDates = async (
  startDate: Date | string,
  endDate: Date | string,
  granularity: Granularity,
  paidType?: 'paid' | 'not-paid',
) => {
  try {
    const res = await fetch('/api/statistics/get-users-activity-by-dates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ startDate, endDate, granularity, paidType }),
    })

    if (!res.ok) {
      throw new Error('Failed to fetch user activity By Dates')
    }

    const data = await res.json()
    console.log('getUsersActivityByDates', data)
    return data
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('fetch user activity failed:', msg)
    return undefined
  }
}
