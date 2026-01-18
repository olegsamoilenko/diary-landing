import { apiFetch } from '@/lib/api/apiFetch'
import { GetAllUsersResp, PlanStatus, UserRole } from '@/types'
import type { User } from '@/types'

export const getUser = async (
  email?: string,
  uuid?: string,
): Promise<User | null> => {
  return apiFetch(`/api/users/get-one-by`, {
    method: 'POST',
    body: JSON.stringify({ email, uuid }),
  })
}

export const getAll = async (
  page: number,
  limit: number,
  sortBy: string,
): Promise<GetAllUsersResp | null> => {
  return apiFetch(
    `/api/users/get-all?page=${page}&limit=${limit}&sortBy=${sortBy}`,
    {
      method: 'GET',
    },
  )
}

export const changeUserRole = async (
  uuid: string,
  hash: string,
  role: UserRole,
) => {
  return apiFetch(`/api/users/change-user-role`, {
    method: 'POST',
    body: JSON.stringify({ uuid, hash, role }),
  })
}

export const changeUserPlanStatus = async (
  id: number,
  planStatus: PlanStatus,
) => {
  return apiFetch(`/api/plans/change-plan-status`, {
    method: 'POST',
    body: JSON.stringify({ id, planStatus }),
  })
}
