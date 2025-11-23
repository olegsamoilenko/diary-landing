export type CommonNotificationTranslation = {
  id: string
  noteId: number
  locale: string
  title: string
  html: string
  docJson: string
  createdAt: string
}

export type CommonNotification = {
  id: string
  defaultLocale: string
  translations: CommonNotificationTranslation[]
  createdAt: string
}

export type CommonNotificationsResponse = {
  notifications: CommonNotification[]
  total: number
  page: number
  pageCount: number
  limit: number
}
