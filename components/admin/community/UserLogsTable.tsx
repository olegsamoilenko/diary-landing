import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import React from 'react'
import { ModerationLog } from '@/types'

type Props = {
  moderationLogs: ModerationLog[] | null
}
export default function UserLogsTable({ moderationLogs }: Props) {
  return (
    <Table className="w-full table-fixed">
      <TableHeader>
        <TableRow>
          <TableHead>User ID</TableHead>
          <TableHead>Action</TableHead>
          <TableHead>Reason</TableHead>
          <TableHead>Note</TableHead>
          <TableHead>CreatedAt</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {moderationLogs &&
          moderationLogs.map((raw: ModerationLog) => {
            return (
              <React.Fragment key={raw.id}>
                <TableRow className="hover:bg-muted/50 cursor-pointer">
                  <TableCell>{raw.targetUserId}</TableCell>
                  <TableCell>{raw.action}</TableCell>
                  <TableCell>{raw.reason}</TableCell>
                  <TableCell>{raw.note}</TableCell>
                  <TableCell>
                    {new Date(raw.createdAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              </React.Fragment>
            )
          })}
      </TableBody>
    </Table>
  )
}
