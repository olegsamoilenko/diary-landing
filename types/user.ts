import { Platforms } from './platforms'
import { AuthorProfile, Plan, Settings } from '@/types'

type BufferLike = { type: 'Buffer'; data: number[] }

type PlatformStr = Platforms

export type PlannerCreatedCounts = Record<
  'goal' | 'habit' | 'checklist' | 'task' | 'event' | 'reminder' | 'note',
  number
>

export type User = {
  id: number
  uuid: string

  name: string | null
  email: string | null
  role: UserRole

  platform: PlatformStr
  regionCode: string | null
  usesWithoutSubscription: boolean

  dekVersion: number | null
  dekEncrypted: BufferLike | null
  acquisitionMetaJson: string | null
  acquisitionSource?: string | null

  emailVerified: boolean
  emailVerificationCode: string | null
  newEmail: string | null
  newEmailVerificationCode: string | null
  phoneVerificationCode: string | null
  deleteAccountVerificationCode: string | null
  passwordResetCode: string | null
  passwordChangeToken: string | null

  oauthProvider: string | null
  oauthProviderId: string | null

  isLogged: boolean
  isRegistered: boolean
  inactivityWarnedAt: string | null
  scheduledDeletionAt: string | null
  forumPublicProfile: AuthorProfile

  hash: string
  password: string | null

  createdAt: string
  updatedAt: string
  lastActiveAt: string
  plans?: Plan[]
  plan?: Plan | null
  settings: Settings

  entriesStats?: {
    id: number
    createdAt: string
  }[]
  dialogsStats?: {
    id: number
    createdAt: string
  }[]
  checkinsStats?: {
    id: number
    createdAt: string
  }[]
  checkinDialogsStats?: {
    id: number
    createdAt: string
  }[]
  goalsStats?: {
    id: number
    createdAt: string
  }[]

  entriesStatsCount?: number
  dialogsStatsCount?: number
  forumCommentsStats?: number
  forumTopicsStats?: number
  checkinDialogsStatsCount?: number
  checkinsStatsCount?: number
  entriesAnalysis?: AnalysisCounts
  checkinsAnalysis?: AnalysisCounts
  plannerCreatedCounts?: PlannerCreatedCounts
  goalsStatsCount?: number
}

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  TESTER = 'tester',

  NEMORY = 'nemory',
  FORUM_ADMIN = 'forum_admin',
  FORUM_MODERATOR = 'forum_moderator',
}

export type GetAllUsersResp = {
  users: User[]
  total: number
  page: number
  pageCount: number
  limit: number
}

export type AdminUserSummary = Pick<
  User,
  | 'id'
  | 'uuid'
  | 'name'
  | 'email'
  | 'regionCode'
  | 'createdAt'
  | 'lastActiveAt'
  | 'usesWithoutSubscription'
  | 'acquisitionMetaJson'
  | 'acquisitionSource'
  | 'plan'
  | 'entriesStatsCount'
  | 'dialogsStatsCount'
  | 'checkinsStatsCount'
  | 'entriesAnalysis'
  | 'checkinsAnalysis'
  | 'checkinDialogsStatsCount'
  | 'plannerCreatedCounts'
  | 'goalsStatsCount'
>

export type AnalysisCounts = {
  withAnalysis: number
  withoutAnalysis: number
  unknown: number
}

export type NewUsersPageResult = Omit<GetAllUsersResp, 'users'> & {
  users: AdminUserSummary[]
}
export type NewUsersDay = {
  date: string
  total: number
  withAction: number
  withoutAction: number
}

export type AdminUserOverview = {
  total: number
  trial: number
  purchasedCredits: number
  active: number
  subscribed: number
  subscriptions: { basePlanId: string; name: string; count: number }[]
  activePeriod: { from: string; to: string; days: number; timezone: string }
  calculatedAt: string
}

export type SortBy = 'dialog' | 'entry' | 'createdAt' | 'lastActiveAt'
export type HasPlan = 'true' | 'false' | 'All'
