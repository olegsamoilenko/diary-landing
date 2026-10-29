import type { GrowthGranularity } from './adminGrowth'

export type FinanceSummary = {
  count: number
  grossUsd: number
  netUsd: number | null
  retainedPercent: number | null
  estimatedCount: number
  missingAmountCount: number
  netKnownCount: number
  netEstimatedCount: number
}
export type AdminFinance = {
  from: string
  to: string
  granularity: GrowthGranularity
  includeTest: boolean
  calculatedAt: string
  totals: FinanceSummary
  estimatedDates: number
  products: (FinanceSummary & {
    id: string
    name: string
    kind: 'subscription' | 'credits'
  })[]
  points: {
    date: string
    from: string
    to: string
    counts: Record<string, number>
    amounts: Record<string, number>
  }[]
  coverage: {
    excludedTests: number
    unresolvedOrders: number
    excludedRefunds: number
    unmapped: number
  }
  notes: string[]
}
