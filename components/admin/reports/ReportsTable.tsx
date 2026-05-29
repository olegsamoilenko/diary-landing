import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import React, { useState } from 'react'
import {
  forumAutoModerationLog,
  ForumContentStatus,
  ForumModerationTargetType,
  Restriction,
} from '@/types'
import { JsonViewer } from '@/components/ui/JsonViewer'
import Comments from '@/components/admin/community/Comments'
import { Button } from '@/components/ui/button'
import UserLogsTable from '@/components/admin/community/UserLogsTable'
import Pagination from '@/components/ui/pagination'
import ModerationRestrictUserDialog from '@/components/admin/community/ModerationRestrictUserDialog'
import ModerationUnrestrictUser from '@/components/admin/community/ModerationUnrestrictUser'
import { getUserRestriction } from '@/lib/api/community'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { unrestrictUser } from '@/lib/api/moderation'
import { ForumReportStatus, Report } from '@/types/reports'
import ModerationRemoveTopicDialog from '@/components/admin/community/ModerationRemoveTopicDialog'
import ModerationRemoveCommentDialog from '@/components/admin/community/ModerationRemoveCommentDialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { moderationTargetTypeOptions } from '@/lib/constants/community'
import { reportStatusOptions } from '@/lib/constants/report'
import { updateStatus } from '@/lib/api/reports'

