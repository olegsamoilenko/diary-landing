import { Platforms } from '@/types'

export const getAllReleaseNotificationsByPlatform = async (
  platform: Platforms,
  page: number,
  limit: number,
) => {
  try {
    const res = await fetch(
      `/api/release-notifications?platform=${platform}&page=${page}&limit=${limit}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      },
    )

    if (!res.ok) {
      throw new Error('Failed to fetch release notifications')
    }

    const data = await res.json()
    console.log('getAllReleaseNotificationsByPlatform', data)
    return data
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('fetch release notifications failed:', msg)
    return undefined
  }
}
