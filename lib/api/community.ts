import {
  CreateSystemTopics,
  ForumModerationTargetType,
  TakeOptions,
} from '@/types'

export const getAllTopics = async (page: number, limit: number) => {
  try {
    const res = await fetch(
      `/api/admin/forum/topics?page=${page}&limit=${limit}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      },
    )

    if (!res.ok) {
      throw new Error('Failed to fetch topics')
    }

    const data = await res.json()

    console.log('getAllTopics data', data)

    return data
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('fetch topics failed:', msg)
    return undefined
  }
}

export const getCommentLocationInTopic = async (
  topicId: string,
  commentId: string,
  limit?: number,
) => {
  try {
    const res = await fetch(
      `/api/admin/forum/topics/${topicId}/comments/${commentId}/location`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      },
    )

    if (!res.ok) {
      throw new Error('Failed to getCommentLocationInTopic')
    }

    const data = await res.json()

    console.log('location', data)

    return data
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('fetch getCommentLocationInTopic failed:', msg)
    return undefined
  }
}

export const getComments = async (
  topicId: string,
  body: { page: number; limit: number; take: TakeOptions },
) => {
  try {
    const res = await fetch(`/api/admin/forum/topics/${topicId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      throw new Error('Failed to fetch comments')
    }

    const data = await res.json()

    console.log('comments', data)

    return data
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('fetch comments failed:', msg)
    return undefined
  }
}

export const createSystemTopics = async (data: CreateSystemTopics) => {
  try {
    const res = await fetch(`/api/admin/forum/topics/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      throw new Error('Failed to createSystemTopics')
    }

    const resData = await res.json()

    console.log('comments', resData)

    return resData
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('createSystemTopics failed:', msg)
    return undefined
  }
}

export const getUserByRole = async (role: string) => {
  try {
    const res = await fetch(`/api/admin/forum/users/${role}/get`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!res.ok) {
      throw new Error('Failed to fetch getUserByRole')
    }

    const data = await res.json()

    console.log('getUserByRole', data)

    return data
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('fetch getUserByRole failed:', msg)
    return undefined
  }
}

export const createComment = async (
  topicId: string,
  body: {
    userId: number
    adminId: number
    content: string
    parentCommentId?: string
    replyToCommentId?: string
  },
) => {
  try {
    const res = await fetch(
      `/api/admin/forum/topics/${topicId}/create-comment`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      },
    )

    if (!res.ok) {
      throw new Error('Failed create comment')
    }

    const data = await res.json()

    console.log('create comment', data)

    return data
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('create comment failed:', msg)
    return undefined
  }
}

export const getModerationUserLogs = async (
  userId: number,
  body: { page: number; limit: number },
) => {
  try {
    const res = await fetch(
      `/api/admin/forum/users/${userId}/moderation-logs?page=${body.page}&limit=${body.limit}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      },
    )

    if (!res.ok) {
      throw new Error('Failed to fetch getModerationUserLogs')
    }

    const data = await res.json()

    console.log('getModerationUserLogs', data)

    return data
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('fetch getModerationUserLogs failed:', msg)
    return undefined
  }
}

export const getUserRestriction = async (userId: number) => {
  try {
    const res = await fetch(
      `/api/forum/user-restrictions/${userId}/get-active-restriction`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      },
    )

    if (!res.ok) {
      throw new Error('Failed to fetch getUserRestriction')
    }

    const data = await res.json()

    console.log('getUserRestriction', data)

    return data
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('fetch getUserRestriction failed:', msg)
    return undefined
  }
}

export const getModerationTarget = async (
  targetType: ForumModerationTargetType,
  targetId: string,
) => {
  try {
    const res = await fetch(
      `/api/admin/forum/moderation-target/${targetType}/${targetId}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      },
    )

    if (!res.ok) {
      throw new Error('Failed to fetch getModerationTarget')
    }

    const data = await res.json()

    console.log('getModerationTarget', data)

    return data
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('fetch getModerationTarget failed:', msg)
    return undefined
  }
}
