import {
  AuthorProfile,
  Comment,
  ForumModerationReason,
  Topic,
} from '@/types/community'
import { User } from '@/types/user'
import { ForumModerationTargetType } from '@/types/moderation'

export type ReportsResp = {
  hasMore: boolean
  limit: number
  page: number
  pageCount: number
  total: number
  items: Report[]
}

export type Report = {
  comment: Comment | null
  createdAt: string | Date
  details: string | null
  id: string
  reason: ForumModerationReason
  reporter: User
  reporterId: number
  reporterProfile: AuthorProfile
  reviewedAt: string | Date | null
  reviewedBy: number | null
  status: ForumReportStatus
  targetId: string
  targetType: ForumModerationTargetType
  topic: Topic | null
}

export enum ForumReportStatus {
  PENDING = 'pending',
  REVIEWED = 'reviewed',
  DISMISSED = 'dismissed',
  ACTION_TAKEN = 'action_taken',
}
