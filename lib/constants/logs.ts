import { LogsLevel } from '@/types'

export const logsLevelOptions = [
  {
    value: LogsLevel.ALL,
    label: 'All',
  },
  {
    value: LogsLevel.INFO,
    label: 'Info',
  },
  {
    value: LogsLevel.WARN,
    label: 'Warn',
  },
  {
    value: LogsLevel.ERROR,
    label: 'Error',
  },
] as const
