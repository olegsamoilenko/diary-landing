import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { UserEntryResponse } from '@/types'
import React, { useEffect, useMemo, useState } from 'react'
import type { ReleaseNotification } from '@/types'
import { Button } from '@/components/ui/button'

type Props = {
  notifications: ReleaseNotification[]
}
export default function EntriesByUserTable({ notifications }: Props) {
  const getHtml = (n: ReleaseNotification, locale: 'en' | 'uk') =>
    n.translations.find((t) => t.locale === locale)?.html || ''

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Platform</TableHead>
          <TableHead>Build</TableHead>
          <TableHead>CreatedAt</TableHead>
          <TableHead>EN</TableHead>
          <TableHead>UA</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {notifications &&
          notifications.map((raw: ReleaseNotification) => (
            <TableRow key={raw.id}>
              <TableCell className="font-medium">{raw.platform}</TableCell>
              <TableCell>{raw.build}</TableCell>
              <TableCell>{new Date(raw.createdAt).toLocaleString()}</TableCell>
              <TableCell>
                <div
                  className="prose prose-sm dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: getHtml(raw, 'en'),
                  }}
                />
              </TableCell>
              <TableCell>
                <div
                  className="prose prose-sm dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: getHtml(raw, 'uk'),
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}
