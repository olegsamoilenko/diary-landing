'use client'

import React, { useEffect, useState, use } from 'react'
import { getAll } from '@/lib/api/modelReviews'
import { Limit, ModelReview } from '@/types'
import { getErrorMessage } from '@/lib/errors'
import AllModelReviewsTable from '@/components/admin/model-reviews/AllModelReviewsTable'
import Pagination from '@/components/ui/pagination'

type SP = { page?: string }

export default function AdminsClient({
  searchParams,
}: {
  searchParams?: Promise<SP>
}) {
  const spPromise: Promise<SP> = searchParams ?? Promise.resolve({})
  const sp = use(spPromise)
  const page = Number(sp.page ?? '1') || 1
  const [modelReviews, setModelReviews] = useState<ModelReview[] | null>(null)
  const [limit, setLimit] = useState<Limit>('20')

  useEffect(() => {
    fetchReviews()
  }, [page])

  const fetchReviews = async () => {
    try {
      const res = await getAll(page, Number(limit))

      if (!res) {
        throw new Error('No response')
      }

      setModelReviews(res as ModelReview[])
    } catch (err: unknown) {
      console.error('error', err)
    }
  }

  return (
    <>
      <h1 className="mb-4 text-xl font-semibold">Model reviews</h1>
      <div className="mb-8">
        <AllModelReviewsTable
          reviews={modelReviews as ModelReview[]}
          onSuccessMarkAsRead={fetchReviews}
        />
        {/*<Pagination*/}
        {/*  page={fetchUsersRes?.page ?? 0}*/}
        {/*  pageCount={fetchUsersRes?.pageCount ?? 0}*/}
        {/*/>*/}
      </div>
    </>
  )
}
