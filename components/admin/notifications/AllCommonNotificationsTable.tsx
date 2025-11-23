import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import React from 'react'
import type { CommonNotification } from '@/types'
import DeleteCommonNotificationsDialog from './DeleteCommonNotificationsDialog'

type Props = {
  notifications: CommonNotification[]
  onSuccessDelete?: () => void
}
export default function AllCommonNotificationsTable({
  notifications,
  onSuccessDelete,
}: Props) {
  const getHtml = (n: CommonNotification, locale: 'en' | 'uk') =>
    n.translations.find((t) => t.locale === locale)?.html || ''

  const getTitle = (n: CommonNotification, locale: 'en' | 'uk') =>
    n.translations.find((t) => t.locale === locale)?.title || ''

  return (
    <Table className="w-full table-fixed">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[60px]">Id</TableHead>
          <TableHead className="w-[160px]">CreatedAt</TableHead>
          <TableHead>EN</TableHead>
          <TableHead>UA</TableHead>
          <TableHead className="w-[100px]">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {notifications &&
          notifications.map((raw: CommonNotification) => (
            <TableRow key={raw.id}>
              <TableCell>{raw.id}</TableCell>
              <TableCell>{new Date(raw.createdAt).toLocaleString()}</TableCell>
              <TableCell>
                <h3 className="text-md mb-1 font-semibold">
                  {getTitle(raw, 'en')}
                </h3>
                <div
                  className="prose prose-sm dark:prose-invert break-words whitespace-normal"
                  style={{ wordBreak: 'break-word' }}
                  dangerouslySetInnerHTML={{
                    __html: getHtml(raw, 'en'),
                  }}
                />
              </TableCell>
              <TableCell>
                <h3 className="text-md mb-1 font-semibold">
                  {getTitle(raw, 'uk')}
                </h3>
                <div
                  className="prose prose-sm dark:prose-invert break-words whitespace-normal"
                  style={{ wordBreak: 'break-word' }}
                  dangerouslySetInnerHTML={{
                    __html: getHtml(raw, 'uk'),
                  }}
                />
              </TableCell>
              <TableCell>
                <DeleteCommonNotificationsDialog
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
