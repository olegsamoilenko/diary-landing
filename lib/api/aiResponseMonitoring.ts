import { apiFetch } from '@/lib/api/apiFetch'
import type {
  AiResponseMonitoringMode,
  AiResponseMonitoringRecordsResponse,
} from '@/types'

export const getAiResponseMonitoringRecords = async (params: {
  page: number
  limit: number
  mode?: AiResponseMonitoringMode
  isRead?: boolean
}): Promise<AiResponseMonitoringRecordsResponse> => {
  const searchParams = new URLSearchParams({
    page: String(params.page),
    limit: String(params.limit),
  })

  if (params.mode) searchParams.set('mode', params.mode)
  if (typeof params.isRead === 'boolean') {
    searchParams.set('isRead', String(params.isRead))
  }

  return apiFetch(`/api/ai-response-monitoring/records?${searchParams}`, {
    method: 'GET',
  })
}

export const markAiResponseMonitoringRecordAsRead = async (id: number) => {
  return apiFetch('/api/ai-response-monitoring/mark-as-read', {
    method: 'POST',
    body: JSON.stringify({ id }),
  })
}

export const deleteAiResponseMonitoringRecord = async (id: number) => {
  return apiFetch('/api/ai-response-monitoring/delete', {
    method: 'DELETE',
    body: JSON.stringify({ id }),
  })
}
