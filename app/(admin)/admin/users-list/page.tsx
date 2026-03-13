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
import {
  GetAllUsersResp,
  Granularity,
  PlanStatus,
  User,
  SortBy,
  HasPlan,
  Limit,
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
  const [fetchUsersRes, setFetchUsersRes] = useState<GetAllUsersResp | null>(
    null,
  )
  const [errorSortBy, setErrorSortBy] = useState<string | null>(null)
  const [hasPlan, setHasPlan] = useState<HasPlan>('All')
  const [limit, setLimit] = useState<Limit>('20')

  useEffect(() => {
    fetchUsers()
  }, [page])

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

  const fetchUsers = async () => {
    try {
      const res = await getAll(page, Number(limit), sortBy, hasPlan)

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
      <div className="mb-4 flex items-end gap-4">
        <div className="items-end">
          <Label className="mb-2">Sort By</Label>
          <Select
            value={sortBy}
            onValueChange={async (s: SortBy) => {
              setSortBy(s as SortBy)
              setErrorSortBy(null)
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
        <div className="items-end">
          <Label className="mb-2">Has Plan</Label>
          <Select
            value={hasPlan}
            onValueChange={async (p: HasPlan) => {
              setHasPlan(p as HasPlan)
              setErrorSortBy(null)
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {UsersHavePlanOptions.map((option) => (
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
        <div className="items-end">
          <Label className="mb-2">Limit</Label>
          <Select
            value={limit}
            onValueChange={async (l: Limit) => {
              setLimit(l as Limit)
              setErrorSortBy(null)
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {LimitOptions.map((option) => (
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
        <div>
          <Button onClick={fetchUsers}>Load</Button>
        </div>
      </div>
      <div className="mb-8">
        <AllUsersTable users={fetchUsersRes?.users as User[]} />
        <Pagination
          page={fetchUsersRes?.page ?? 0}
          pageCount={fetchUsersRes?.pageCount ?? 0}
        />
      </div>
    </>
  )
}
