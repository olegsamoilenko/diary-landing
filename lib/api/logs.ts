import { LogsLevel } from '@/types'

export const getLogs = async (
  startDate: Date | string,
  endDate: Date | string,
  level: LogsLevel,
  userId: number | undefined,
  userUuid: string | undefined,
  page: number,
  limit: number,
) => {
  try {
    const params = new URLSearchParams()

    const sd =
      startDate instanceof Date ? startDate.toISOString() : String(startDate)
    const ed = endDate instanceof Date ? endDate.toISOString() : String(endDate)

    params.set('startDate', sd)
    params.set('endDate', ed)
    params.set('level', String(level))
    params.set('page', String(page))
    params.set('limit', String(limit))
    params.set('userUuid', String(userUuid))

    if (typeof userId === 'number' && userId > 0) {
      params.set('userId', String(userId))
    }

    const res = await fetch(`/api/statistics/get-logs?${params.toString()}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!res.ok) {
      throw new Error('Failed to fetch logs')
    }

    const data = await res.json()
    console.log('getLogs', data)
    return data
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('fetch logs failed:', msg)
    return undefined
  }
}
