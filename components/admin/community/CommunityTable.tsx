import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import React, { useRef, useState } from 'react'
import {
  CommonNotification,
  ForumContentStatus,
  ModerationLog,
  Restriction,
  User,
} from '@/types'
import { Topic } from '@/types/community'
import { JsonViewer } from '@/components/ui/JsonViewer'
import UserLogs from '@/components/admin/user-list/UserLogs'
import Comments from '@/components/admin/community/Comments'
import { Button } from '@/components/ui/button'
import ModerationRemoveTopicDialog from '@/components/admin/community/ModerationRemoveTopicDialog'
import { restoreTopic, unrestrictUser } from '@/lib/api/moderation'
import ModerationRestoreTopicDialog from '@/components/admin/community/ModerationRestoreTopicDialog'
import { getModerationUserLogs, getUserRestriction } from '@/lib/api/community'
import UserLogsTable from '@/components/admin/community/UserLogsTable'
import ModerationRestrictUserDialog from '@/components/admin/community/ModerationRestrictUserDialog'
import ModerationUnrestrictUser from '@/components/admin/community/ModerationUnrestrictUser'
import Pagination from '@/components/ui/pagination'
import ModerationDeleteTopicDialog from '@/components/admin/community/ModerationDeleteTopicDialog'
import EditSystemTopicDialog from '@/components/admin/community/EditSystemTopicDialog'

