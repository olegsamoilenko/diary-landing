import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import React, { useState } from 'react'
import { forumAutoModerationLog, Restriction } from '@/types'
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

type Props = {
  moderationLogs: forumAutoModerationLog[]
  adminId: number
}
export default function ModerationLogsTable({
  moderationLogs,
  adminId,
}: Props) {
  const [expandedLogId, setExpandedLogId] = React.useState<string | null>(null)
  const [userRestriction, setUserRestriction] = useState<{
    isRestricted: boolean
    restriction: Restriction
  } | null>(null)
  const [violationCount, setViolationCount] = useState<number>(0)
  const toggle = (id: string) => {
    setExpandedLogId((prev) => (prev === id ? null : id))
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
          <TableHead className="w-22">ID</TableHead>
          <TableHead className="w-16">User Id</TableHead>
          <TableHead className="w-26">Type</TableHead>
          <TableHead className="w-36">Decision</TableHead>
          <TableHead>Reason</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {moderationLogs &&
          moderationLogs.map((raw: forumAutoModerationLog) => {
            const isOpen = expandedLogId === raw.id
            return (
              <React.Fragment key={raw.id}>
                <TableRow
                  onClick={() => toggle(raw.id)}
                  className="hover:bg-muted/50 cursor-pointer"
                >
                  <TableCell>{raw.id.slice(0, 8)}</TableCell>
                  <TableCell>{raw.userId}</TableCell>
                  <TableCell>{raw.targetType}</TableCell>
                  <TableCell>{raw.decision}</TableCell>
                  <TableCell>{raw.reason}</TableCell>
                </TableRow>
                {isOpen && (
                  <TableRow>
                    <TableCell colSpan={9} className="p-0">
                      <div className="bg-muted/20 grid grid-cols-[460px_1fr] gap-4 border-t p-4">
                        <div>
                          <div className="mb-2 text-sm font-medium">
                            Log details
                          </div>

                          <div className="bg-background max-h-[1020px] overflow-auto rounded-md border p-3">
                            <JsonViewer data={raw} />
                          </div>
                        </div>

                        <div className="min-w-0">
                          <div className="mb-2">Title</div>

                          <div className="mb-2 w-full rounded-md border p-4 text-sm font-medium">
                            {raw.titleText}
                          </div>
                          <div className="mb-2">Content</div>

                          <div className="mb-2 w-full rounded-md border p-4 text-sm font-medium">
                            {raw.contentText}
                          </div>
                        </div>
                      </div>
                      <div className="mb-4 h-1 w-full border-t"></div>
                      <div className="mb-4">
                        <Button onClick={() => loadUserRestriction(raw.userId)}>
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
                          userId={raw.userId}
                          adminId={adminId}
                          lang={raw.user?.settings?.lang}
                          violationCount={violationCount}
                          onSuccessRestriction={async () => {}}
                        />
                        <ModerationUnrestrictUser
                          userId={raw.userId}
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
