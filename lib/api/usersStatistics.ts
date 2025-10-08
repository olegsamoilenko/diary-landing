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
  } catch (error: unknown) {
    console.error('error', error)
    console.error('error response', error.response)
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
  } catch (error: unknown) {
    console.error('error', error)
    console.error('error response', error.response)
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
  } catch (error: unknown) {
    console.error('error', error)
    console.error('error response', error.response)
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
  } catch (error: unknown) {
    console.error('error', error)
    console.error('error response', error.response)
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
  } catch (error: unknown) {
    console.error('error', error)
    console.error('error response', error.response)
  }
}