type Props = {
  variant?: 'classic' | 'v2'
  topics: Topic[]
  adminId: number
  onSuccessRemoveTopic: () => void
  onSuccessRestoreTopic: () => void
  onSuccessDeleteTopic: () => void
  onEditSystemTopic: () => void
  systemUsers: User[]
}
export default function CommunityTable({
  variant = 'classic',
  topics,
  adminId,
  onSuccessRemoveTopic,
  onSuccessRestoreTopic,
  onSuccessDeleteTopic,
  onEditSystemTopic,
  systemUsers,
}: Props) {
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(null)
  const [moderationLogs, setModerationLogs] = useState<{
    items: ModerationLog[] | null
    page: number
    pageCount: number
  } | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [userRestriction, setUserRestriction] = useState<{
    isRestricted: boolean
    restriction: Restriction
  } | null>(null)

  const detailRequest = useRef(0)
  const toggle = (id: string) => {
    detailRequest.current++
    setModerationLogs(null)
    setUserRestriction(null)
    setExpandedTopicId((prev) => (prev === id ? null : id))
  }

  const handleRestore = async (topicId: string, targetUserId: number) => {
    await restoreTopic(topicId, {
      moderationRestoredByAdminId: adminId,
      targetUserId,
    })
  }

  const loadModerationUserLogs = async (userId: number, page: number) => {
    const request = detailRequest.current
    const raw = await getModerationUserLogs(userId, { page: page, limit: 20 })
    if (request === detailRequest.current) setModerationLogs(raw)
  }

  const loadUserRestriction = async (userId: number) => {
    const request = detailRequest.current
    const resp = await getUserRestriction(userId)
    if (request === detailRequest.current) setUserRestriction(resp)
  }

  const handleUnrestrict = async (userId: number, adminId: number) => {
    await unrestrictUser(userId, { createdByAdminId: adminId })
  }

  return (
    <Table
      className={
        variant === 'v2'
          ? 'w-full min-w-[850px] table-fixed'
          : 'w-full table-fixed'
      }
    >
      <TableHeader>
        <TableRow>
          {variant === 'v2' ? (
            <>
              <TableHead className="w-[26%]">Тема</TableHead>
              <TableHead className="w-[15%]">Автор</TableHead>
              <TableHead className="w-[12%]">Категорія</TableHead>
              <TableHead className="w-[17%]">Активність</TableHead>
              <TableHead className="w-[15%]">Стан і доступ</TableHead>
              <TableHead className="w-[15%]">Дії</TableHead>
            </>
          ) : (
            <>
              <TableHead className="w-[100px]">Top ID</TableHead>
              <TableHead className="w-[50px]">Aut ID</TableHead>
              <TableHead className="w-[300px]">Title</TableHead>
              <TableHead className="w-[150px]">Author</TableHead>
              <TableHead className="w-[50px]">Lang</TableHead>
              <TableHead className="w-[130px]">Category</TableHead>
              <TableHead className="w-[100px]">Коментарі</TableHead>
              <TableHead className="w-[50px]">View</TableHead>
              <TableHead className="w-[50px]">Likes</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Visibility</TableHead>
              <TableHead>Actions</TableHead>
            </>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {topics &&
          topics.map((raw: Topic) => {
            const isOpen = expandedTopicId === raw.id
            return (
              <React.Fragment key={raw.id}>
                <TableRow
                  onClick={() => toggle(raw.id)}
                  className="hover:bg-muted/50 cursor-pointer"
                >
                  {variant === 'v2' ? (
                    <>
                      <TableCell className="whitespace-normal">
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          onClick={(event) => {
                            event.stopPropagation()
                            toggle(raw.id)
                          }}
                          className="text-left font-semibold hover:underline"
                        >
                          <span
                            aria-hidden="true"
                            className="text-muted-foreground mr-2"
                          >
                            {isOpen ? '−' : '+'}
                          </span>
                          {raw.title}
                        </button>
                        <div className="text-muted-foreground mt-2 flex flex-wrap gap-2 text-xs">
                          <span title={raw.id}>{raw.id.slice(0, 8)}</span>
                          <span>· {raw.lang}</span>
                          {raw.isSystem && (
                            <span className="text-accent-foreground bg-accent rounded px-1.5">
                              Системна
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="whitespace-normal">
                        <div className="font-medium">
                          {raw.authorProfile?.username ||
                            raw.author?.name ||
                            '—'}
                        </div>
                        <div className="text-muted-foreground mt-1 text-xs">
                          ID {raw.authorId}
                        </div>
                      </TableCell>
                      <TableCell className="whitespace-normal">
                        {raw.category?.title ?? '—'}
                      </TableCell>
                      <TableCell className="whitespace-normal">
                        <div className="space-y-1 text-xs">
                          <div>{raw.commentsCount} коментарів</div>
                          <div className="text-muted-foreground">
                            {raw.viewsCount} переглядів · {raw.likesCount}{' '}
                            вподобань
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="whitespace-normal">
                        <span className="bg-muted inline-flex rounded-full px-2.5 py-1 text-xs">
                          {(
                            {
                              published: 'Опубліковано',
                              draft: 'Чернетка',
                              pending_review: 'На перевірці',
                              removed_by_moderator: 'Приховано',
                              deleted_by_author: 'Видалено автором',
                            } as Record<string, string>
                          )[raw.status] ?? raw.status}
                        </span>
                        <div className="text-muted-foreground mt-2 text-xs">
                          {raw.visibility === 'public'
                            ? 'Публічна'
                            : 'Для підписників'}
                        </div>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>{raw.id.slice(0, 8)}</TableCell>
                      <TableCell>{raw.authorId}</TableCell>
                      <TableCell className="w-[200px] break-words whitespace-normal">
                        {raw.title}
                      </TableCell>
                      <TableCell>{raw.author?.name ?? 'unknown'}</TableCell>
                      <TableCell>{raw.lang}</TableCell>
                      <TableCell>{raw.category.title}</TableCell>
                      <TableCell>{raw.commentsCount}</TableCell>
                      <TableCell>{raw.viewsCount}</TableCell>
                      <TableCell>{raw.likesCount}</TableCell>
                      <TableCell>{raw.status}</TableCell>
                      <TableCell>{raw.visibility}</TableCell>
                    </>
                  )}
                  <TableCell
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                    className="space-x-2 whitespace-normal [&_button]:mb-2"
                  >
                    {raw.isSystem && (
                      <EditSystemTopicDialog
                        topic={raw}
                        adminId={adminId}
                        onEdit={onEditSystemTopic}
                        systemUsers={systemUsers}
                      ></EditSystemTopicDialog>
                    )}
                    {raw.status === ForumContentStatus.PUBLISHED && (
                      <ModerationRemoveTopicDialog
                        id={raw.id}
                        adminId={adminId}
                        lang={raw.author?.settings?.lang}
                        targetUserId={raw.authorId}
                        onSuccessRemoveTopic={onSuccessRemoveTopic}
                      />
                    )}
                    {raw.status === ForumContentStatus.REMOVED_BY_MODERATOR && (
                      <ModerationRestoreTopicDialog
                        id={raw.id}
                        targetUserId={raw.authorId}
                        onRestore={async (id, targetUserId) => {
                          await handleRestore(id, targetUserId)
                          onSuccessRestoreTopic()
                        }}
                      />
                    )}
                    <ModerationDeleteTopicDialog
                      id={raw.id}
                      onSuccessDeleteTopic={onSuccessDeleteTopic}
                    />
                  </TableCell>
                </TableRow>

                {isOpen && (
                  <TableRow>
                    <TableCell
                      colSpan={variant === 'v2' ? 6 : 12}
                      className="p-0 whitespace-normal"
                    >
                      <div
                        className={
                          variant === 'v2'
                            ? 'community-details bg-muted/20 grid gap-6 border-t p-6'
                            : 'grid grid-cols-[minmax(260px,1fr)_minmax(0,2fr)] gap-6 border-t p-6'
                        }
                      >
                        <details
                          open={variant === 'classic' ? true : undefined}
                          className={
                            variant === 'v2'
                              ? 'order-last rounded-xl border p-4'
                              : undefined
                          }
                        >
                          <summary className="cursor-pointer text-sm font-medium">
                            Повні дані теми · JSON
                          </summary>

                          <div className="bg-background max-h-[1020px] overflow-auto rounded-md border p-3">
                            <JsonViewer data={raw} />
                          </div>
                        </details>

                        <div className="min-w-0">
                          <div className="mb-2 font-medium">Вміст</div>

                          <div className="mb-2 w-full rounded-md border p-4 text-sm font-medium break-words whitespace-normal">
                            {raw.content}
                          </div>

                          <div
                            ref={scrollRef}
                            className="bg-background max-h-[1020px] overflow-auto"
                          >
                            <Comments
                              key={raw.id}
                              scrollContainerRef={scrollRef}
                              topicId={raw.id}
                              adminId={adminId}
                              systemUsers={systemUsers}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <Button
                          onClick={() =>
                            loadModerationUserLogs(raw.authorId, 1)
                          }
                        >
                          Журнал користувача
                        </Button>
                      </div>
                      <div className="mb-4">
                        <UserLogsTable
                          moderationLogs={moderationLogs?.items ?? []}
                        />
                        <Pagination
                          page={moderationLogs?.page ?? 0}
                          pageCount={moderationLogs?.pageCount ?? 0}
                          onPress={(p) => {
                            // setPage(p)
                            void loadModerationUserLogs(raw.authorId, p)
                          }}
                          isComponent={true}
                        />
                      </div>
                      <div className="mb-4 h-1 w-full border-t"></div>
                      <div className="mb-4">
                        <Button
                          onClick={() => loadUserRestriction(raw.authorId)}
                        >
                          Перевірити обмеження
                        </Button>
                      </div>
                      {userRestriction && userRestriction.isRestricted && (
                        <div className="mb-4 flex gap-8">
                          <div>
                            <div>Status</div>
                            <div>
                              {userRestriction.isRestricted
                                ? 'Restricted'
                                : 'Not Restricted'}
                            </div>
                          </div>
                          <div className="h-[40px] w-1 border-l"></div>
                          <div>
                            <div>User ID</div>
                            <div>{userRestriction.restriction.userId}</div>
                          </div>
                          <div className="h-[40px] w-1 border-l"></div>
                          <div>
                            <div>Restricted By ID</div>
                            <div>
                              {userRestriction.restriction.createdByAdminId}
                            </div>
                          </div>
                          <div className="h-[40px] w-1 border-l"></div>
                          <div>
                            <div>Restricted By Name</div>
                            <div>
                              {userRestriction.restriction.createdByAdmin.name}
                            </div>
                          </div>
                          <div className="h-[40px] w-1 border-l"></div>
                          <div>
                            <div>Type</div>
                            <div>{userRestriction.restriction.type}</div>
                          </div>
                          <div className="h-[40px] w-1 border-l"></div>
                          <div>
                            <div>Reason</div>
                            <div>{userRestriction.restriction.reason}</div>
                          </div>
                          <div className="h-[40px] w-1 border-l"></div>
                          <div>
                            <div>StartsAt</div>
                            <div>
                              {new Date(
                                userRestriction.restriction.startsAt,
                              ).toLocaleString()}
                            </div>
                          </div>
                          <div className="h-[40px] w-1 border-l"></div>
                          <div>
                            <div>EndsAt</div>
                            <div>
                              {userRestriction.restriction.endsAt
                                ? new Date(
                                    userRestriction.restriction.endsAt,
                                  ).toLocaleString()
                                : 'null'}
                            </div>
                          </div>
                        </div>
                      )}
                      {userRestriction && !userRestriction.isRestricted && (
                        <div className="mb-4">Без обмежень</div>
                      )}
                      <div className="mb-4 h-1 w-full border-t"></div>

                      <div className="mb-10 flex gap-4">
                        <ModerationRestrictUserDialog
                          userId={raw.authorId}
                          adminId={adminId}
                          lang={raw.author?.settings?.lang}
                          violationCount={
                            moderationLogs && moderationLogs.items
                              ? moderationLogs.items.length
                              : 0
                          }
                          onSuccessRestriction={async () => {
                            await loadUserRestriction(raw.authorId)
                            await loadModerationUserLogs(raw.authorId, 1)
                          }}
                        />
                        <ModerationUnrestrictUser
                          userId={raw.authorId}
                          adminId={adminId}
                          onUnrestrict={async (
                            userId: number,
                            adminId: number,
                          ) => {
                            await handleUnrestrict(userId, adminId)
                            await loadUserRestriction(raw.authorId)
                            await loadModerationUserLogs(raw.authorId, 1)
                          }}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            )
          })}
      </TableBody>
    </Table>
  )
}
