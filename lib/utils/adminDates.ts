export const adminTimezone = 'Europe/Kyiv'

export function dateInputValue(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

export function defaultRegistrationPeriod(now = new Date()) {
  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: adminTimezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now)
  const to = new Date(`${today}T12:00:00`)
  const from = new Date(to)
  from.setDate(from.getDate() - 9)
  return { from, to }
}

export function formatAdminDate(value: string | null | undefined) {
  if (!value || !Number.isFinite(Date.parse(value))) return '—'
  return new Intl.DateTimeFormat('uk-UA', {
    timeZone: adminTimezone,
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(value))
}