type Props = {
  reports: Report[]
  adminId: number
  onSuccessRemoveTopic: () => void
  onSuccessRemoveComment: () => void
  onSuccessUpdateStatus: () => void
}
export default function ReportsTable({
  reports,
  adminId,
  onSuccessRemoveTopic,
  onSuccessRemoveComment,
  onSuccessUpdateStatus,
}: Props) {
  const [expandedReportId, setExpandedReportId] = React.useState<string | null>(
    null,
  )
  const [userRestriction, setUserRestriction] = useState<{
    isRestricted: boolean
    restriction: Restriction
  } | null>(null)
  const [violationCount, setViolationCount] = useState<number>(0)
  const [reportStatus, setReportStatus] = useState<ForumReportStatus | null>(
    null,
  )
  const toggle = (id: string) => {
    setExpandedReportId((prev) => (prev === id ? null : id))
  }

  const loadUserRestriction = async (userId: number) => {
    const resp = await getUserRestriction(userId)
    setUserRestriction(resp)
  }

  const handleUnrestrict = async (userId: number, adminId: number) => {
    await unrestrictUser(userId, { createdByAdminId: adminId })
  }

  const handleChangeStatus = async (reportId: string) => {
    await updateStatus(reportId, {
      status: reportStatus as ForumReportStatus,
      adminId,
    })
    onSuccessUpdateStatus()
  }
  return (
    <Table className="w-full table-fixed">
      <TableHeader>
        <TableRow>
          <TableHead className="w-22">ID</TableHead>
          <TableHead className="w-16">User Id</TableHead>
          <TableHead className="w-18">Nickname</TableHead>
          <TableHead className="w-26">Type</TableHead>
          <TableHead>Reason</TableHead>
          <TableHead className="w-36">Details</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Reviewed By</TableHead>
          <TableHead>Reviewed At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reports &&
          reports.map((raw: Report) => {
            const isOpen = expandedReportId === raw.id
            return (
              <React.Fragment key={raw.id}>
                <TableRow
                  onClick={() => toggle(raw.id)}
                  className="hover:bg-muted/50 cursor-pointer"
                >
                  <TableCell>{raw.id.slice(0, 8)}</TableCell>
                  <TableCell>{raw.reporterId}</TableCell>
                  <TableCell>{raw.reporterProfile.username}</TableCell>
                  <TableCell>{raw.targetType}</TableCell>
                  <TableCell>{raw.reason}</TableCell>
                  <TableCell>{raw.details}</TableCell>
                  <TableCell>{raw.status}</TableCell>
                  <TableCell>{raw.reviewedBy}</TableCell>
                  <TableCell>
                    {raw.reviewedAt
                      ? new Date(raw.reviewedAt).toLocaleString()
                      : '—'}
                  </TableCell>
                </TableRow>
                {isOpen && (
                  <TableRow>
                    <TableCell colSpan={9} className="p-0">
                      <div className="bg-muted/20 grid grid-cols-[460px_1fr] gap-4 border-t p-4">
                        <div>
                          <div className="mb-2 text-sm font-medium">
                            Report details
                          </div>

                          <div className="bg-background max-h-[1020px] overflow-auto rounded-md border p-3">
                            <JsonViewer data={raw} />
                          </div>
                        </div>

                        <div className="min-w-0">
                          <div className="mb-2">Target status</div>
                          {raw.targetType === 'topic' && (
                            <div className="mb-2">{raw.topic?.status}</div>
                          )}
                          {raw.targetType === 'comment' && (
                            <div className="mb-2">{raw.comment?.status}</div>
                          )}

                          <div className="mb-2">Title</div>

                          {raw.targetType === 'topic' && (
                            <div className="mb-2 w-full rounded-md border p-4 text-sm font-medium">
                              {raw.topic?.title}
                            </div>
                          )}
                          <div className="mb-2">Content</div>
                          {raw.targetType === 'topic' && (
                            <div className="mb-4 w-full rounded-md border p-4 text-sm font-medium break-words whitespace-normal">
                              {raw.topic?.content}
                            </div>
                          )}
                          {raw.targetType === 'comment' && (
                            <div className="mb-4 w-full rounded-md border p-4 text-sm font-medium break-words whitespace-normal">
                              {raw.comment?.content}
                            </div>
                          )}
                          <div className="mb-4">
                            {raw.targetType === 'topic' &&
                              raw.topic &&
                              raw.topic.status !==
                                ForumContentStatus.REMOVED_BY_MODERATOR && (
                                <ModerationRemoveTopicDialog
                                  id={raw.topic.id}
                                  adminId={adminId}
                                  lang={raw.topic?.authorSettings?.lang}
                                  targetUserId={raw.topic.authorId}
                                  onSuccessRemoveTopic={onSuccessRemoveTopic}
                                />
                              )}
                            {raw.targetType === 'comment' &&
                              raw.comment &&
                              raw.comment.status !==
                                ForumContentStatus.REMOVED_BY_MODERATOR && (
                                <ModerationRemoveCommentDialog
                                  id={raw.comment.id}
                                  adminId={adminId}
                                  lang={raw.comment.authorSettings?.lang}
                                  targetUserId={raw.comment.authorId}
                                  onSuccessRemoveComment={
                                    onSuccessRemoveComment
                                  }
                                />
                              )}
                          </div>
                          <div className="mb-2 flex items-end gap-4">
                            <div className="items-end">
                              <Label htmlFor="uuid" className="mb-2">
                                Status
                              </Label>
                              <Select
                                value={reportStatus as ForumReportStatus}
                                onValueChange={(s) => {
                                  setReportStatus(s as ForumReportStatus)
                                }}
                              >
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder="Period" />
                                </SelectTrigger>
                                <SelectContent>
                                  {reportStatusOptions.map((option) => (
                                    <SelectItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <Button
                              onClick={async () => {
                                await handleChangeStatus(raw.id)
                              }}
                            >
                              Change
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="mb-4 h-1 w-full border-t"></div>
                      <div className="mb-4">
                        <Button
                          onClick={() =>
                            loadUserRestriction(
                              raw.targetType === 'topic' && raw.topic
                                ? raw.topic.authorId
                                : raw.targetType === 'comment' && raw.comment
                                  ? raw.comment?.authorId
                                  : 0,
                            )
                          }
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

                      <div className="mb-10 flex items-end gap-4">
                        <div>
                          <Label htmlFor="email" className="mb-2">
                            Violation Count
                          </Label>
                          <Input
                            id="violationCount"
                            type="number"
                            value={violationCount as number}
                            onChange={(e) =>
                              setViolationCount(Number(e.target.value))
                            }
                            placeholder="ID"
                          />
                        </div>
                        <ModerationRestrictUserDialog
                          userId={
                            raw.targetType === 'topic' && raw.topic
                              ? raw.topic.authorId
                              : raw.targetType === 'comment' && raw.comment
                                ? raw.comment.authorId
                                : 0
                          }
                          adminId={adminId}
                          lang={
                            raw.targetType === 'topic' && raw.topic
                              ? raw.topic.authorSettings?.lang
                              : raw.targetType === 'comment' && raw.comment
                                ? raw.comment?.authorSettings?.lang
                                : 'en'
                          }
                          violationCount={violationCount}
                          onSuccessRestriction={async () => {}}
                        />
                        <ModerationUnrestrictUser
                          userId={
                            raw.targetType === 'topic' && raw.topic
                              ? raw.topic.authorId
                              : raw.targetType === 'comment' && raw.comment
                                ? raw.comment?.authorId
                                : 0
                          }
                          adminId={adminId}
                          onUnrestrict={async (
                            userId: number,
                            adminId: number,
                          ) => {
                            await handleUnrestrict(userId, adminId)
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
