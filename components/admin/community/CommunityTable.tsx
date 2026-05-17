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

type Props = {
  topics: Topic[]
  adminId: number
  onSuccessRemoveTopic: () => void
  onSuccessRestoreTopic: () => void
}
export default function CommunityTable({
  topics,
  adminId,
  onSuccessRemoveTopic,
  onSuccessRestoreTopic,
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

  const toggle = (id: string) => {
    setExpandedTopicId((prev) => (prev === id ? null : id))
  }

  const handleRestore = async (topicId: string, targetUserId: number) => {
    await restoreTopic(topicId, {
      moderationRestoredByAdminId: adminId,
      targetUserId,
    })
  }

  const loadModerationUserLogs = async (userId: number, page: number) => {
    const raw = await getModerationUserLogs(userId, { page: page, limit: 20 })
    setModerationLogs(raw)
  }

  const loadUserRestriction = async (userId: number) => {
    const resp = await getUserRestriction(userId)
    setUserRestriction(resp)
  }

  const handleUnrestrict = async (userId: number, adminId: number) => {
    await unrestrictUser(userId, { createdByAdminId: adminId })
  }

  return (
    <Table className="w-full table-fixed">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">A ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Author</TableHead>
          <TableHead className="w-[50px]">Lang</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="w-[90px]">Comments</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Visibility</TableHead>
          <TableHead className="w-[100px]">Actions</TableHead>
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
                  <TableCell>{raw.authorId}</TableCell>
                  <TableCell>{raw.title}</TableCell>
                  <TableCell>{raw.author.name}</TableCell>
                  <TableCell>{raw.author.settings.lang}</TableCell>
                  <TableCell>{raw.category.title}</TableCell>
                  <TableCell>{raw.commentsCount}</TableCell>
                  <TableCell>{raw.status}</TableCell>
                  <TableCell>{raw.visibility}</TableCell>
                  <TableCell
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                  >
                    {raw.status === ForumContentStatus.PUBLISHED && (
                      <ModerationRemoveTopicDialog
                        id={raw.id}
                        adminId={adminId}
                        lang={raw.author.settings.lang}
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
                  </TableCell>
                </TableRow>

                {isOpen && (
                  <TableRow>
                    <TableCell colSpan={7} className="p-0">
                      <div className="bg-muted/20 grid grid-cols-[460px_1fr] gap-4 border-t p-4">
                        <div>
                          <div className="mb-2 text-sm font-medium">
                            Topic details
                          </div>

                          <div className="bg-background max-h-[1020px] overflow-auto rounded-md border p-3">
                            <JsonViewer data={raw} />
                          </div>
                        </div>

                        <div className="min-w-0">
                          <div className="mb-2">Content</div>

                          <div className="mb-2 w-full rounded-md border p-4 text-sm font-medium">
                            {raw.content}
                          </div>

                          <div
                            ref={scrollRef}
                            className="bg-background max-h-[1020px] overflow-auto"
                          >
                            <Comments topicId={raw.id} adminId={adminId} />
                          </div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <Button
                          onClick={() =>
                            loadModerationUserLogs(raw.authorId, 1)
                          }
                        >
                          Load user logs
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
                          Get user restriction
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
                        <div className="mb-4">Not Restricted</div>
                      )}
                      <div className="mb-4 h-1 w-full border-t"></div>

                      <div className="mb-10 flex gap-4">
                        <ModerationRestrictUserDialog
                          userId={raw.authorId}
                          adminId={adminId}
                          lang={raw.author.settings.lang}
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
