'use client'

import CommunityPage, {
  CommunityLoadState,
} from '@/components/admin/community/CommunityPage'

import { ModerationCoast } from '@/types'
import React, { use, useEffect, useState } from 'react'
import ModerationCoastTable from '@/components/admin/moderation-coast/ModerationCoastTable'
import { getModerationCoast } from '@/lib/api/moderation'

type SP = { page?: string }

export default function ModerationCoastClient({
  variant = 'classic',
  spPromise,
}: {
  variant?: 'classic' | 'v2'
  spPromise: Promise<SP>
  adminId: number
}) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [moderationCoast, setModerationCoast] = useState<
    ModerationCoast[] | null
  >(null)

  useEffect(() => {
    loadModerationCoast()
  }, [])

  const loadModerationCoast = async () => {
    setLoading(true)
    setError(null)
    const res = await getModerationCoast()

    if (!res) {
      setError('Не вдалося завантажити дані. Спробуйте ще раз.')
    } else {
      setModerationCoast(res)
    }
    setLoading(false)
  }

  return (
    <CommunityPage
      variant={variant}
      title="Витрати модерації"
      description="Щомісячне використання токенів, виклики сервісів та оцінка вартості в доларах."
    >
      {variant === 'classic' && (
        <h1 className="mb-4 text-xl font-semibold">Community</h1>
      )}
      <div className="mb-10">
        <CommunityLoadState
          loading={loading}
          error={error}
          empty={!moderationCoast?.length}
          onRetry={loadModerationCoast}
        />
        {!loading && !error && (
          <ModerationCoastTable
            moderationCoast={moderationCoast as ModerationCoast[]}
          />
        )}
      </div>
    </CommunityPage>
  )
}
