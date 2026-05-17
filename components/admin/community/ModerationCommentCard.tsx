import {
  Comment,
  ForumContentStatus,
  ModerationLog,
  Restriction,
} from '@/types'
import { JsonViewer } from '@/components/ui/JsonViewer'
import { Button } from '@/components/ui/button'
import UserLogsTable from '@/components/admin/community/UserLogsTable'
import ModerationRestrictUserDialog from '@/components/admin/community/ModerationRestrictUserDialog'
import ModerationUnrestrictUser from '@/components/admin/community/ModerationUnrestrictUser'
import React, { useState } from 'react'
import ModerationRemoveCommentDialog from '@/components/admin/community/ModerationRemoveCommentDialog'
import ModerationRestoreCommentDialog from '@/components/admin/community/ModerationRestoreCommentDialog'
import { restoreComment, unrestrictUser } from '@/lib/api/moderation'
import { getModerationUserLogs, getUserRestriction } from '@/lib/api/community'
import Pagination from '@/components/ui/pagination'

type Props = {
  comment: Comment | null
  adminId: number
  onSuccessRemoveComment: () => void
  onSuccessRestoreComment: () => void
}

export default function ModerationCommentCard({
  comment,
  adminId,
  onSuccessRemoveComment,
  onSuccessRestoreComment,
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
  const handleRestore = async (commentId: string, targetUserId: number) => {
    await restoreComment(commentId, {
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
          <div>Author</div>
          <div>{comment?.author.name}</div>
        </div>
        <div className="h-5 w-1 border-l"></div>
        <div>
          <div>Lang</div>
          <div>{comment?.author.settings.lang}</div>
        </div>
        <div className="h-5 w-1 border-l"></div>
        <div>
          <div>Status</div>
          <div>{comment?.status}</div>
        </div>
        <div className="h-5 w-1 border-l"></div>
        <div>
          <div>CreatedAt</div>
          <div>{new Date(comment!.createdAt).toLocaleString()}</div>
        </div>
      </div>
      <div className="mt-8 flex gap-10">
        <div className="w-[40%]">
          <JsonViewer data={comment} />
        </div>
        <div className="flex w-[60%] flex-col gap-10">
          <div className="mb-10">{comment?.content}</div>
          <div>
            {comment?.status === ForumContentStatus.PUBLISHED && (
              <ModerationRemoveCommentDialog
                id={comment.id}
                adminId={adminId}
                lang={comment.author.settings.lang}
                targetUserId={comment.author.id}
                onSuccessRemoveComment={onSuccessRemoveComment}
              />
            )}
            {comment?.status === ForumContentStatus.REMOVED_BY_MODERATOR && (
              <ModerationRestoreCommentDialog
                id={comment.id}
                targetUserId={comment.author.id}
                onRestore={async (id: string, targetUserId: number) => {
                  await handleRestore(id, targetUserId)
                  onSuccessRestoreComment()
                }}
              />
            )}
          </div>
          <div>
            <div className="mb-4">
              <Button
                onClick={() => loadModerationUserLogs(comment!.authorId, 1)}
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
                  void loadModerationUserLogs(comment?.authorId as number, p)
                }}
                isComponent={true}
              />
            </div>
            <div className="mb-4 h-1 w-full border-t"></div>
            <div className="mb-4">
              <Button onClick={() => loadUserRestriction(comment!.authorId)}>
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
                userId={comment!.authorId}
                adminId={adminId}
                lang={comment!.author.settings.lang}
                violationCount={
                  moderationLogs && moderationLogs.items
                    ? moderationLogs.items.length
                    : 0
                }
                onSuccessRestriction={async () => {
                  await loadUserRestriction(comment!.authorId)
                  await loadModerationUserLogs(comment!.authorId, 1)
                }}
              />
              <ModerationUnrestrictUser
                userId={comment!.authorId}
                adminId={adminId}
                onUnrestrict={async (userId: number, adminId: number) => {
                  await handleUnrestrict(userId, adminId)
                  await loadUserRestriction(comment!.authorId)
                  await loadModerationUserLogs(comment!.authorId, 1)
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
