import { BasePlanIds } from './plans'

export type TokenStatisticsResponse = {
  tokenStatistics: TokenStatistics[]
  coastStatistics: CoastStatistics[]
  meta: {
    total: number
    page: number
    pageCount: number
    limit: number
  }
}

export type TokenStatistics = {
  userName: string
  userEmail: string
  userUuid: string
  basePlanId: BasePlanIds
  inputUsedTokens: number
  outputUsedTokens: number
}

export type CoastStatistics = {
  userName: string
  userEmail: string
  userUuid: string
  basePlanId: BasePlanIds
  inputUsedTokensCoast: number
  outputUsedTokensCoast: number
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
  inputCoast: number
  outputCoast: number
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
