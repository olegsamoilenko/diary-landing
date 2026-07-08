export type AiResponseMonitoringMode =
  | 'entry'
  | 'dialog'
  | 'checkin'
  | 'checkin_dialog'

export type AiResponseMonitoringMetrics = {
  energy: number | null
  focus: number | null
  stress: number | null
  motivation: number | null
  sleepQuality: number | null
}

export type AiResponseMonitoringRecord = {
  id: number
  mode: AiResponseMonitoringMode
  aiModel: string
  mood: string | null
  metricsJson: AiResponseMonitoringMetrics | null
  entryText: string
  responseText: string
  fullResponseText: string | null
  shortResponseText: string | null
  tagsJson: string[] | null
  isRead: boolean
  createdAt: string
}

export type AiResponseMonitoringRecordsResponse = {
  items: AiResponseMonitoringRecord[]
  total: number
  page: number
  limit: number
  pages: number
}
