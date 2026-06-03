import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import React, { useMemo, useRef, useState } from 'react'
import { ActivityRecords, User } from '@/types'
import SendEmailDialog from '@/components/admin/admins/SendEmailDialog'
import { JsonViewer } from '@/components/ui/JsonViewer'
import { formatAcquisitionSource } from '@/lib/utils/formatAcquisitionSource'
import { Button } from '@/components/ui/button'
import UserLogs from '@/components/admin/user-list/UserLogs'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

type Props = {
  activityRecords: ActivityRecords[]
  onSuccessDelete?: () => void
}

const ACTIVITY_COLORS = {
  new: '#6FA77A',
  returning: '#C99A5B',
}

dayjs.extend(utc)

export default function UsersActivityTable({ activityRecords }: Props) {
  const [expandedUserId, setExpandedUserId] = useState<number | null>(null)

  const columnsCount = 10
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const toggle = (id: number) => {
    setExpandedUserId((prev) => (prev === id ? null : id))
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Uuid</TableHead>
          <TableHead>Id</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Country</TableHead>
          <TableHead>Plan</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Start</TableHead>
          <TableHead>Expiry</TableHead>
          <TableHead>Without Subs</TableHead>
          <TableHead>Entries</TableHead>
          <TableHead>Dialogs</TableHead>
          <TableHead>All Entries</TableHead>
          <TableHead>All Dialogs</TableHead>
          <TableHead>Goals</TableHead>
          <TableHead>All Goals</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Activity Day</TableHead>
          <TableHead>Last active</TableHead>
          <TableHead>Source</TableHead>
          {/*<TableHead>Action</TableHead>*/}
        </TableRow>
      </TableHeader>

      <TableBody>
        {activityRecords?.map((raw) => {
          const isOpen = expandedUserId === raw.id
          const isNewUserActivity =
            dayjs(raw.user.createdAt).utc().format('YYYY-MM-DD') === raw.day

          return (
            <React.Fragment key={raw.id}>
              <TableRow
                onClick={() => toggle(raw.id)}
                className="hover:bg-muted/50 cursor-pointer"
              >
                <TableCell>{raw.user.uuid}</TableCell>
                <TableCell>{raw.user.id}</TableCell>
                <TableCell>{raw.user.name}</TableCell>
                <TableCell>{raw.user.email}</TableCell>
                <TableCell>{raw.user.regionCode}</TableCell>
                <TableCell>{raw.user.plan?.name ?? '-'}</TableCell>
                <TableCell>{raw.user.plan?.planStatus ?? '-'}</TableCell>
                <TableCell>
                  {raw.user.plan?.startTime
                    ? new Date(raw.user.plan.startTime).toLocaleString()
                    : '-'}
                </TableCell>
                <TableCell>
                  {raw.user.plan?.expiryTime
                    ? new Date(raw.user.plan.expiryTime).toLocaleString()
                    : '-'}
                </TableCell>
                <TableCell>{!!raw?.user.usesWithoutSubscription}</TableCell>
                <TableCell>{raw?.entries}</TableCell>
                <TableCell>{raw?.dialogs}</TableCell>
                <TableCell>{raw?.user.entriesStats?.length}</TableCell>
                <TableCell>{raw?.user.dialogsStats?.length}</TableCell>
                <TableCell>{raw?.goals}</TableCell>
                <TableCell>{raw?.user.goalsStats?.length}</TableCell>
                <TableCell>
                  {raw?.user.createdAt
                    ? dayjs(raw.user.createdAt)
                        .utc()
                        .format('DD.MM.YYYY, HH:mm:ss')
                    : '-'}
                </TableCell>
                <TableCell
                  className={
                    isNewUserActivity
                      ? 'font-semibold text-[#6FA77A]'
                      : 'font-semibold text-[#C99A5B]'
                  }
                >
                  {raw.day ? dayjs(raw.day).format('DD.MM.YYYY') : '-'}
                </TableCell>
                <TableCell>
                  {raw?.user.lastActiveAt
                    ? dayjs(raw.user.lastActiveAt).utc().format('DD.MM.YYYY')
                    : '-'}
                </TableCell>
                <TableCell>
                  <div className="break-words whitespace-pre-line">
                    {formatAcquisitionSource(raw?.user.acquisitionMetaJson)}
                  </div>
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  {/*<Button*/}
                  {/*  onClick={() => {*/}
                  {/*    window.open(*/}
                  {/*      `/admin/users-list/logs?userUuid=${encodeURIComponent(raw.uuid)}`,*/}
                  {/*      '_blank',*/}
                  {/*      'noopener,noreferrer',*/}
                  {/*    )*/}
                  {/*  }}*/}
                  {/*>*/}
                  {/*  Logs*/}
                  {/*</Button>*/}
                  {/*<SendEmailDialog*/}
                  {/*  email={raw.email as any as string}*/}
                  {/*  lang={raw.settings?.lang}*/}
                  {/*/>*/}
                </TableCell>
              </TableRow>

              {isOpen && (
                <TableRow>
                  <TableCell colSpan={3} className="p-0">
                    <div className="bg-muted/20 border-t p-4">
                      <div className="mb-2 text-sm font-medium">
                        User details
                      </div>
                      <div className="bg-background max-h-[1020px] overflow-auto rounded-md border p-3">
                        <JsonViewer data={raw} />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell colSpan={12} className="p-0">
                    <div className="bg-muted/20 border-t p-4">
                      <div className="mb-2 text-sm font-medium">
                        User details
                      </div>

                      <div
                        ref={scrollRef}
                        className="bg-background max-h-[1020px] overflow-auto rounded-md border p-3"
                      >
                        <UserLogs
                          userUuid={raw.user.uuid}
                          scrollContainerRef={scrollRef}
                        />
                      </div>
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
