'use client'

import { ModerationCoast } from '@/types'
import React, { use, useEffect, useState } from 'react'
import ModerationCoastTable from '@/components/admin/moderation-coast/ModerationCoastTable'
import { getModerationCoast } from '@/lib/api/moderation'

type SP = { page?: string }

export default function ModerationCoastClient({
  spPromise,
}: {
  spPromise: Promise<SP>
  adminId: number
}) {
  const [moderationCoast, setModerationCoast] = useState<
    ModerationCoast[] | null
  >(null)

  useEffect(() => {
    loadModerationCoast()
  }, [])

  const loadModerationCoast = async () => {
    const res = await getModerationCoast()

    console.log('Moderation Coast:', res)

    setModerationCoast(res)
  }

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold">Community</h1>
      <div className="mb-10">
        <ModerationCoastTable
          moderationCoast={moderationCoast as ModerationCoast[]}
        />
      </div>
    </div>
  )
}
