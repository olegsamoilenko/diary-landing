import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import React, { useRef, useState } from 'react'
import type { User } from '@/types'
import { JsonViewer } from '@/components/ui/JsonViewer'
import { formatAcquisitionSource } from '@/lib/utils/formatAcquisitionSource'
import UserLogs from '@/components/admin/user-list/UserLogs'
import { plannerCreationColumns } from '@/lib/utils/userCreationStats'
import type { AdminUserSummary, AnalysisCounts } from '@/types/user'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import AdminUserDetails from '@/components/admin/user-list/AdminUserDetails'
import { formatAdminDate } from '@/lib/utils/adminDates'

type Props = {
  users: User[] | AdminUserSummary[]
  variant?: 'classic' | 'v2'
  onSuccessDelete?: () => void
}

const analysisLegend = 'З аналізом / без аналізу / без ознаки'
function formatAnalysis(counts: AnalysisCounts | undefined) {
  return counts
    ? `${counts.withAnalysis} / ${counts.withoutAnalysis} / ${counts.unknown}`
    : '— / — / —'
}

export default function AllUsersTable({ users, variant = 'classic' }: Props) {
  const [expandedUserId, setExpandedUserId] = useState<number | null>(null)

  const columnsCount = 17 + plannerCreationColumns.length
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const toggle = (id: number) => {
    setExpandedUserId((prev) => (prev === id ? null : id))
  }

  if (variant === 'v2')
    return (
      <Table className="min-w-[1380px] table-fixed">
        <colgroup>
          {[48, 72, 160, 130, 80, 510, 160, 220].map((width, i) => (
            <col key={i} style={{ width }} />
          ))}
        </colgroup>
        <TableHeader>
          <TableRow className="bg-muted/40">
            {[
              '',
              'ID',
              'Name',
              'План',
              'Країна',
              'Створення сутностей',
              'Реєстрація · Київ',
              'Джерело',
            ].map((label, i) => (
              <TableHead key={i}>{label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => {
            const isOpen = expandedUserId === user.id
            const formatted = formatAcquisitionSource(user.acquisitionMetaJson)
            const source =
              formatted === 'Unknown'
                ? user.acquisitionSource || 'Невідомо'
                : formatted
            const counts: [string, number | string | undefined, string?][][] = [
              [
                [
                  'Записи',
                  formatAnalysis(user.entriesAnalysis),
                  analysisLegend,
                ],
                ['Діалоги записів', user.dialogsStatsCount],
                [
                  'Чекіни',
                  formatAnalysis(user.checkinsAnalysis),
                  analysisLegend,
                ],
                ['Діалоги чекінів', user.checkinDialogsStatsCount],
              ],
              [
                ['Цілі', user.plannerCreatedCounts?.goal],
                ['Події', user.plannerCreatedCounts?.event],
                ['Завдання', user.plannerCreatedCounts?.task],
                ['Нагадування', user.plannerCreatedCounts?.reminder],
              ],
              [
                ['Звички', user.plannerCreatedCounts?.habit],
                ['Чеклісти', user.plannerCreatedCounts?.checklist],
                ['Нотатки', user.plannerCreatedCounts?.note],
              ],
            ]
            return (
              <React.Fragment key={user.id}>
                <TableRow
                  data-state={isOpen ? 'selected' : undefined}
                  className="cursor-pointer align-top"
                  onClick={() => toggle(user.id)}
                >
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Деталі користувача ${user.id}`}
                      aria-expanded={isOpen}
                      aria-controls={
                        isOpen ? `user-details-${user.id}` : undefined
                      }
                      onClick={(event) => {
                        event.stopPropagation()
                        toggle(user.id)
                      }}
                    >
                      <ChevronDown
                        className={`size-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </Button>
                  </TableCell>
                  <TableCell className="pt-4 tabular-nums">{user.id}</TableCell>
                  <TableCell className="pt-4 font-medium break-words whitespace-normal">
                    {user.name || 'Без імені'}
                  </TableCell>
                  <TableCell className="pt-4 break-words whitespace-normal">
                    <span className="bg-accent text-accent-foreground inline-block rounded-lg px-2 py-1 text-xs">
                      {user.plan?.name || 'Без підписки'}
                    </span>
                  </TableCell>
                  <TableCell className="pt-4">
                    {user.regionCode || '—'}
                  </TableCell>
                  <TableCell>
                    <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-x-5 py-1">
                      {counts.map((group, index) => (
                        <div key={index} className="space-y-1.5">
                          {group.map(([label, count, hint]) => (
                            <div
                              key={String(label)}
                              title={hint}
                              className="flex items-center justify-between gap-2 text-xs"
                            >
                              <span className="text-muted-foreground">
                                {label}
                              </span>
                              <span
                                className="font-medium whitespace-nowrap tabular-nums"
                                aria-label={
                                  hint
                                    ? `${label}: ${count}. ${hint}`
                                    : undefined
                                }
                              >
                                {count ?? '—'}
                              </span>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="pt-4 whitespace-normal tabular-nums">
                    {formatAdminDate(user.createdAt)}
                  </TableCell>
                  <TableCell className="pt-4">
                    <div
                      className="line-clamp-3 w-[196px] overflow-hidden text-xs break-all whitespace-pre-line"
                      title={source}
                    >
                      {source}
                    </div>
                  </TableCell>
                </TableRow>
                {isOpen && (
                  <TableRow>
                    <TableCell colSpan={8} className="p-0">
                      <AdminUserDetails user={user} />
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            )
          })}
        </TableBody>
      </Table>
    )

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
          <TableHead>Entry dialogs</TableHead>
          <TableHead>Checkins</TableHead>
          <TableHead>Checkin dialogs</TableHead>
          {plannerCreationColumns.map(({ type, label }) => (
            <TableHead key={type}>{label}</TableHead>
          ))}
          <TableHead>Created At</TableHead>
          <TableHead>Last active</TableHead>
          <TableHead>Source</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {(users as User[])?.map((raw) => {
          const isOpen = expandedUserId === raw.id

          return (
            <React.Fragment key={raw.id}>
              <TableRow
                onClick={() => toggle(raw.id)}
                className="hover:bg-muted/50 cursor-pointer"
              >
                <TableCell>{raw.uuid}</TableCell>
                <TableCell>{raw.id}</TableCell>
                <TableCell>{raw.name}</TableCell>
                <TableCell>{raw.email}</TableCell>
                <TableCell>{raw.regionCode}</TableCell>
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
                <TableCell>{!!raw?.usesWithoutSubscription}</TableCell>
                <TableCell>{raw?.entriesStatsCount ?? 0}</TableCell>
                <TableCell>{raw?.dialogsStatsCount ?? 0}</TableCell>
                <TableCell>{raw?.checkinsStatsCount ?? 0}</TableCell>
                <TableCell>{raw?.checkinDialogsStatsCount ?? 0}</TableCell>
                {plannerCreationColumns.map(({ type }) => (
                  <TableCell key={type}>
                    {raw.plannerCreatedCounts?.[type] ?? '—'}
                  </TableCell>
                ))}
                <TableCell>
                  {new Date(raw?.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  {new Date(raw?.lastActiveAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <div className="break-words whitespace-pre-line">
                    {formatAcquisitionSource(raw?.acquisitionMetaJson)}
                  </div>
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
                  <TableCell colSpan={columnsCount - 3} className="p-0">
                    <div className="bg-muted/20 border-t p-4">
                      <div className="mb-2 text-sm font-medium">
                        User details
                      </div>

                      <div
                        ref={scrollRef}
                        className="bg-background max-h-[1020px] overflow-auto rounded-md border p-3"
                      >
                        <UserLogs
                          userUuid={raw.uuid}
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
