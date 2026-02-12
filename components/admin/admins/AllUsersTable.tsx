import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import React, { useMemo, useState } from 'react'
import type { User } from '@/types'
import SendEmailDialog from '@/components/admin/admins/SendEmailDialog'
import { JsonViewer } from '@/components/ui/JsonViewer'

type Props = {
  users: User[]
  onSuccessDelete?: () => void
}

export default function AllUsersTable({ users }: Props) {
  const [expandedUserId, setExpandedUserId] = useState<number | null>(null)

  const columnsCount = 10

  const toggle = (id: number) => {
    setExpandedUserId((prev) => (prev === id ? null : id))
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Uuid</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Plan</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Start</TableHead>
          <TableHead>Expiry</TableHead>
          <TableHead>Entries</TableHead>
          <TableHead>Dialogs</TableHead>
          <TableHead>Created At</TableHead>
          {/*<TableHead>Action</TableHead>*/}
        </TableRow>
      </TableHeader>

      <TableBody>
        {users?.map((raw) => {
          const isOpen = expandedUserId === raw.id

          return (
            <React.Fragment key={raw.id}>
              <TableRow
                onClick={() => toggle(raw.id)}
                className="hover:bg-muted/50 cursor-pointer"
              >
                <TableCell>{raw.uuid}</TableCell>
                <TableCell>{raw.name}</TableCell>
                <TableCell>{raw.email}</TableCell>
                <TableCell>{raw.plan?.name ?? '-'}</TableCell>
                <TableCell>{raw.plan?.planStatus ?? '-'}</TableCell>
                <TableCell>
                  {raw.plan?.startTime
                    ? new Date(raw.plan.startTime).toLocaleString()
                    : '-'}
                </TableCell>
                <TableCell>
                  {raw.plan?.expiryTime
                    ? new Date(raw.plan.expiryTime).toLocaleString()
                    : '-'}
                </TableCell>
                <TableCell>{raw?.entriesStatsCount ?? 0}</TableCell>
                <TableCell>{raw?.dialogsStatsCount ?? 0}</TableCell>
                <TableCell>
                  {new Date(raw?.createdAt).toLocaleString()}
                </TableCell>
                {/*<TableCell onClick={(e) => e.stopPropagation()}>*/}
                {/*  <SendEmailDialog*/}
                {/*    email={raw.email as any as string}*/}
                {/*    lang={raw.settings?.lang}*/}
                {/*  />*/}
                {/*</TableCell>*/}
              </TableRow>

              {isOpen && (
                <TableRow>
                  <TableCell colSpan={columnsCount} className="p-0">
                    <div className="bg-muted/20 border-t p-4">
                      <div className="mb-2 text-sm font-medium">
                        User details
                      </div>
                      <div className="bg-background max-h-[620px] overflow-auto rounded-md border p-3">
                        <JsonViewer data={raw} />
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
