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
  CHECKIN = 'checkin',
  DAILY_ANALYSIS = 'daily_analysis',
  WEEKLY_ANALYSIS = 'weekly_analysis',
  MONTHLY_ANALYSIS = 'monthly_analysis',
  YEARLY_ANALYSIS = 'yearly_analysis',
  DIALOG = 'dialog',
  CONVERSATION = 'conversation',
  ENTRY_DIALOG = 'entry_dialog',
  CHECKIN_DIALOG = 'checkin_dialog',
  DAILY_ANALYSIS_DIALOG = 'daily_analysis_dialog',
  WEEKLY_ANALYSIS_DIALOG = 'weekly_analysis_dialog',
  MONTHLY_ANALYSIS_DIALOG = 'monthly_analysis_dialog',
  YEARLY_ANALYSIS_DIALOG = 'yearly_analysis_dialog',
  PERIODIC_ANALYSIS_DIALOG = 'periodic_analysis_dialog',
  NEMORY_ACTIONS = 'nemory_actions',
  EMBEDDING = 'embedding',
  ENTRY_CAPSULE = 'entry_capsule',
  CHECKIN_CAPSULE = 'checkin_capsule',
  ENTRY_RESPONSE_CAPSULE = 'entry_response_capsule',
  CHECKIN_RESPONSE_CAPSULE = 'checkin_response_capsule',
  DIALOG_CAPSULE = 'dialog_capsule',
  DAILY_CAPSULE = 'daily_capsule',
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
