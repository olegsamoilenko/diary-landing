import { User } from '@/types/user'

export type ActivityRecords = {
  createdAt: string
  day: string
  dialogs: number
  entries: number
  goals: number
  comments: number
  topics: number
  id: number
  updatedAt: string
  user: User
  userId: number
}
