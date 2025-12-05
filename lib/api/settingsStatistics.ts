export const getThemeStatistics = async () => {
  try {
    const res = await fetch('/api/user-settings/theme-statistics', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!res.ok) {
      throw new Error('Failed to fetch theme statistics')
    }

    const data = await res.json()
    console.log('res', data)
    return data
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('fetch theme statistics failed:', msg)
    return undefined
  }
}

export const getFontStatistics = async () => {
  try {
    const res = await fetch('/api/user-settings/font-statistics', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!res.ok) {
      throw new Error('Failed to fetch theme statistics')
    }

    const data = await res.json()
    console.log('res', data)
    return data
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('fetch theme statistics failed:', msg)
    return undefined
  }
}

export const getAppBuildStatistics = async () => {
  try {
    const res = await fetch('/api/user-settings/app-build-statistics', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!res.ok) {
      throw new Error('Failed to fetch app build statistics')
    }

    const data = await res.json()
    console.log('res', data)
    return data
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('fetch app build statistics failed:', msg)
    return undefined
  }
}

export const getAiModelStatistics = async () => {
  try {
    const res = await fetch('/api/user-settings/ai-model-statistics', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!res.ok) {
      throw new Error('Failed to fetch ai model statistics')
    }

    const data = await res.json()
    console.log('res', data)
    return data
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('fetch ai model statistics failed:', msg)
    return undefined
  }
}

export const getLocaleStatistics = async () => {
  try {
    const res = await fetch('/api/user-settings/locale-statistics', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!res.ok) {
      throw new Error('Failed to fetch locale statistics')
    }

    const data = await res.json()
    console.log('res', data)
    return data
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('fetch locale statistics failed:', msg)
    return undefined
  }
}
