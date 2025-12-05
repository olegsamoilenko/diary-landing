'use client'

import React, { use, useEffect, useState } from 'react'
import { getTokenUsageStatistics } from '@/lib/api/tokenUsageStatistics'
import TokenUsageStatisticsChart from '@/components/admin/tokens-usage/TokenUsageStatisticsChart'
import TokenUsageCoastStatisticsChart from '@/components/admin/tokens-usage/TokenUsageCoastStatisticsChart'
import Pagination from '@/components/ui/pagination'
import { TokenUsageStatisticsResponse } from '@/types/tokenStatistics'

type SP = { page?: string }

export default function TokensPage({
  searchParams,
}: {
  searchParams?: Promise<SP>
}) {
  const spPromise: Promise<SP> = searchParams ?? Promise.resolve({})
  const sp = use(spPromise)

  const page = Number(sp.page ?? '1') || 1
  const limit = 200

  const [tokenUsageStatistics, setTokenUsageStatistics] =
    useState<TokenUsageStatisticsResponse | null>(null)

  const embeddingTokenUsageStatistics =
    tokenUsageStatistics?.stat.embedding ?? []
  const entryTokenUsageStatistics = tokenUsageStatistics?.stat.entry ?? []
  const dialogTokenUsageStatistics = tokenUsageStatistics?.stat.dialog ?? []
  const userMemoryTokenUsageStatistics =
    tokenUsageStatistics?.stat.user_memory ?? []
  const assistantMemoryTokenUsageStatistics =
    tokenUsageStatistics?.stat.assistant_memory ?? []

  useEffect(() => {
    loadTokenUsageStatistics()
  }, [page])

  const loadTokenUsageStatistics = async () => {
    const res = await getTokenUsageStatistics(page, limit)

    console.log('res', res)

    setTokenUsageStatistics(res)
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Tokens statistics</h1>
      <h3 className="mb-2 text-lg font-semibold">
        Tokens statistics Embedding
      </h3>
      <TokenUsageStatisticsChart data={embeddingTokenUsageStatistics} />
      <Pagination
        page={tokenUsageStatistics?.meta.page ?? 0}
        pageCount={tokenUsageStatistics?.meta.pageCount ?? 0}
      />
      <h3 className="mb-2 text-lg font-semibold">Tokens statistics Entry</h3>
      <TokenUsageStatisticsChart data={entryTokenUsageStatistics} />
      <Pagination
        page={tokenUsageStatistics?.meta.page ?? 0}
        pageCount={tokenUsageStatistics?.meta.pageCount ?? 0}
      />
      <h3 className="mb-2 text-lg font-semibold">Tokens statistics Dialog</h3>
      <TokenUsageStatisticsChart data={dialogTokenUsageStatistics} />
      <Pagination
        page={tokenUsageStatistics?.meta.page ?? 0}
        pageCount={tokenUsageStatistics?.meta.pageCount ?? 0}
      />
      <h3 className="mb-2 text-lg font-semibold">
        Tokens statistics User memory
      </h3>
      <TokenUsageStatisticsChart data={userMemoryTokenUsageStatistics} />
      <Pagination
        page={tokenUsageStatistics?.meta.page ?? 0}
        pageCount={tokenUsageStatistics?.meta.pageCount ?? 0}
      />
      <h3 className="mb-2 text-lg font-semibold">
        Tokens statistics Assistant memory
      </h3>
      <TokenUsageStatisticsChart data={assistantMemoryTokenUsageStatistics} />
      <Pagination
        page={tokenUsageStatistics?.meta.page ?? 0}
        pageCount={tokenUsageStatistics?.meta.pageCount ?? 0}
      />

      <h3 className="mb-2 text-lg font-semibold">
        Tokens coast statistics Embedding
      </h3>
      <TokenUsageCoastStatisticsChart data={embeddingTokenUsageStatistics} />
      <Pagination
        page={tokenUsageStatistics?.meta.page ?? 0}
        pageCount={tokenUsageStatistics?.meta.pageCount ?? 0}
      />
      <h3 className="mb-2 text-lg font-semibold">
        Tokens coast statistics Entry
      </h3>
      <TokenUsageCoastStatisticsChart data={entryTokenUsageStatistics} />
      <Pagination
        page={tokenUsageStatistics?.meta.page ?? 0}
        pageCount={tokenUsageStatistics?.meta.pageCount ?? 0}
      />
      <h3 className="mb-2 text-lg font-semibold">
        Tokens coast statistics Dialog
      </h3>
      <TokenUsageCoastStatisticsChart data={dialogTokenUsageStatistics} />
      <Pagination
        page={tokenUsageStatistics?.meta.page ?? 0}
        pageCount={tokenUsageStatistics?.meta.pageCount ?? 0}
      />
      <h3 className="mb-2 text-lg font-semibold">
        Tokens coast statistics User memory
      </h3>
      <TokenUsageCoastStatisticsChart data={userMemoryTokenUsageStatistics} />
      <Pagination
        page={tokenUsageStatistics?.meta.page ?? 0}
        pageCount={tokenUsageStatistics?.meta.pageCount ?? 0}
      />
      <h3 className="mb-2 text-lg font-semibold">
        Tokens coast statistics Assistant memory
      </h3>
      <TokenUsageCoastStatisticsChart
        data={assistantMemoryTokenUsageStatistics}
      />
      <Pagination
        page={tokenUsageStatistics?.meta.page ?? 0}
        pageCount={tokenUsageStatistics?.meta.pageCount ?? 0}
      />
    </div>
  )
}
