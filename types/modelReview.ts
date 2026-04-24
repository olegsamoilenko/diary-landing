export type ModelReview = {
  id: number
  userId: number
  type: 'comment' | 'dialog'
  isHelpful: boolean
  unhelpfulAnswerDescriptions?: string[]
  unhelpfulComment?: string
  improvementComment?: string
  aiModel: string
  isRead: boolean
  createdAt: Date
}
