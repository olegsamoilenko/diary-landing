import { FinancePeriod } from '@/types'

export const getCommonFinanceStats = async (
  period: FinancePeriod,
  periodsCount: number,
) => {
  try {
    const res = await fetch(
      `/api/finance-statistics/common?period=${period}&periodsCount=${periodsCount}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      },
    )

    if (!res.ok) {
      throw new Error('Failed to fetch common finance stats')
    }

    const data = await res.json()
    console.log('getCommonFinanceStats', data)
    return data
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('fetch finance stats failed:', msg)
    return undefined
  }
}
