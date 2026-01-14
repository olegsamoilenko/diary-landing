import { Platforms } from './index'

export type ReleaseNotificationTranslation = {
  id: string
  noteId: number
  locale: string
  html: string
  docJson: string
  createdAt: string
}

export type ReleaseNotification = {
  id: string
  defaultLocale: string
  platform: Platforms
  build: number
  isUrgent: boolean
  translations: ReleaseNotificationTranslation[]
  createdAt: string
}

export type ReleaseNotificationsResponse = {
  notifications: ReleaseNotification[]
  total: number
  page: number
  pageCount: number
  limit: number
}
