import { Platforms } from './platforms'
import { AuthorProfile, Plan, Settings } from '@/types'

type BufferLike = { type: 'Buffer'; data: number[] }

type PlatformStr = Platforms

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
  goalsStats?: {
    id: number
    createdAt: string
  }[]

  entriesStatsCount?: number
  dialogsStatsCount?: number
  forumCommentsStats?: number
  forumTopicsStats?: number
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

export type SortBy = 'dialog' | 'entry' | 'createdAt' | 'lastActiveAt'
export type HasPlan = 'true' | 'false' | 'All'
