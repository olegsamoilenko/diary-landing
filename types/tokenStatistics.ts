import { BasePlanIds } from './plans'

export type TokenStatisticsResponse = {
  creditsStatistics: CreditStatistics[]
  meta: {
    total: number
    page: number
    pageCount: number
    limit: number
  }
}

export type CreditStatistics = {
  userName: string
  userEmail: string
  userUuid: string
  basePlanId: BasePlanIds
  inputUsedCredits: number
  outputUsedCredits: number
}

export enum TokenType {
  ENTRY = 'entry',
  DIALOG = 'dialog',
  EMBEDDING = 'embedding',
  USER_MEMORY = 'user_memory',
  ASSISTANT_MEMORY = 'assistant_memory',
}

export type TokenUsageItem = {
  userUuid: string
  userName: string
  userEmail?: string
  input: number
  output: number
  inputCredits: number
  outputCredits: number
  finishReason: string
}

export type TokenUsageStat = Record<TokenType, TokenUsageItem[]>

export type TokenUsageStatisticsResponse = {
  stat: TokenUsageStat
  meta: {
    total: number
    page: number
    pageCount: number
    limit: number
  }
}
