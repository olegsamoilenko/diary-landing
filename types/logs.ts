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

export type ServerLog = {
  meta: {
    from: string
  }
  created_at: string
  durationMs: number
  errorMessage: string
  errorName: string
  level: LogsLevel
  query: any
  device: {
    locale: string
    model: string
    os: string
    osVersion: string
  }
  id: string
  ip: string
  kind: string
  method: string
  referer: string
  requestId: string
  sessionId: string
  source: string
  ts: string
  ua: string
  userId: string
  userUuid: string
  stack: string[]
  status: number
  origin: string
  path: string
}
