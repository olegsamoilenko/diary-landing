import {
  ForumCategorySlug,
  ForumModerationReason,
  ForumModerationTargetType,
  ForumTopicType,
  ForumUserRestrictionType,
  TakeOptions,
  UserRole,
} from '@/types'

export const takeCommentsOptions = [
  {
    value: TakeOptions.ALL,
    label: 'All',
  },
  {
    value: TakeOptions.FIVE,
    label: 5,
  },
  {
    value: TakeOptions.TEN,
    label: 10,
  },
  {
    value: TakeOptions.TWENTY,
    label: 20,
  },
  {
    value: TakeOptions.FIFTY,
    label: 50,
  },
] as const

export const moderationRemoveReasonOptions = [
  {
    value: ForumModerationReason.SPAM,
    label: 'Spam',
  },
  {
    value: ForumModerationReason.HARASSMENT,
    label: 'Harassment',
  },
  {
    value: ForumModerationReason.HATE_SPEECH,
    label: 'Hate speech',
  },
  {
    value: ForumModerationReason.SEXUAL_CONTENT,
    label: 'Sexual content',
  },
  {
    value: ForumModerationReason.VIOLENCE,
    label: 'Violence',
  },
  {
    value: ForumModerationReason.SELF_HARM,
    label: 'Self-harm',
  },
  {
    value: ForumModerationReason.ILLEGAL_CONTENT,
    label: 'Illegal content',
  },
  {
    value: ForumModerationReason.PERSONAL_DATA,
    label: 'Personal data',
  },
  {
    value: ForumModerationReason.OFF_TOPIC,
    label: 'Off-topic',
  },
  {
    value: ForumModerationReason.OTHER,
    label: 'Other',
  },
] as const

export const moderationRestrictionTypeOptions = [
  {
    value: ForumUserRestrictionType.TEMPORARY_BAN,
    label: 'Temporary ban',
  },
  {
    value: ForumUserRestrictionType.PERMANENT_BAN,
    label: 'Permanent ban',
  },
  {
    value: ForumUserRestrictionType.READ_ONLY,
    label: 'Read only',
  },
]

export const moderationTargetTypeOptions = [
  {
    value: 'all',
    label: 'All',
  },
  {
    value: ForumModerationTargetType.TOPIC,
    label: 'Topic',
  },
  {
    value: ForumModerationTargetType.COMMENT,
    label: 'Comment',
  },
]

export const userRoleOptions = [
  {
    value: UserRole.NEMORY,
    label: 'Nemory',
  },
  {
    value: UserRole.FORUM_ADMIN,
    label: 'Admin',
  },
  {
    value: UserRole.FORUM_MODERATOR,
    label: 'Moderator',
  },
]

export const topicCategoryOptions = [
  {
    label: 'Self growth',
    value: ForumCategorySlug.SELF_GROWTH,
  },
  { label: 'Habits', value: ForumCategorySlug.HABITS },
  { label: 'Goals', value: ForumCategorySlug.GOALS },
  {
    label: 'Productivity',
    value: ForumCategorySlug.PRODUCTIVITY,
  },
  { label: 'Mindset', value: ForumCategorySlug.MINDSET },
  {
    label: 'Stress balance',
    value: ForumCategorySlug.STRESS_BALANCE,
  },
  {
    label: 'Journaling',
    value: ForumCategorySlug.JOURNALING,
  },
  {
    label: 'Motivation',
    value: ForumCategorySlug.MOTIVATION,
  },
  {
    label: 'Relationships',
    value: ForumCategorySlug.RELATIONSHIPS,
  },
]

export const topicTypeOptions = [
  {
    label: 'Discussion',
    value: ForumTopicType.DISCUSSION,
  },
  {
    label: 'Advice',
    value: ForumTopicType.ADVICE,
  },
  {
    label: 'Experience',
    value: ForumTopicType.EXPERIENCE,
  },
  {
    label: 'Progress',
    value: ForumTopicType.PROGRESS,
  },
  {
    label: 'Reflection',
    value: ForumTopicType.REFLECTION,
  },
  {
    label: 'Question',
    value: ForumTopicType.QUESTION,
  },
]
