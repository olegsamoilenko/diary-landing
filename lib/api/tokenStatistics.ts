export const getTokenStatistics = async (page: number, limit: number) => {
  try {
    const res = await fetch(
      `/api/plan-statistics/tokens?page=${page}&limit=${limit}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      },
    )

    if (!res.ok) {
      throw new Error('Failed to fetch token statistics')
    }

    const data = await res.json()

    return data
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('fetch token statistics failed:', msg)
    return undefined
  }
}
