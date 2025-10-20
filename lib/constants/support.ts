import { SupportMessageCategory, SupportMessageStatus } from '@/types'

export const categoryOptions = [
  {
    value: undefined,
    label: 'All',
  },
  {
    value: SupportMessageCategory.QUESTION,
    label: 'Question',
  },
  {
    value: SupportMessageCategory.BUG,
    label: 'Bug',
  },
  {
    value: SupportMessageCategory.IMPROVEMENT,
    label: 'Improvement',
  },
  {
    value: SupportMessageCategory.REVIEW,
    label: 'Review',
  },
  {
    value: SupportMessageCategory.OTHER,
    label: 'Other',
  },
] as const

export const statusOptions = [
  {
    value: undefined,
    label: 'All',
  },
  {
    value: SupportMessageStatus.NEW,
    label: 'New',
  },
  {
    value: SupportMessageStatus.PENDING,
    label: 'Pending',
  },
  {
    value: SupportMessageStatus.IN_PROGRESS,
    label: 'In Progress',
  },
  {
    value: SupportMessageStatus.RESOLVED,
    label: 'Resolved',
  },
  {
    value: SupportMessageStatus.CLOSED,
    label: 'Closed',
  },
] as const
