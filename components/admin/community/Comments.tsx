'use client'

import React, { RefObject, use, useEffect, useState } from 'react'
import { DatePicker } from '@/components/ui/DatePicker'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { logsLevelOptions } from '@/lib/constants/logs'
import { Comment, Log, LogsLevel, TakeOptions } from '@/types'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { getLogs } from '@/lib/api/logs'
import AllLogsTable from '@/components/admin/logs/AllLogsTable'
import Pagination from '@/components/ui/pagination'
import { takeCommentsOptions } from '@/lib/constants/community'
import { getComments } from '@/lib/api/community'
import CommentCard from '@/components/admin/community/CommentCard'

type SP = { page?: string; topicId?: string }
export default function Comments({
  topicId,
  adminId,
  scrollContainerRef,
}: {
  topicId: string
  adminId: number
  scrollContainerRef?: RefObject<HTMLDivElement | null>
}) {
  const [take, setTake] = useState<TakeOptions>(TakeOptions.ALL)
  const limit = 20
  const [commentsResp, setCommentsResp] = useState<{
    items: Comment[]
    page: number
    pageCount: number
  }>({
    items: [],
    page: 0,
    pageCount: 0,
  })
  const [page, setPage] = useState<number>(1)

  const loadComments = async (pageNumber: number) => {
    const logsRes = await getComments(topicId, {
      page: pageNumber,
      limit,
      take,
    })
    setCommentsResp(logsRes)
  }

  const scrollToTop = () => {
    scrollContainerRef?.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold">Comments</h1>
      <div className="my-4 flex items-end gap-4">
        <div className="items-end">
          <div className="mb-2">Take</div>
          <Select
            value={take}
            onValueChange={(t) => {
              setTake(t as TakeOptions)
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              {takeCommentsOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => loadComments(1)}>Load</Button>
      </div>
      <div>
        {commentsResp.items &&
          commentsResp.items.length > 0 &&
          commentsResp.items.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              adminId={adminId}
              onSuccessRemoveComment={() => loadComments(page)}
              onSuccessRestoreComment={() => loadComments(page)}
            ></CommentCard>
          ))}
        <Pagination
          page={commentsResp?.page ?? 0}
          pageCount={commentsResp?.pageCount ?? 0}
          onPress={(p) => {
            scrollToTop()
            setPage(p)
            void loadComments(p)
          }}
          isComponent={true}
        />
      </div>
    </div>
  )
}
