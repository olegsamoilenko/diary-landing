'use client'

import React, { use, useEffect, useState } from 'react'
import type { TokenStatisticsResponse } from '@/types'
import { getTokenStatistics } from '@/lib/api/tokenStatistics'
import { BasePlanIds } from '@/types'
import TokenStatisticsChart from '@/components/admin/tokens/TokenStatisticsChart'
import CoastStatisticsChart from '@/components/admin/tokens/CoastStatisticsChart'
import Pagination from '@/components/ui/pagination'

type SP = { page?: string }

export default function TokensPage({
  searchParams,
}: {
  searchParams?: Promise<SP>
}) {
  const spPromise: Promise<SP> = searchParams ?? Promise.resolve({})
  const sp = use(spPromise)

  const page = Number(sp.page ?? '1') || 1
  const limit = 20

  const [tokenStatistics, setTokenStatistics] =
    useState<TokenStatisticsResponse | null>(null)

  const startPlanTokenStatistics = tokenStatistics
    ? tokenStatistics.tokenStatistics.filter(
        (ts) => ts.basePlanId === BasePlanIds.START,
      )
    : []
  const litePlanTokenStatistics = tokenStatistics
    ? tokenStatistics.tokenStatistics.filter(
        (ts) => ts.basePlanId === BasePlanIds.LITE_M1,
      )
    : []
  const basePlanTokenStatistics = tokenStatistics
    ? tokenStatistics.tokenStatistics.filter(
        (ts) => ts.basePlanId === BasePlanIds.BASE_M1,
      )
    : []
  const proPlanTokenStatistics = tokenStatistics
    ? tokenStatistics.tokenStatistics.filter(
        (ts) => ts.basePlanId === BasePlanIds.PRO_M1,
      )
    : []
  const startPlanTokenCoastStatistics = tokenStatistics
    ? tokenStatistics.coastStatistics.filter(
        (ts) => ts.basePlanId === BasePlanIds.START,
      )
    : []
  const litePlanTokenCoastStatistics = tokenStatistics
    ? tokenStatistics.coastStatistics.filter(
        (ts) => ts.basePlanId === BasePlanIds.LITE_M1,
      )
    : []
  const basePlanTokenCoastStatistics = tokenStatistics
    ? tokenStatistics.coastStatistics.filter(
        (ts) => ts.basePlanId === BasePlanIds.BASE_M1,
      )
    : []
  const proPlanTokenCoastStatistics = tokenStatistics
    ? tokenStatistics.coastStatistics.filter(
        (ts) => ts.basePlanId === BasePlanIds.PRO_M1,
      )
    : []

  useEffect(() => {
    loadTokenStatistics()
  }, [page])

  const loadTokenStatistics = async () => {
    const res = await getTokenStatistics(page, limit)

    console.log('res', res)

    setTokenStatistics(res)
  }
  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Tokens statistics</h1>
      <h3 className="mb-2 text-lg font-semibold">
        Tokens statistics Start plan
      </h3>
      <TokenStatisticsChart data={startPlanTokenStatistics} />
      <Pagination
        page={tokenStatistics?.meta.page ?? 0}
        pageCount={tokenStatistics?.meta.pageCount ?? 0}
      />
      <h3 className="mb-2 text-lg font-semibold">
        Tokens statistics Lite plan
      </h3>
      <TokenStatisticsChart data={litePlanTokenStatistics} />
      <Pagination
        page={tokenStatistics?.meta.page ?? 0}
        pageCount={tokenStatistics?.meta.pageCount ?? 0}
      />
      <h3 className="mb-2 text-lg font-semibold">
        Tokens statistics Base plan
      </h3>
      <TokenStatisticsChart data={basePlanTokenStatistics} />
      <Pagination
        page={tokenStatistics?.meta.page ?? 0}
        pageCount={tokenStatistics?.meta.pageCount ?? 0}
      />
      <h3 className="mb-2 text-lg font-semibold">Tokens statistics Pro plan</h3>
      <TokenStatisticsChart data={proPlanTokenStatistics} />
      <Pagination
        page={tokenStatistics?.meta.page ?? 0}
        pageCount={tokenStatistics?.meta.pageCount ?? 0}
      />

      <h3 className="mb-2 text-lg font-semibold">
        Tokens coast statistics Start plan
      </h3>
      <CoastStatisticsChart data={startPlanTokenCoastStatistics} />
      <Pagination
        page={tokenStatistics?.meta.page ?? 0}
        pageCount={tokenStatistics?.meta.pageCount ?? 0}
      />
      <h3 className="mb-2 text-lg font-semibold">
        Tokens coast statistics Lite plan
      </h3>
      <CoastStatisticsChart data={litePlanTokenCoastStatistics} />
      <Pagination
        page={tokenStatistics?.meta.page ?? 0}
        pageCount={tokenStatistics?.meta.pageCount ?? 0}
      />
      <h3 className="mb-2 text-lg font-semibold">
        Tokens coast statistics Base plan
      </h3>
      <CoastStatisticsChart data={basePlanTokenCoastStatistics} />
      <Pagination
        page={tokenStatistics?.meta.page ?? 0}
        pageCount={tokenStatistics?.meta.pageCount ?? 0}
      />
      <h3 className="mb-2 text-lg font-semibold">
        Tokens coast statistics Pro plan
      </h3>
      <CoastStatisticsChart data={proPlanTokenCoastStatistics} />
      <Pagination
        page={tokenStatistics?.meta.page ?? 0}
        pageCount={tokenStatistics?.meta.pageCount ?? 0}
      />
    </div>
  )
}
