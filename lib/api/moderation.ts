import {
  ForumModerationReason,
  ForumUserRestrictionType,
  TakeOptions,
} from '@/types'

export const removeTopic = async (
  topicId: string,
  body: {
    moderationRemovedByAdminId: number
    targetUserId: number
    moderationRemoveReason: ForumModerationReason
    moderationRemoveNote: string
  },
) => {
  try {
    const res = await fetch(`/api/forum/moderation/topics/${topicId}/remove`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      throw new Error('Failed removeTopic')
    }

    const data = await res.json()

    return data
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('removeTopic failed:', msg)
    return undefined
  }
}

export const deleteTopic = async (topicId: string) => {
  try {
    const res = await fetch(`/api/forum/moderation/topics/${topicId}/delete`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!res.ok) {
      throw new Error('Failed deleteTopic')
    }

    const data = await res.json()

    return data
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('deleteTopic failed:', msg)
    return undefined
  }
}

export const restoreTopic = async (
  topicId: string,
  body: {
    moderationRestoredByAdminId: number
    targetUserId: number
  },
) => {
  try {
    const res = await fetch(`/api/forum/moderation/topics/${topicId}/restore`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      throw new Error('Failed restoreTopic')
    }

    const data = await res.json()

    return data
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('restoreTopic failed:', msg)
    return undefined
  }
}

export const removeComment = async (
  commentId: string,
  body: {
    moderationRemovedByAdminId: number
    targetUserId: number
    moderationRemoveReason: ForumModerationReason
    moderationRemoveNote: string
  },
) => {
  try {
    const res = await fetch(
      `/api/forum/moderation/comments/${commentId}/remove`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      },
    )

    if (!res.ok) {
      throw new Error('Failed removeComment')
    }

    const data = await res.json()

    return data
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('removeComment failed:', msg)
    return undefined
  }
}

export const restoreComment = async (
  commentId: string,
  body: {
    moderationRestoredByAdminId: number
    targetUserId: number
  },
) => {
  try {
    const res = await fetch(
      `/api/forum/moderation/comments/${commentId}/restore`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      },
    )

    if (!res.ok) {
      throw new Error('Failed restoreComment')
    }

    const data = await res.json()

    return data
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('restoreComment failed:', msg)
    return undefined
  }
}

export const restrictUser = async (
  userId: number,
  body: {
    type: ForumUserRestrictionType
    reason: string
    violationCount: number
    createdByAdminId: number
    startsAt: Date | undefined
    endsAt?: Date | undefined
  },
) => {
  try {
    const res = await fetch(`/api/forum/user-restrictions/${userId}/restrict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      throw new Error('Failed restrictUser')
    }

    const data = await res.json()

    console.log('restrictUser', data)

    return data
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('restrictUser failed:', msg)
    return undefined
  }
}

export const unrestrictUser = async (
  userId: number,
  body: {
    createdByAdminId: number
  },
) => {
  try {
    const res = await fetch(
      `/api/forum/user-restrictions/${userId}/unrestrict`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      },
    )

    if (!res.ok) {
      console.log('res', res)
      throw new Error('Failed unrestrictUser')
    }

    const data = await res.json()

    console.log('unrestrictUserunrestrictUser', data)

    return data
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('unrestrictUser failed:', msg)
    return undefined
  }
}

export const getModerationCoast = async () => {
  try {
    const res = await fetch(`/api/forum-moderation/admin/ai-usage`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!res.ok) {
      throw new Error('Failed getModerationCoast')
    }

    const data = await res.json()

    return data
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('getModerationCoast failed:', msg)
    return undefined
  }
}

export const getModerationLogs = async (params: {
  page?: number
  limit?: number
  userId?: number
  targetType?: 'topic' | 'comment'
}) => {
  const searchParams = new URLSearchParams()

  searchParams.set('page', String(params.page ?? 1))
  searchParams.set('limit', String(params.limit ?? 20))

  if (params.userId) {
    searchParams.set('userId', String(params.userId))
  }

  if (params.targetType) {
    searchParams.set('targetType', params.targetType)
  }
  try {
    const res = await fetch(
      `/api/forum-moderation/admin/logs?${searchParams.toString()}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      },
    )

    if (!res.ok) {
      throw new Error('Failed getModerationLogs')
    }

    const data = await res.json()

    return data
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('getModerationLogs failed:', msg)
    return undefined
  }
}
