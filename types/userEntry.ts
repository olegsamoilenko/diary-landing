import type { User } from './user'

type StatsByDate = {
  dialogs: number
  entries: number
}

type EntriesMap = Record<string, StatsByDate>

type ResponseItem = {
  entries: EntriesMap
  user: User
}

export type UserEntryResponse = ResponseItem[]
