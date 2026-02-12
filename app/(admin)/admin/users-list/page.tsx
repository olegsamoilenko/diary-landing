'use client'

import React, { useEffect, useState, use } from 'react'
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
import { GetAllUsersResp, Granularity, PlanStatus, User, SortBy } from '@/types'
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
import { UsersSortByOptions } from '@/lib/constants/users'

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
  const spPromise: Promise<SP> = searchParams ?? Promise.resolve({})
  const sp = use(spPromise)
  const page = Number(sp.page ?? '1') || 1
  const [sortBy, setSortBy] = useState<SortBy>('createdAt')
  const limit = 10
  const [fetchUsersRes, setFetchUsersRes] = useState<GetAllUsersResp | null>(
    null,
  )
  const [errorSortBy, setErrorSortBy] = useState<string | null>(null)

  useEffect(() => {
    fetchUsers(sortBy)
  }, [])

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

  const fetchUsers = async (sortBy: SortBy) => {
    try {
      const res = await getAll(page, limit, sortBy)

      if (!res) {
        throw new Error('No response')
      }

      console.log('res', res)
      setFetchUsersRes(res)
    } catch (err: unknown) {
      console.error('error', err)
    }
  }

  return (
    <>
      <h1 className="mb-4 text-xl font-semibold">Users</h1>
      <div className="items-end">
        <Select
          value={sortBy}
          onValueChange={async (s: SortBy) => {
            console.log('s', s)
            setSortBy(s as SortBy)
            setErrorSortBy(null)
            await fetchUsers(s)
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {UsersSortByOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errorSortBy && (
          <p className="mt-1 text-sm text-red-600">{errorSortBy}</p>
        )}
      </div>
      <div className="mb-8">
        <AllUsersTable users={fetchUsersRes?.users as User[]} />
        <Pagination
          page={fetchUsersRes?.page ?? 0}
          pageCount={fetchUsersRes?.pageCount ?? 0}
        />
      </div>
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
        <Button onClick={fetchUser} loading={loader}>
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
                <TableHead className="w-[60px]">Role</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.uuid}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
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
          <div>
            <JsonViewer data={user} />
          </div>
        </>
      )}
    </>
  )
}
