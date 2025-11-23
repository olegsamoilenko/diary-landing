export enum LogsLevel {
  ALL = 'all',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  WARN_ERROR = 'warn_error',
}

export type Log = {
  appData: {
    appVersion: string
    appBuild: number
  }
  created_at: string
  level: LogsLevel
  data: any
  device: {
    locale: string
    model: string
    os: string
    osVersion: string
  }
  id: string
  ip: string
  kind: string
  name: string
  requestId: string
  sessionId: string
  source: string
  ts: string
  ua: string
  userId: string
  userUuid: string
}
