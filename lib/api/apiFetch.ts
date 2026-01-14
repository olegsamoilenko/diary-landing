// lib/apiFetch.ts
import { ApiError, getErrorMessage } from '@/lib/errors'
import { notify } from '@/lib/utils/toast/notify'

type ApiFetchOptions = RequestInit & {
  toastOnError?: boolean
}

export async function apiFetch<T>(
  input: RequestInfo | URL,
  init?: ApiFetchOptions,
): Promise<T> {
  const toastOnError = init?.toastOnError ?? true

  try {
    const res = await fetch(input, {
      credentials: 'include',
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(init?.headers ?? {}),
      },
    })

    const text = await res.text()
    const data = text ? safeJsonParse(text) : null

    if (!res.ok) {
      console.error('Request failed:', data)
      const msg =
        (data && (data.message || data.error)) ||
        text ||
        `Request failed: ${res.status}`
      throw new ApiError(String(msg), {
        status: res.status,
        details: data ?? text,
      })
    }

    return (data as T) ?? (undefined as T)
  } catch (err) {
    if (toastOnError) notify.error(getErrorMessage(err))
    throw err
  }
}

function safeJsonParse(text: string): any {
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}
