import type { User } from './user'

type StatsByDate = {
  dialogs: number
  entries: number
}

type EntriesMap = Record<string, StatsByDate>

export type UserEntryResponse = {
  entries: EntriesMap
  user: User
}
