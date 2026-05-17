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
