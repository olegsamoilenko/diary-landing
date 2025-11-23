export const getAllCommonNotifications = async (
  page: number,
  limit: number,
) => {
  try {
    const res = await fetch(
      `/api/common-notifications?page=${page}&limit=${limit}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      },
    )

    if (!res.ok) {
      throw new Error('Failed to fetch common notifications')
    }

    const data = await res.json()

    return data
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('fetch common notifications failed:', msg)
    return undefined
  }
}

export const deleteCommonNotification = async (id: number) => {
  try {
    await fetch(`/api/common-notifications/${id}`, {
      method: 'DELETE',
    })

    return true
  } catch (error) {
    console.error('Error delete common notification:', error)
  }
}
