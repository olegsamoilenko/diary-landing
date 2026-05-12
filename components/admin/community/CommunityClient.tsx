'use client'

import CommunityTable from '@/components/admin/community/CommunityTable'
import { Topic, TopicsResponse } from '@/types'
import Pagination from '@/components/ui/pagination'
import React, { use, useEffect, useState } from 'react'
import { getAllTopics } from '@/lib/api/community'

type SP = { page?: string }

export default function CommunityClient({
  spPromise,
  adminId,
}: {
  spPromise: Promise<SP>
  adminId: number
}) {
  const sp = use(spPromise)

  const page = Number(sp.page ?? '1') || 1
  const limit = 10
  const [topicsResp, setTopicsResp] = useState<TopicsResponse | null>(null)

  useEffect(() => {
    loadTopics()
  }, [page])

  const loadTopics = async () => {
    const res = await getAllTopics(page, limit)

    setTopicsResp(res)
  }

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold">Community</h1>
      <div>
        <CommunityTable
          topics={(topicsResp?.items as Topic[]) ?? []}
          adminId={adminId}
          onSuccessRemoveTopic={loadTopics}
          onSuccessRestoreTopic={loadTopics}
        />
        <Pagination
          page={topicsResp?.page ?? 0}
          pageCount={topicsResp?.pageCount ?? 0}
        />
      </div>
    </div>
  )
}
