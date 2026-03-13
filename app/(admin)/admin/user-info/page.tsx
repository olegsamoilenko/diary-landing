'use client'

import React, { useEffect, useState, use, useRef } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { getAll, getUser } from '@/lib/api/users'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import ChangeRoleDialog from '@/components/admin/admins/ChangeRoleDialog'
import {
  GetAllUsersResp,
  Granularity,
  PlanStatus,
  User,
  SortBy,
  HasPlan,
  Limit,
  Log,
  LogsLevel,
} from '@/types'
import { getErrorMessage } from '@/lib/errors'
import ChangeStatusDialog from '@/components/admin/admins/ChangeStatusDialog'
import { JsonViewer } from '@/components/ui/JsonViewer'
import AllUsersTable from '@/components/admin/admins/AllUsersTable'
import Pagination from '@/components/ui/pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { UsersHavePlanOptions, UsersSortByOptions } from '@/lib/constants/users'
import { LimitOptions } from '@/lib/constants/pagination'
import { getLogsByUuid } from '@/lib/api/logs'
import { logsLevelOptions } from '@/lib/constants/logs'
import AllLogsTable from '@/components/admin/logs/AllLogsTable'
import { formatAcquisitionSource } from '@/lib/utils/formatAcquisitionSource'

type SP = { page?: string }

export default function AdminsClient({
  searchParams,
}: {
  searchParams?: Promise<SP>
}) {
  const [email, setEmail] = useState('')
  const [uuid, setUuid] = useState('')
  const [loader, setLoader] = useState<boolean>(false)
  const [fetchUserError, setFetchUserError] = useState<string>('')
  const [user, setUser] = useState<User | null>(null)
  const [logs, setLogs] = useState<{
    logs: Log[]
    page: number
    pageCount: number
  } | null>(null)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState<Limit>('20')
  const [level, setLevel] = useState<LogsLevel>(LogsLevel.ALL)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const fetchUser = async () => {
    setFetchUserError('')
    setLoader(true)
    try {
      const user = await getUser(email, uuid)
      console.log('user', user)
      setUser(user)
    } catch (err: unknown) {
      console.error('error', err)
      setFetchUserError(getErrorMessage(err))
    } finally {
      setLoader(false)
    }
  }

  const fetchLogs = async () => {
    if (!uuid) return
    try {
      const res = await getLogsByUuid(uuid, level, page, Number(limit))
      setLogs(res)
    } catch (err: unknown) {
      console.error('error', err)
    }
  }

  useEffect(() => {
    fetchLogs()
  }, [page, level])

  const scrollToTop = () => {
    scrollRef?.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      <h1 className="mb-4 text-xl font-semibold">User</h1>
      <div className="flex items-end gap-4">
        <div>
          <Label htmlFor="email" className="mb-2">
            Email
          </Label>
          <Input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>

        <div className="self-end pb-2 opacity-60">or</div>

        <div>
          <Label htmlFor="uuid" className="mb-2">
            Uuid
          </Label>
          <Input
            id="uuid"
            type="text"
            value={uuid}
            onChange={(e) => setUuid(e.target.value)}
            placeholder="Uuid"
          />
        </div>
        <Button
          onClick={async () => {
            await fetchUser()
            await fetchLogs()
          }}
          loading={loader}
        >
          Load
        </Button>
      </div>
      {fetchUserError && (
        <p className="mt-1 mb-4 text-sm text-red-600">{fetchUserError}</p>
      )}
      {user && (
        <>
          <Table className="w-full table-fixed">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px]">Id</TableHead>
                <TableHead>Uuid</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="w-[70px]">Country </TableHead>
                <TableHead className="w-[70px]">Plan</TableHead>
                <TableHead className="w-[70px]">Status</TableHead>
                <TableHead className="w-[100px]">Start</TableHead>
                <TableHead className="w-[100px]">Expiry</TableHead>
                <TableHead className="w-[70px]">W. Subs</TableHead>
                <TableHead className="w-[70px]">Entries</TableHead>
                <TableHead className="w-[70px]">Dialogs</TableHead>
                <TableHead className="w-[100px]">Created At</TableHead>
                <TableHead className="w-[60px]">Role</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.uuid}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.regionCode}</TableCell>
                <TableCell>{user.plan?.name ?? '-'}</TableCell>
                <TableCell>{user.plan?.planStatus ?? '-'}</TableCell>
                <TableCell>
                  {user.plan?.startTime
                    ? new Date(user.plan.startTime).toLocaleDateString(
                        'uk-UA',
                        {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        },
                      )
                    : '-'}
                </TableCell>
                <TableCell>
                  {user.plan?.expiryTime
                    ? new Date(user.plan.expiryTime).toLocaleDateString(
                        'uk-UA',
                        {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        },
                      )
                    : '-'}
                </TableCell>
                <TableCell>
                  {user?.usesWithoutSubscription.toString()}
                </TableCell>
                <TableCell>{user?.entriesStatsCount ?? 0}</TableCell>
                <TableCell>{user?.dialogsStatsCount ?? 0}</TableCell>
                <TableCell>
                  {user?.createdAt
                    ? new Date(user?.createdAt).toLocaleDateString('uk-UA', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })
                    : '-'}
                </TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <div className="break-words whitespace-pre-line">
                    {formatAcquisitionSource(user?.acquisitionMetaJson)}
                  </div>
                </TableCell>
                <TableCell className="flex gap-4">
                  <ChangeRoleDialog
                    role={user.role}
                    uuid={user.uuid}
                    hash={user.hash}
                    onSuccess={fetchUser}
                  />
                  <ChangeStatusDialog
                    id={user.plans?.find((p) => p.actual)?.id as number}
                    onSuccess={fetchUser}
                    status={
                      user.plans?.find((p) => p.actual)
                        ?.planStatus as PlanStatus
                    }
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="grid grid-cols-3 gap-4">
            <div className="mb-8 border-b">
              <JsonViewer data={user} />
            </div>
            <div className="col-span-2">
              <div className="items-end">
                <div className="mb-2">Logs Level</div>
                <Select
                  value={level}
                  onValueChange={(l) => {
                    setLevel(l as LogsLevel)
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {logsLevelOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div ref={scrollRef} className="max-h-[1200px] overflow-auto">
                <AllLogsTable logs={logs?.logs ?? []} />
                <Pagination
                  page={logs?.page ?? 0}
                  pageCount={logs?.pageCount ?? 0}
                  onPress={(page: number) => {
                    console.log(111)
                    setPage(page)
                    scrollToTop()
                  }}
                  isComponent={true}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
