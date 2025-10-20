export enum SupportMessageCategory {
  QUESTION = 'QUESTION',
  BUG = 'BUG',
  IMPROVEMENT = 'IMPROVEMENT',
  REVIEW = 'REVIEW',
  OTHER = 'OTHER',
}

export enum SupportMessageStatus {
  NEW = 'NEW',
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
}

export type SupportMessage = {
  id: number
  email: string
  title: string
  text: string
  category: SupportMessageCategory
  status: SupportMessageStatus
  createdAt: string
  updatedAt: string
  closedAt: string | null
  user: {
    id: string
    uuid: string
    name: string | null
    email: string | null
  }
}
