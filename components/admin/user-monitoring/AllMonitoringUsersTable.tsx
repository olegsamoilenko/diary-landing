import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import React, { useMemo, useRef, useState } from 'react'
import type { User } from '@/types'
import SendEmailDialog from '@/components/admin/admins/SendEmailDialog'
import { JsonViewer } from '@/components/ui/JsonViewer'
import { formatAcquisitionSource } from '@/lib/utils/formatAcquisitionSource'
import { Button } from '@/components/ui/button'
import UserLogs from '@/components/admin/user-list/UserLogs'
import { UserMonitoringRes } from '@/types/monitoring'
import { deleteUserMonitoring } from '@/lib/api/monitoring'

type Props = {
  monitoringRes: UserMonitoringRes[] | []
  onSuccessDelete?: () => void
}

export default function AllMonitoringUsersTable({
  monitoringRes,
  onSuccessDelete,
}: Props) {
  const [expandedUserId, setExpandedUserId] = useState<number | null>(null)

  const columnsCount = 10
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const toggle = (id: number) => {
    setExpandedUserId((prev) => (prev === id ? null : id))
  }

  const deleteUserFromMonitoring = async (id: number) => {
    try {
      await deleteUserMonitoring(id)
      onSuccessDelete?.()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Type</TableHead>
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
          <TableHead>Created At</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {monitoringRes?.map((raw) => {
          const isOpen = expandedUserId === raw.id

          return (
            <React.Fragment key={raw.id}>
              <TableRow
                onClick={() => toggle(raw.id)}
                className="hover:bg-muted/50 cursor-pointer"
              >
                <TableCell>{raw.user.id}</TableCell>
                <TableCell>{raw.type}</TableCell>
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
                <TableCell>
                  {raw?.user.usesWithoutSubscription.toString()}
                </TableCell>
                <TableCell>{raw?.user.entriesStatsCount ?? 0}</TableCell>
                <TableCell>{raw?.user.dialogsStatsCount ?? 0}</TableCell>
                <TableCell>
                  {new Date(raw?.user.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>{raw.description}</TableCell>
              </TableRow>

              {isOpen && (
                <TableRow>
                  <TableCell colSpan={3} className="p-0">
                    <Button
                      onClick={() => deleteUserFromMonitoring(raw.id)}
                      variant="destructive"
                      className="mb-4"
                    >
                      Delete
                    </Button>
                    <div className="bg-muted/20 border-t p-4">
                      <div className="mb-2 text-sm font-medium">
                        User details
                      </div>
                      <div className="bg-background max-h-[1020px] overflow-auto rounded-md border p-3">
                        <JsonViewer data={raw.user} />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell colSpan={12} className="p-0">
                    <div className="bg-muted/20 border-t p-4">
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
