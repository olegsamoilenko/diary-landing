import { User } from '@/types/user'

export type Topic = {
  author: User
  authorId: number
  authorProfile: AuthorProfile
  category: Category
  categoryId: string
  commentsCount: number
  content: string
  createdAt: string | Date
  deletedAt: string | Date | null
  editedAt: string | Date | null
  id: string
  isEdited: boolean
  isFeatured: boolean
  isLocked: boolean
  isPinned: boolean
  lastActivityAt: string | Date
  lastCommentAuthorId: number
  lastCommentId: string
  likesCount: number
  reactionsCount: number
  reportsCount: number
  status: ForumContentStatus
  title: string
  type: ForumTopicType
  updatedAt: string | Date | null
  viewsCount: number
  visibility: ForumTopicVisibility
  watchersCount: number
}

export enum ForumTopicVisibility {
  PUBLIC = 'public',
  SUBSCRIBERS_ONLY = 'subscribers_only',
}

export enum ForumContentStatus {
  DRAFT = 'draft',
  PENDING_REVIEW = 'pending_review',
  PUBLISHED = 'published',
  HIDDEN = 'hidden',
  REMOVED = 'removed',
  REMOVED_BY_AUTHOR = 'removed_by_author',
  REMOVED_BY_MODERATOR = 'removed_by_moderator',
}

export enum ForumTopicType {
  QUESTION = 'question',
  DISCUSSION = 'discussion',
  EXPERIENCE = 'experience',
  REFLECTION = 'reflection',
  PROGRESS = 'progress',
  ADVICE = 'advice',
}

export type AuthorProfile = {
  allowDirectMessages: boolean
  avatarUrl: string
  banReason: string | null
  bio: string | null
  createdAt: string | Date
  displayName: string
  id: string
  isBanned: boolean
  isForumEnabled: boolean
  updatedAt: string | Date | null
  userId: number
  username: string
}

export type Category = {
  createdAt: string | Date
  description: string
  icon: string
  id: string
  isActive: boolean
  slug: ForumCategorySlug
  sortOrder: number
  title: string
  updatedAt: string | Date | null
}

export enum ForumCategorySlug {
  SELF_GROWTH = 'self_growth',
  HABITS = 'habits',
  GOALS = 'goals',
  PRODUCTIVITY = 'productivity',
  MINDSET = 'mindset',
  STRESS_BALANCE = 'stress_balance',
  JOURNALING = 'journaling',
  MOTIVATION = 'motivation',
  RELATIONSHIPS = 'relationships',
}

export type TopicsResponse = {
  items: Topic[]
  total: number
  page: number
  pageCount: number
  limit: number
}

export enum TakeOptions {
  ALL = 'all',
  FIVE = '5',
  TEN = '10',
  TWENTY = '20',
  FIFTY = '50',
}

export type Comment = {
  author: User
  authorId: number
  authorProfile: AuthorProfile
  content: string
  createdAt: string | Date
  deletedAt: string | Date | null
  editedAt: string | Date | null
  id: string
  isEdited: boolean
  isRemoved: boolean
  likesCount: number
  parentCommentId: string | null
  reactionsCount: number
  removedAt: string | Date | null
  replies: Comment[]
  replyToCommentId: string | null
  reportsCount: number
  status: ForumContentStatus
  topicId: string
  updatedAt: string | Date
}

export enum ForumModerationReason {
  SPAM = 'spam',
  HARASSMENT = 'harassment',
  HATE_SPEECH = 'hate_speech',
  SEXUAL_CONTENT = 'sexual_content',
  VIOLENCE = 'violence',
  SELF_HARM = 'self_harm',
  ILLEGAL_CONTENT = 'illegal_content',
  PERSONAL_DATA = 'personal_data',
  OFF_TOPIC = 'off_topic',
  OTHER = 'other',
}
