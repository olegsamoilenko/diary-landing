import { ForumModerationReason, TakeOptions } from '@/types'

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
