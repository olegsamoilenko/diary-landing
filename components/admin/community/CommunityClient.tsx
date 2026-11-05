'use client'

import CommunityPage, {
  CommunityLoadState,
} from '@/components/admin/community/CommunityPage'

import CommunityTable from '@/components/admin/community/CommunityTable'
import {
  ForumModerationTargetType,
  Topic,
  TopicsResponse,
  Comment,
  User,
} from '@/types'
import Pagination from '@/components/ui/pagination'
import React, { use, useEffect, useState, useRef, useCallback } from 'react'
import {
  getAllTopics,
  getModerationTarget,
  getSystemUsers,
} from '@/lib/api/community'
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
import CreateSystemUserDialog from '@/components/admin/community/CreateSystemUserDialog'
import SystemProfilesDialog from '@/components/admin/community/SystemProfilesDialog'

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
  variant = 'classic',
  spPromise,
  adminId,
}: {
  variant?: 'classic' | 'v2'
  spPromise: Promise<SP>
  adminId: number
}) {
  const sp = use(spPromise)

  const page = Math.max(1, Math.floor(Number(sp.page ?? '1')) || 1)
  const limit = 10
  const requestId = useRef(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [topicsResp, setTopicsResp] = useState<TopicsResponse | null>(null)
  const [targetLoading, setTargetLoading] = useState(false)
  const [targetError, setTargetError] = useState<string | null>(null)
  const [systemError, setSystemError] = useState<string | null>(null)
  const [targetId, setTargetId] = useState('')
  const [moderationTargetType, setModerationTargetType] =
    useState<ForumModerationTargetType>(ForumModerationTargetType.TOPIC)
  const [moderationTarget, setModerationTarget] =
    useState<ModerationTarget | null>(null)
  const [systemUsers, setSystemUsers] = useState<User[]>([])

  useEffect(() => {
    void loadSystemUsers()
  }, [])

  const loadTopics = useCallback(async () => {
    const request = ++requestId.current
    setLoading(true)
    setError(null)
    const res = await getAllTopics(page, limit)

    if (request !== requestId.current) return
    if (!res) {
      setError('Не вдалося завантажити дані. Спробуйте ще раз.')
    } else {
      setTopicsResp(res)
    }
    setLoading(false)
  }, [page])

  useEffect(() => {
    void loadTopics()
  }, [loadTopics])

  const loadSystemUsers = async () => {
    const res = await getSystemUsers()

    setSystemError(res ? null : 'Не вдалося завантажити системних авторів.')
    if (res) setSystemUsers(res)
  }

  const handleLoadTarget = async () => {
    if (!targetId.trim()) return
    setTargetLoading(true)
    setTargetError(null)
    setModerationTarget(null)
    const resp = await getModerationTarget(
      moderationTargetType,
      targetId.trim(),
    )
    if (resp?.item) setModerationTarget(resp)
    else
      setTargetError('Тему або коментар не знайдено, або сервіс недоступний.')
    setTargetLoading(false)
  }

  return (
    <CommunityPage
      variant={variant}
      title="Теми та коментарі"
      description="Публікації, відповіді та керування доступом. Розкрийте тему, щоб переглянути її вміст і дії модерації."
    >
      {variant === 'classic' && (
        <h1 className="mb-4 text-xl font-semibold">Community</h1>
      )}
      {systemError && (
        <p role="alert" className="text-destructive text-sm">
          {systemError}{' '}
          <Button variant="outline" size="sm" onClick={loadSystemUsers}>
            Повторити
          </Button>
        </p>
      )}
      <div className="community-toolbar mb-4 flex flex-wrap items-center gap-3">
        <CreateSystemTopicDialog
          adminId={adminId}
          onCreate={loadTopics}
          systemUsers={systemUsers}
        />
        <CreateSystemUserDialog
          adminId={adminId}
          onSuccessCreateUser={loadSystemUsers}
        />
        <SystemProfilesDialog
          users={systemUsers}
          onSaved={(userId, profile) => {
            setSystemUsers((users) =>
              users.map((user) =>
                user.id === userId
                  ? { ...user, forumPublicProfile: profile }
                  : user,
              ),
            )
          }}
        />
      </div>
      <details className="community-lookup">
        <summary className="cursor-pointer text-sm font-semibold">
          Знайти тему або коментар за ID
        </summary>
        <div className="community-toolbar mb-6 flex flex-wrap items-end gap-4">
          <div className="items-end">
            <Label htmlFor="community-target-type" className="mb-2">
              Тип контенту
            </Label>
            <Select
              value={moderationTargetType}
              onValueChange={(t) => {
                setModerationTargetType(t as ForumModerationTargetType)
              }}
            >
              <SelectTrigger id="community-target-type" className="w-[180px]">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                {moderationTargetTypeOptions
                  .filter((option) => option.value !== 'all')
                  .map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="community-target-id" className="mb-2">
              ID теми або коментаря
            </Label>
            <Input
              id="community-target-id"
              type="text"
              value={targetId}
              onChange={(e) => setTargetId(e.target.value)}
              placeholder="Вставте повний ID"
            />
          </div>
          <Button
            disabled={targetLoading || !targetId.trim()}
            onClick={async () => {
              await handleLoadTarget()
            }}
          >
            Показати
          </Button>
        </div>
        <CommunityLoadState
          loading={targetLoading}
          error={targetError}
          onRetry={handleLoadTarget}
        />
        {moderationTarget &&
          moderationTarget.targetType === ForumModerationTargetType.TOPIC && (
            <ModerationTopicCard
              key={moderationTarget.item.id}
              topic={moderationTarget.item}
              adminId={adminId}
              onSuccessRemoveTopic={handleLoadTarget}
              onSuccessRestoreTopic={handleLoadTarget}
            />
          )}

        {moderationTarget &&
          moderationTarget.targetType === ForumModerationTargetType.COMMENT && (
            <ModerationCommentCard
              key={moderationTarget.item.id}
              comment={moderationTarget.item}
              adminId={adminId}
              onSuccessRemoveComment={handleLoadTarget}
              onSuccessRestoreComment={handleLoadTarget}
            />
          )}
      </details>
      <div className="mb-10">
        <CommunityLoadState
          loading={loading}
          error={error}
          empty={!topicsResp?.items.length}
          onRetry={loadTopics}
        />
        {!loading && !error && (
          <CommunityTable
            variant={variant}
            key={page}
            topics={(topicsResp?.items as Topic[]) ?? []}
            adminId={adminId}
            onSuccessRemoveTopic={loadTopics}
            onSuccessRestoreTopic={loadTopics}
            onSuccessDeleteTopic={loadTopics}
            onEditSystemTopic={loadTopics}
            systemUsers={systemUsers}
          />
        )}
        <Pagination
          page={topicsResp?.page ?? 1}
          pageCount={topicsResp?.pageCount ?? 0}
        />
      </div>
    </CommunityPage>
  )
}
