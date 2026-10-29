export type GrowthGranularity = 'day' | 'week' | 'month' | 'quarter' | 'year'

export type AdminUserGrowth = {
  from: string
  to: string
  granularity: GrowthGranularity
  timezone: string
  points: {
    date: string
    from: string
    to: string
    newUsers: number
    newPaidUsers: number
    paidByPlan: Record<string, number>
  }[]
  totals: { newUsers: number; newPaidUsers: number }
}
