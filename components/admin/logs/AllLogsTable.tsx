import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import React from 'react'
import { Log, LogsLevel } from '@/types'
import { RenderValue, normalizeData } from '@/lib/utils/log-render'

type Props = {
  logs: Log[]
}
export default function EntriesByUserTable({ logs }: Props) {
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
          <TableHead>Data</TableHead>
          <TableHead>App and Device</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Kind</TableHead>
          <TableHead>Level</TableHead>
          <TableHead>User Uuid</TableHead>
          <TableHead>User Id</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {logs &&
          logs.map((raw: Log) => (
            <TableRow key={raw.id}>
              <TableCell
                className={`border-l-4 font-medium`}
                style={{ borderColor: levelColor(raw.level) }}
              >
                {raw.name}
              </TableCell>
              <TableCell className="whitespace-pre-wrap">
                <div
                  style={{
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    overflowWrap: 'anywhere',
                  }}
                >
                  {normalizeData(raw.data).map(([key, val]) => (
                    <div key={key} style={{ marginBottom: 4 }}>
                      <strong>{key}:</strong> <RenderValue value={val} />
                    </div>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <h3 className="font-bold">App:</h3>
                <div className="mb-6">
                  {raw.appData &&
                    Object.entries(raw.appData).map(([key, value]) => (
                      <div key={key}>
                        <strong>{key}:</strong> {String(value)}
                      </div>
                    ))}
                </div>
                <h3 className="font-bold">Device:</h3>
                <div>
                  {raw.device &&
                    Object.entries(raw.device).map(([key, value]) => (
                      <div key={key}>
                        <strong>{key}:</strong> {String(value)}
                      </div>
                    ))}
                </div>
              </TableCell>
              <TableCell>{new Date(raw.ts).toLocaleString()}</TableCell>
              <TableCell>{raw.kind}</TableCell>
              <TableCell className="!text-inherit">
                <span style={{ color: levelColor(raw.level), fontWeight: 600 }}>
                  {String(raw.level)}
                </span>
              </TableCell>
              <TableCell>{raw.userUuid}</TableCell>
              <TableCell>{raw.userId}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}
