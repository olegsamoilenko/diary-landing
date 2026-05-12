import { TakeOptions } from '@/types'

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

    console.log('data', data)

    return data
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('fetch topics failed:', msg)
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
