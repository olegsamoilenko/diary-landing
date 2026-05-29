import { ForumModerationReason } from '@/types'
import { ForumReportStatus } from '@/types/reports'

export const getReports = async (params?: {
  page?: number
  limit?: number
  reportId?: string
}) => {
  try {
    const searchParams = new URLSearchParams()

    if (params?.page) {
      searchParams.set('page', String(params.page))
    }

    if (params?.limit) {
      searchParams.set('limit', String(params.limit))
    }

    if (params?.reportId?.trim()) {
      searchParams.set('reportId', params.reportId.trim())
    }

    const query = searchParams.toString()
    const url = query ? `/api/forum/reports?${query}` : '/api/forum/reports'

    const res = await fetch(url, {
      method: 'GET',
    })

    if (!res.ok) {
      throw new Error('Failed getReports')
    }

    const data = await res.json()

    return data
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('getReports failed:', msg)
    return undefined
  }
}

export const updateStatus = async (
  reportId: string,
  body: {
    status: ForumReportStatus
    adminId: number
  },
) => {
  try {
    const res = await fetch(`/api/forum/reports/${reportId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      throw new Error('Failed removeTopic')
    }

    const data = await res.json()

    return data
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('removeTopic failed:', msg)
    return undefined
  }
}
