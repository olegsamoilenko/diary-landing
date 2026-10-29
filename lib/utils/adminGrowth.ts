import type { AdminUserGrowth } from '@/types/adminGrowth'

const mismatchMessage =
  'Дані графіка застаріли або неповні. Натисніть «Повторити», щоб завантажити актуальний розподіл за планами.'

export function getGrowthDataError(
  data: AdminUserGrowth,
  planIds: readonly string[],
): string {
  const isCount = (value: unknown): value is number =>
    Number.isSafeInteger(value) && Number(value) >= 0
  if (!data || !Array.isArray(data.points) || !data.totals)
    return mismatchMessage
  let users = 0
  let paid = 0
  for (const point of data.points) {
    if (
      !point ||
      !isCount(point.newUsers) ||
      !isCount(point.newPaidUsers) ||
      !point.paidByPlan ||
      typeof point.paidByPlan !== 'object' ||
      Array.isArray(point.paidByPlan)
    )
      return mismatchMessage
    const counts = planIds.map((id) => point.paidByPlan[id])
    if (
      !counts.every(isCount) ||
      counts.reduce((sum, count) => sum + count, 0) !== point.newPaidUsers
    )
      return mismatchMessage
    users += point.newUsers
    paid += point.newPaidUsers
  }
  return isCount(data.totals.newUsers) &&
    isCount(data.totals.newPaidUsers) &&
    users === data.totals.newUsers &&
    paid === data.totals.newPaidUsers
    ? ''
    : mismatchMessage
}
