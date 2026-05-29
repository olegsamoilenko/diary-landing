import { ForumReportStatus } from '@/types/reports'

export const reportStatusOptions = [
  {
    value: ForumReportStatus.PENDING,
    label: 'Pending',
  },
  {
    value: ForumReportStatus.REVIEWED,
    label: 'Reviewed',
  },
  {
    value: ForumReportStatus.DISMISSED,
    label: 'Dismissed',
  },
  {
    value: ForumReportStatus.ACTION_TAKEN,
    label: 'Action Taken',
  },
]
