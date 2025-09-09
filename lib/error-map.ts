import { HttpError } from './http'

export function mapErrorToMessage(e: unknown): string {
  if (e instanceof HttpError) {
    switch (e.code) {
      case 'EXPIRED_CODE':
        return 'Code expired.'
      case 'ATTEMPTS_EXCEEDED':
        return 'The number of attempts has been exceeded.'
      case 'INVALID_CODE':
        return 'The provided code is invalid or has expired.'
      default:
        return e.statusMessage || e.message || 'An error has occurred'
    }
  }
  if (e instanceof Error) return e.message
  if (typeof e === 'string') return e
  return 'An unknown error has occurred'
}
