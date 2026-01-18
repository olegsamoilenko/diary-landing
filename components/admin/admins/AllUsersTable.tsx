import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import React from 'react'
import type { ReleaseNotification, User } from '@/types'
import SendEmailDialog from '@/components/admin/admins/SendEmailDialog'

type Props = {
  users: User[]
  onSuccessDelete?: () => void
}
export default function AllUsersTable({ users, onSuccessDelete }: Props) {
  const getHtml = (n: ReleaseNotification, locale: 'en' | 'uk') =>
    n.translations.find((t) => t.locale === locale)?.html || ''

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Uuid</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Plan</TableHead>
          <TableHead>Entries</TableHead>
          <TableHead>Dialogs</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users &&
          users.map((raw: User) => (
            <TableRow key={raw.id}>
              <TableCell>{raw.uuid}</TableCell>
              <TableCell>{raw.email}</TableCell>
              <TableCell>{raw.plan?.name}</TableCell>
              <TableCell>{raw?.entriesStatsCount}</TableCell>
              <TableCell>{raw?.dialogsStatsCount}</TableCell>
              <TableCell>
                <SendEmailDialog
                  email={raw.email as User['email'] as string}
                  lang={raw.settings.lang}
                />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}
