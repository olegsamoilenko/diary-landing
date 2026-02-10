import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import React from 'react'
import { Log, LogsLevel, ServerLog } from '@/types'
import { RenderValue, normalizeData } from '@/lib/utils/log-render'

type Props = {
  logs: ServerLog[]
}
export default function ServerLogsTable({ logs }: Props) {
  function levelColor(level: unknown): string {
    const v = String(level).toLowerCase().trim()
    switch (v) {
      case 'error':
        return 'rgb(239 68 68)'
      case 'warn':
      case 'warning':
        return 'rgb(234 179 8)'
      case 'info':
        return 'rgb(34 197 94)'
      default:
        return 'inherit'
    }
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Error Message</TableHead>
          <TableHead>IP</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Kind</TableHead>
          <TableHead>Level</TableHead>
          <TableHead>Method</TableHead>
          <TableHead>Path</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>User Uuid</TableHead>
          <TableHead>User Id</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {logs &&
          logs.map((raw: ServerLog) => (
            <TableRow key={raw.id}>
              <TableCell
                className={`border-l-4 font-medium`}
                style={{ borderColor: levelColor(raw.level) }}
              >
                {raw.errorName}
              </TableCell>
              <TableCell>{raw.errorMessage}</TableCell>
              <TableCell>{raw.ip}</TableCell>
              <TableCell>{new Date(raw.ts).toLocaleString()}</TableCell>
              <TableCell>{raw.kind}</TableCell>
              <TableCell className="!text-inherit">
                <span style={{ color: levelColor(raw.level), fontWeight: 600 }}>
                  {String(raw.level)}
                </span>
              </TableCell>
              <TableCell>{raw.method}</TableCell>
              <TableCell>{raw.path}</TableCell>
              <TableCell>{raw.status}</TableCell>
              <TableCell>{raw.userUuid}</TableCell>
              <TableCell>{raw.userId}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}
