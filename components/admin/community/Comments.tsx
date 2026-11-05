'use client'

import React, { RefObject, useState } from 'react'
import { CommunityLoadState } from './CommunityPage'
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
import { Comment, Log, LogsLevel, TakeOptions, User } from '@/types'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { getLogs } from '@/lib/api/logs'
import AllLogsTable from '@/components/admin/logs/AllLogsTable'
import Pagination from '@/components/ui/pagination'
import { takeCommentsOptions } from '@/lib/constants/community'
import { getCommentLocationInTopic, getComments } from '@/lib/api/community'
import CommentCard from '@/components/admin/community/CommentCard'
import ModerationAnswerTopicDialog from '@/components/admin/community/ModerationAnswerTopicDialog'

type SP = { page?: string; topicId?: string }
export default function Comments({
  topicId,
  adminId,
  scrollContainerRef,
  onSuccessAddAnswerComment,
  systemUsers,
}: {
  topicId: string
  adminId: number
  scrollContainerRef?: RefObject<HTMLDivElement | null>
  onSuccessAddAnswerComment?: () => void
  systemUsers: User[]
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(false)
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
  const [commentId, setCommentId] = useState<string>('')

  const loadComments = async (pageNumber: number) => {
    setLoading(true)
    setError(null)
    const logsRes = await getComments(topicId, {
      page: pageNumber,
      limit,
      take,
    })
    if (logsRes) {
      setCommentsResp(logsRes)
      setPage(logsRes.page)
      setLoaded(true)
    } else setError('Не вдалося завантажити коментарі.')
    setLoading(false)
  }

  const scrollToTop = () => {
    scrollContainerRef?.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const findComment = async () => {
    if (!commentId.trim()) return
    setLoading(true)
    setError(null)
    const location = await getCommentLocationInTopic(
      topicId,
      commentId.trim(),
      limit,
    )
    if (!location?.page) {
      setError('Коментар не знайдено, або сервіс недоступний.')
      setLoading(false)
      return
    }
    setTake(TakeOptions.ALL)

    const logsRes = await getComments(topicId, {
      page: location.page,
      limit: location.limit,
      take: TakeOptions.ALL,
    })
    if (!logsRes) {
      setError('Не вдалося завантажити коментарі.')
      setLoading(false)
      return
    }
    setCommentsResp(logsRes)
    setPage(logsRes.page)
    setLoaded(true)
    setLoading(false)

    requestAnimationFrame(() => {
      document.getElementById(`comment-${commentId.trim()}`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    })
  }

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">Коментарі</h3>
      <ModerationAnswerTopicDialog
        id={topicId}
        adminId={adminId}
        onSuccessAddAnswerComment={() => {
          loadComments(page)
        }}
        systemUsers={systemUsers}
      />
      <div className="my-4 flex flex-wrap items-end gap-3">
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
        <Button disabled={loading} onClick={() => loadComments(1)}>
          Показати
        </Button>
        <div>
          <Label htmlFor="uuid" className="mb-2">
            ID
          </Label>
          <Input
            id="uuid"
            type="text"
            value={commentId}
            onChange={(e) => setCommentId(e.target.value)}
            placeholder="Uuid"
          />
        </div>
        <Button
          disabled={loading || !commentId.trim()}
          onClick={async () => {
            await findComment()
          }}
        >
          Знайти
        </Button>
      </div>
      <CommunityLoadState
        loading={loading}
        error={error}
        empty={loaded && !commentsResp.items.length}
        onRetry={() => loadComments(page)}
      />
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
              onSuccessAddAnswerComment={() => loadComments(page)}
              onSuccessEditComment={() => loadComments(page)}
              systemUsers={systemUsers}
            ></CommentCard>
          ))}
        <Pagination
          page={commentsResp?.page ?? 0}
          pageCount={commentsResp?.pageCount ?? 0}
          onPress={(p) => {
            scrollToTop()
            void loadComments(p)
          }}
          isComponent={true}
        />
      </div>
    </div>
  )
}
