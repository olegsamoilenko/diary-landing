'use client'

import CommunityTable from '@/components/admin/community/CommunityTable'
import {
  ForumModerationTargetType,
  Topic,
  TopicsResponse,
  Comment,
} from '@/types'
import Pagination from '@/components/ui/pagination'
import React, { use, useEffect, useState } from 'react'
import { getAllTopics, getModerationTarget } from '@/lib/api/community'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { moderationTargetTypeOptions } from '@/lib/constants/community'
import ModerationTopicCard from '@/components/admin/community/ModerationTopicCard'
import ModerationCommentCard from '@/components/admin/community/ModerationCommentCard'
import CreateSystemTopicDialog from '@/components/admin/community/CreateSystemTopicDialog'

type SP = { page?: string }

type ModerationTarget =
  | {
      targetType: ForumModerationTargetType.TOPIC
      item: Topic
    }
  | {
      targetType: ForumModerationTargetType.COMMENT
      item: Comment
    }

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
  const [targetId, setTargetId] = useState('')
  const [moderationTargetType, setModerationTargetType] =
    useState<ForumModerationTargetType>(ForumModerationTargetType.TOPIC)
  const [moderationTarget, setModerationTarget] =
    useState<ModerationTarget | null>(null)

  useEffect(() => {
    loadTopics()
  }, [page])

  const loadTopics = async () => {
    const res = await getAllTopics(page, limit)

    setTopicsResp(res)
  }

  const handleLoadTarget = async () => {
    const resp = await getModerationTarget(moderationTargetType, targetId)
    setModerationTarget(resp)
  }

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold">Community</h1>
      <div className="mb-4">
        <CreateSystemTopicDialog adminId={adminId} onCreate={loadTopics} />
      </div>
      <div className="mb-10">
        <CommunityTable
          topics={(topicsResp?.items as Topic[]) ?? []}
          adminId={adminId}
          onSuccessRemoveTopic={loadTopics}
          onSuccessRestoreTopic={loadTopics}
          onSuccessDeleteTopic={loadTopics}
          onEditSystemTopic={loadTopics}
        />
        <Pagination
          page={topicsResp?.page ?? 0}
          pageCount={topicsResp?.pageCount ?? 0}
        />
      </div>
      <div>
        <div className="mb-10 flex items-end gap-10">
          <div className="items-end">
            <Label htmlFor="uuid" className="mb-2">
              Target Type
            </Label>
            <Select
              value={moderationTargetType}
              onValueChange={(t) => {
                setModerationTargetType(t as ForumModerationTargetType)
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                {moderationTargetTypeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="uuid" className="mb-2">
              ID
            </Label>
            <Input
              id="uuid"
              type="text"
              value={targetId}
              onChange={(e) => setTargetId(e.target.value)}
              placeholder="Uuid"
            />
          </div>
          <Button
            onClick={async () => {
              await handleLoadTarget()
            }}
          >
            Load
          </Button>
        </div>
        {moderationTarget &&
          moderationTarget.targetType === ForumModerationTargetType.TOPIC && (
            <ModerationTopicCard
              topic={moderationTarget.item}
              adminId={adminId}
              onSuccessRemoveTopic={handleLoadTarget}
              onSuccessRestoreTopic={handleLoadTarget}
            />
          )}

        {moderationTarget &&
          moderationTarget.targetType === ForumModerationTargetType.COMMENT && (
            <ModerationCommentCard
              comment={moderationTarget.item}
              adminId={adminId}
              onSuccessRemoveComment={handleLoadTarget}
              onSuccessRestoreComment={handleLoadTarget}
            />
          )}
      </div>
    </div>
  )
}
