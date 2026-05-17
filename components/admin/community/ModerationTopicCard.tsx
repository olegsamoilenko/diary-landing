import { ForumContentStatus, ModerationLog, Restriction, Topic } from '@/types'
import { JsonViewer } from '@/components/ui/JsonViewer'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import UserLogsTable from '@/components/admin/community/UserLogsTable'
import { getModerationUserLogs, getUserRestriction } from '@/lib/api/community'
import ModerationRemoveTopicDialog from '@/components/admin/community/ModerationRemoveTopicDialog'
import ModerationRestoreTopicDialog from '@/components/admin/community/ModerationRestoreTopicDialog'
import { restoreTopic, unrestrictUser } from '@/lib/api/moderation'
import ModerationRestrictUserDialog from './ModerationRestrictUserDialog'
import ModerationUnrestrictUser from '@/components/admin/community/ModerationUnrestrictUser'
import Pagination from '@/components/ui/pagination'

type Props = {
  topic: Topic | null
  adminId: number
  onSuccessRemoveTopic: () => void
  onSuccessRestoreTopic: () => void
}

export default function ModerationTopicCard({
  topic,
  adminId,
  onSuccessRemoveTopic,
  onSuccessRestoreTopic,
}: Props) {
  const [moderationLogs, setModerationLogs] = useState<{
    items: ModerationLog[] | null
    page: number
    pageCount: number
  } | null>(null)
  const [userRestriction, setUserRestriction] = useState<{
    isRestricted: boolean
    restriction: Restriction
  } | null>(null)

  const loadModerationUserLogs = async (userId: number, page: number) => {
    const raw = await getModerationUserLogs(userId, { page: page, limit: 20 })
    setModerationLogs(raw)
  }

  const handleRestore = async (topicId: string, targetUserId: number) => {
    await restoreTopic(topicId, {
      moderationRestoredByAdminId: adminId,
      targetUserId,
    })
  }

  const loadUserRestriction = async (userId: number) => {
    const resp = await getUserRestriction(userId)
    setUserRestriction(resp)
  }

  const handleUnrestrict = async (userId: number, adminId: number) => {
    await unrestrictUser(userId, { createdByAdminId: adminId })
  }
  return (
    <div>
      <div className="flex items-center gap-10">
        <div>
          <div>Title</div>
          <div>{topic?.title}</div>
        </div>
        <div className="h-5 w-1 border-l"></div>
        <div>
          <div>Author</div>
          <div>{topic?.author.name}</div>
        </div>
        <div className="h-5 w-1 border-l"></div>
        <div>
          <div>Lang</div>
          <div>{topic?.author.settings.lang}</div>
        </div>
        <div className="h-5 w-1 border-l"></div>
        <div>
          <div>Category</div>
          <div>{topic?.category.title}</div>
        </div>
        <div className="h-5 w-1 border-l"></div>
        <div>
          <div> Comments</div>
          <div>{topic?.commentsCount}</div>
        </div>
        <div className="h-5 w-1 border-l"></div>
        <div>
          <div>Status</div>
          <div>{topic?.status}</div>
        </div>
        <div className="h-5 w-1 border-l"></div>
        <div>
          <div>Visibility</div>
          <div>{topic?.visibility}</div>
        </div>
      </div>
      <div className="mt-8 flex gap-10">
        <div className="w-[40%]">
          <JsonViewer data={topic} />
        </div>
        <div className="flex w-[60%] flex-col gap-10">
          <div className="mb-10">{topic?.content}</div>
          <div>
            {topic?.status === ForumContentStatus.PUBLISHED && (
              <ModerationRemoveTopicDialog
                id={topic.id}
                adminId={adminId}
                lang={topic.author.settings.lang}
                targetUserId={topic.authorId}
                onSuccessRemoveTopic={onSuccessRemoveTopic}
              />
            )}
            {topic?.status === ForumContentStatus.REMOVED_BY_MODERATOR && (
              <ModerationRestoreTopicDialog
                id={topic?.id}
                targetUserId={topic?.authorId}
                onRestore={async (id, targetUserId) => {
                  await handleRestore(id, targetUserId)
                  onSuccessRestoreTopic()
                }}
              />
            )}
          </div>
          <div>
            <div className="mb-4">
              <Button
                onClick={() => loadModerationUserLogs(topic!.authorId, 1)}
              >
                Load user logs
              </Button>
            </div>
            <div className="mb-4">
              <UserLogsTable moderationLogs={moderationLogs?.items ?? []} />
              <Pagination
                page={moderationLogs?.page ?? 0}
                pageCount={moderationLogs?.pageCount ?? 0}
                onPress={(p) => {
                  // setPage(p)
                  void loadModerationUserLogs(topic?.authorId as number, p)
                }}
                isComponent={true}
              />
            </div>
            <div className="mb-4 h-1 w-full border-t"></div>
            <div className="mb-4">
              <Button onClick={() => loadUserRestriction(topic!.authorId)}>
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
                  <div>{userRestriction.restriction.createdByAdminId}</div>
                </div>
                <div className="h-[40px] w-1 border-l"></div>
                <div>
                  <div>Restricted By Name</div>
                  <div>{userRestriction.restriction.createdByAdmin.name}</div>
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
                userId={topic!.authorId}
                adminId={adminId}
                lang={topic!.author.settings.lang}
                violationCount={
                  moderationLogs && moderationLogs.items
                    ? moderationLogs.items.length
                    : 0
                }
                onSuccessRestriction={async () => {
                  await loadUserRestriction(topic!.authorId)
                  await loadModerationUserLogs(topic!.authorId, 1)
                }}
              />
              <ModerationUnrestrictUser
                userId={topic!.authorId}
                adminId={adminId}
                onUnrestrict={async (userId: number, adminId: number) => {
                  await handleUnrestrict(userId, adminId)
                  await loadUserRestriction(topic!.authorId)
                  await loadModerationUserLogs(topic!.authorId, 1)
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
