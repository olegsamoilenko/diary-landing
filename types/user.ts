import { Platforms } from './platforms'

type BufferLike = { type: 'Buffer'; data: number[] }

type PlatformStr = Platforms

export type User = {
  id: number
  uuid: string

  name: string | null
  email: string | null
  phone: string | null

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

  hash: string | null
  password: string | null

  createdAt: string
  updatedAt: string
  lastActiveAt: string | null
}
