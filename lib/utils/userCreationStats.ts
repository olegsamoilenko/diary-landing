import type { PlannerCreatedCounts, User } from '@/types/user'

export const plannerCreationColumns: {
  type: keyof PlannerCreatedCounts
  label: string
  labelUk: string
}[] = [
  { type: 'goal', label: 'Goals', labelUk: 'Цілі' },
  { type: 'habit', label: 'Habits', labelUk: 'Звички' },
  { type: 'checklist', label: 'Checklists', labelUk: 'Чеклісти' },
  { type: 'task', label: 'Tasks', labelUk: 'Завдання' },
  { type: 'event', label: 'Events', labelUk: 'Події' },
  { type: 'reminder', label: 'Reminders', labelUk: 'Нагадування' },
  { type: 'note', label: 'Planner notes', labelUk: 'Нотатки' },
]

export function hasUserCreationActivity(user: User): boolean {
  return (
    Number(user.entriesStatsCount ?? 0) > 0 ||
    Number(user.dialogsStatsCount ?? 0) > 0 ||
    Number(user.checkinsStatsCount ?? 0) > 0 ||
    Number(user.checkinDialogsStatsCount ?? 0) > 0 ||
    plannerCreationColumns.some(
      ({ type }) => Number(user.plannerCreatedCounts?.[type] ?? 0) > 0,
    ) ||
    // Old goal rows still prove activity, but are not creation-history counts.
    Number(user.goalsStats?.length ?? 0) > 0
  )
}
