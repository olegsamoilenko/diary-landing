import type { User } from '@/types'
import { apiFetch } from '@/lib/api/apiFetch'
import { MonitoringType, UserMonitoringRes } from '@/types/monitoring'

export const getUserMonitoring = async (
  type: MonitoringType,
): Promise<UserMonitoringRes[] | []> => {
  return apiFetch(`/api/user-monitoring/get-all`, {
    method: 'POST',
    body: JSON.stringify({ type }),
  })
}

export const deleteUserMonitoring = async (id: number): Promise<void> => {
  return apiFetch(`/api/user-monitoring/delete`, {
    method: 'DELETE',
    body: JSON.stringify({ id }),
  })
}
