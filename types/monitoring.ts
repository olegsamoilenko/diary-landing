import { UserRole } from '@/types/user'
import { Platforms } from '@/types/platforms'
import { Plan } from '@/types/plans'
import { Settings } from 'node:http2'

export enum MonitoringType {
  ALL = 'All',
  WARNING = 'Warning',
  ACTIVITY = 'Activity',
}

type BufferLike = { type: 'Buffer'; data: number[] }

export type UserMonitoringRes = {
  id: number
  type: MonitoringType
  description: string
  user: {
    id: number
    uuid: string

    name: string | null
    email: string | null
    role: UserRole

    platform: Platforms
    regionCode: string | null
    usesWithoutSubscription: boolean

    dekVersion: number | null
    dekEncrypted: BufferLike | null
    acquisitionMetaJson: string | null
    acquisitionSource: string | null

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

    payments: any[]
    goalsStats: []

    entriesStatsCount?: number
    dialogsStatsCount?: number
  }
}
