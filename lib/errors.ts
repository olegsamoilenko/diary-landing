export class ApiError extends Error {
  status?: number
  code?: string
  details?: unknown

  constructor(
    message: string,
    opts?: { status?: number; code?: string; details?: unknown },
  ) {
    super(message)
    this.name = 'ApiError'
    this.status = opts?.status
    this.code = opts?.code
    this.details = opts?.details
  }
}

export function getErrorMessage(err: unknown): string {
  if (!err) return 'Unknown error'
  if (typeof err === 'string') return err
  if (err instanceof Error) return err.message || 'Error'

  const anyErr = err as any
  if (typeof anyErr?.message === 'string') return anyErr.message
  return 'Unknown error'
}
