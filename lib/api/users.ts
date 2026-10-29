import { apiFetch } from '@/lib/api/apiFetch'
import type { AdminUserGrowth, GrowthGranularity } from '@/types/adminGrowth'
import { GetAllUsersResp, HasPlan, PlanStatus, UserRole } from '@/types'
import type { User } from '@/types'
import type {
  NewUsersPageResult,
  NewUsersDay,
  AdminUserOverview,
} from '@/types/user'

export function getAdminUserOverview(signal?: AbortSignal) {
  return apiFetch<AdminUserOverview>('/api/users/admin-overview', {
    signal,
    toastOnError: false,
    cache: 'no-store',
  })
}

export function getAdminUserGrowth(
  from: string,
  to: string,
  granularity: GrowthGranularity,
  signal?: AbortSignal,
) {
  const params = new URLSearchParams({ from, to, granularity })
  return apiFetch<AdminUserGrowth>(`/api/users/admin-growth?${params}`, {
    signal,
    toastOnError: false,
    cache: 'no-store',
  })
}

export function getNewUsers(
  from: string,
  to: string,
  page: number,
  limit: number,
  signal?: AbortSignal,
) {
  const params = new URLSearchParams({
    from,
    to,
    page: String(page),
    limit: String(limit),
  })
  return apiFetch<NewUsersPageResult>(`/api/users/admin-new-users?${params}`, {
    signal,
    toastOnError: false,
  })
}

export function getNewUsersDays(
  from: string,
  to: string,
  signal?: AbortSignal,
) {
  const params = new URLSearchParams({ from, to })
  return apiFetch<{ days: NewUsersDay[]; timezone: string }>(
    `/api/users/admin-new-users/days?${params}`,
    { signal, toastOnError: false },
  )
}

export function getAdminUserDetails(id: number, signal?: AbortSignal) {
  return apiFetch<Record<string, unknown>>(`/api/users/admin-details/${id}`, {
    signal,
    toastOnError: false,
  })
}

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
