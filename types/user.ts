import { Platforms } from './platforms'
import type { Plan, Settings } from '@/types'

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

  dekVersion: number | null
  dekEncrypted: BufferLike | null

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

  hash: string
  password: string | null

  createdAt: string
  updatedAt: string
  lastActiveAt: string | null
  plans?: Plan[]
  plan?: Plan | null
  settings: Settings

  entriesStatsCount?: number
  dialogsStatsCount?: number
}

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  TESTER = 'tester',
}

export type GetAllUsersResp = {
  users: User[]
  total: number
  page: number
  pageCount: number
  limit: number
}

export type SortBy = 'dialog' | 'entry' | 'createdAt' | 'lastActiveAt'
