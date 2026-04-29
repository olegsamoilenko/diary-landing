import { User } from '@/types/user'

export type ActivityRecords = {
  createdAt: string
  day: string
  dialogs: number
  entries: number
  id: number
  updatedAt: string
  user: User
  userId: number
}
