export type ApiErrorBody = {
  statusCode?: number
  statusMessage?: string
  message?: string | string[]
  code?: string
  retryAfterSec?: number
  attemptsLeft?: number
}

export class HttpError extends Error {
  status: number
  code?: string
  statusMessage?: string
  retryAfterSec?: number
  attemptsLeft?: number

  constructor(status: number, body?: ApiErrorBody) {
    const msg =
      typeof body?.message === 'string'
        ? body.message
        : Array.isArray(body?.message)
          ? body!.message
              .filter((x): x is string => typeof x === 'string')
              .join('; ')
          : `HTTP ${status}`
    super(msg)
    this.name = 'HttpError'
    this.status = status
    this.code = body?.code
    this.statusMessage = body?.statusMessage
    this.retryAfterSec = body?.retryAfterSec
    this.attemptsLeft = body?.attemptsLeft
  }
}

export async function fetchJSON<T>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(input, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
    ...init,
  })

  if (res.ok) return (await res.json()) as T

  let body: ApiErrorBody | undefined
  try {
    body = (await res.json()) as ApiErrorBody
  } catch {
    /* тіло не JSON */
  }

  if (body && !body.retryAfterSec) {
    const ra = res.headers.get('retry-after')
    if (ra && /^\d+$/.test(ra)) body.retryAfterSec = parseInt(ra, 10)
  }

  throw new HttpError(res.status, body)
}
