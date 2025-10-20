import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import React from 'react'
import type { ReleaseNotification } from '@/types'
import DeleteReleaseNotificationsDialog from './DeleteReleaseNotificationsDialog'

type Props = {
  notifications: ReleaseNotification[]
  onSuccessDelete?: () => void
}
export default function AllReleaseNotificationsTable({
  notifications,
  onSuccessDelete,
}: Props) {
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
          <TableHead>Action</TableHead>
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
              <TableCell>
                <DeleteReleaseNotificationsDialog
                  id={Number(raw.id)}
                  onSuccessDelete={onSuccessDelete}
                />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}
