import { ForumModerationReason, TakeOptions } from '@/types'

export const removeTopic = async (
  topicId: string,
  body: {
    moderationRemovedByAdminId: number
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

export const restoreTopic = async (
  topicId: string,
  body: {
    moderationRestoredByAdminId: number
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
