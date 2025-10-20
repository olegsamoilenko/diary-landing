import { SupportMessageStatus, SupportMessageCategory } from '@/types'

export const getSupportMessages = async ({
  category,
  status,
  messageId,
  email,
  userUuid,
  page,
  limit,
}: {
  category?: SupportMessageCategory
  status?: SupportMessageStatus
  messageId?: number
  email?: string
  userUuid?: string
  page: number
  limit: number
}) => {
  try {
    const params = new URLSearchParams()

    params.set('page', String(page))
    params.set('limit', String(limit))

    if (category) {
      params.set('category', category)
    }

    if (status) {
      params.set('status', status)
    }

    if (messageId) {
      params.set('messageId', String(messageId))
    }

    if (email) {
      params.set('email', email)
    }

    if (userUuid) {
      params.set('userUuid', userUuid)
    }

    const res = await fetch(`/api/support/get-messages?${params.toString()}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!res.ok) {
      throw new Error('Failed to fetch support messages')
    }

    const data = await res.json()
    console.log('getSupportMessages', data)
    return data
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('fetch support messages failed:', msg)
    return undefined
  }
}

export const updateSupportMessageStatus = async (
  id: number,
  status: SupportMessageStatus,
) => {
  try {
    const res = await fetch(`/api/support/update-status/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ status }),
    })

    if (!res.ok) {
      throw new Error('Failed to update support messages status')
    }

    const data = await res.json()
    console.log('updateSupportMessageStatus', data)
    return data
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('update support messages status failed:', msg)
    return undefined
  }
}
