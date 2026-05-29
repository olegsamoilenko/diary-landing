import { apiFetch } from '@/lib/api/apiFetch'
import { GetAllUsersResp, HasPlan, PlanStatus, UserRole } from '@/types'
import type { User } from '@/types'

export const getUser = async (
  userId: number | null,
  email?: string,
  uuid?: string,
): Promise<User | null> => {
  console.log('userId', userId, 'email', email, 'uuid', uuid, 'get user')
  return apiFetch(`/api/users/get-one-by`, {
    method: 'POST',
    body: JSON.stringify({ userId, email, uuid }),
  })
}

export const getAll = async (
  page: number,
  limit: number,
  sortBy: string,
  hasPlan: HasPlan,
): Promise<GetAllUsersResp | null> => {
  console.log('sortBy', sortBy, 'sort by')
  return apiFetch(
    `/api/users/get-all?page=${page}&limit=${limit}&sortBy=${sortBy}&hasPlan=${hasPlan}`,
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
