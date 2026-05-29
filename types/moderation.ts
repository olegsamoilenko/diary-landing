import { Admin, ForumModerationReason, User } from '@/types'

export type ModerationLog = {
  action: ForumModerationAction
  createdAt: string | Date
  id: string
  metadataJson: Record<string, string> | null
  moderator: Admin
  moderatorId: number
  note: string | null
  reason: ForumModerationReason
  targetId: string
  targetType: ForumModerationTargetType
  targetUser: User | null
  targetUserId: number | null
}

export enum ForumModerationAction {
  HIDE_TOPIC = 'hide_topic',
  REMOVE_TOPIC = 'remove_topic',
  RESTORE_TOPIC = 'restore_topic',
  LOCK_TOPIC = 'lock_topic',
  UNLOCK_TOPIC = 'unlock_topic',

  HIDE_COMMENT = 'hide_comment',
  REMOVE_COMMENT = 'remove_comment',
  RESTORE_COMMENT = 'restore_comment',

  BAN_USER = 'ban_user',
  UNBAN_USER = 'unban_user',

  DISMISS_REPORT = 'dismiss_report',
  RESOLVE_REPORT = 'resolve_report',
}

export enum ForumModerationTargetType {
  TOPIC = 'topic',
  COMMENT = 'comment',
  USER = 'user',
  REPORT = 'report',
  MESSAGE = 'message',
}

export enum ForumUserRestrictionType {
  TEMPORARY_BAN = 'temporary_ban',
  PERMANENT_BAN = 'permanent_ban',
  READ_ONLY = 'read_only',
}

export type Restriction = {
  createdAt: string | Date
  createdByAdmin: Admin
  createdByAdminId: number
  endsAt: string | Date | null
  id: string
  isActive: boolean
  liftedAt: string | Date | null
  liftedByAdminId: number | null
  reason: string
  startsAt: string | Date
  type: ForumUserRestrictionType
  updatedAt: string | Date
  user: User
  userId: number
  violationCount: number
}

export type ModerationCoast = {
  createdAt: string | Date
  estimatedCostUsd: string
  inputTokens: number
  llmReviewCalls: number
  moderationApiCalls: number
  monthKey: string
  outputTokens: number
  periodEnd: string | Date
  periodStart: string | Date
  totalTokens: number
  updatedAt: string | Date
}

export enum ForumModerationDecision {
  ALLOW = 'allow',
  NEEDS_LLM_REVIEW = 'needs_llm_review',
  BLOCK = 'block',
  ESCALATE_HUMAN = 'escalate_human',
}

export enum ForumModerationRuleCode {
  RATE_LIMIT_OR_DUPLICATE = 'rate_limit_or_duplicate',
  OPENAI_HARASSMENT = 'OPENAI_HARASSMENT',
  OPENAI_HARASSMENT_THREATENING = 'OPENAI_HARASSMENT_THREATENING',

  OPENAI_HATE = 'OPENAI_HATE',
  OPENAI_HATE_THREATENING = 'OPENAI_HATE_THREATENING',

  OPENAI_ILLICIT = 'OPENAI_ILLICIT',
  OPENAI_ILLICIT_VIOLENT = 'OPENAI_ILLICIT_VIOLENT',

  OPENAI_SELF_HARM = 'OPENAI_SELF_HARM',
  OPENAI_SELF_HARM_INTENT = 'OPENAI_SELF_HARM_INTENT',
  OPENAI_SELF_HARM_INSTRUCTIONS = 'OPENAI_SELF_HARM_INSTRUCTIONS',

  OPENAI_SEXUAL = 'OPENAI_SEXUAL',
  OPENAI_SEXUAL_MINORS = 'OPENAI_SEXUAL_MINORS',

  OPENAI_VIOLENCE = 'OPENAI_VIOLENCE',
  OPENAI_VIOLENCE_GRAPHIC = 'OPENAI_VIOLENCE_GRAPHIC',

  OPENAI_MODERATION_FLAGGED = 'OPENAI_MODERATION_FLAGGED',

  LLM_MODERATION_BLOCK = 'LLM_MODERATION_BLOCK',
  TOO_MANY_LINKS = 'too_many_links',
  DUPLICATE_CONTENT = 'duplicate_content',
  REPEATED_CHARACTERS = 'repeated_characters',
  SUSPICIOUS_PROMOTION = 'suspicious_promotion',
  AGGRESSIVE_LANGUAGE = 'aggressive_language',
  TOO_SHORT = 'too_short',
  TOO_LONG = 'too_long',
  UNKNOWN = 'unknown',
}

export enum ForumModerationStage {
  BASELINE_RISK_CHECK = 'baseline_risk_check',
  OPENAI_MODERATION_API = 'openai_moderation_api',
  LLM_RULES_MODERATION = 'llm_rules_moderation',
}

export type forumAutoModerationLog = {
  adminNote: string | null
  adminReviewStatus: 'false_positive' | 'valid_block' | 'ignored' | null
  adminReviewedAt: string | Date | null
  adminReviewedById: number | null
  contentHash: string | null
  contentText: string
  createdAt: string | Date
  decision: ForumModerationDecision
  id: string
  metadataJson: Record<string, never> | null
  reason: string | null
  riskScore: number
  ruleCode: ForumModerationRuleCode | null
  signalsJson: string[] | null
  stage: ForumModerationStage
  targetId: string | null
  targetType: ForumModerationTargetType
  titleText: string | null
  userId: number
  user: {
    email: string
    id: number
    uuid: string
    settings: {
      id: number
      lang: string
    }
  }
}

export type ForumAutoModerationLogsResp = {
  limit: number
  logs: forumAutoModerationLog[]
  page: number
  pageCount: number
  total: number
}
