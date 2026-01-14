'use client'

import React, { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { getUser } from '@/lib/api/users'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import ChangeRoleDialog from '@/components/admin/admins/ChangeRoleDialog'
import { PlanStatus, User } from '@/types'
import { getErrorMessage } from '@/lib/errors'
import ChangeStatusDialog from '@/components/admin/admins/ChangeStatusDialog'
import { JsonViewer } from '@/components/ui/JsonViewer'

export default function AdminsClient() {
  const [email, setEmail] = useState('')
  const [uuid, setUuid] = useState('')
  const [loader, setLoader] = useState<boolean>(false)
  const [fetchUserError, setFetchUserError] = useState<string>('')
  const [user, setUser] = useState<User | null>(null)

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

  function formatDateTimeUA(d: Date | string | number) {
    const date = d instanceof Date ? d : new Date(d)

    const parts = new Intl.DateTimeFormat('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).formatToParts(date)

    const get = (type: string) =>
      parts.find((p) => p.type === type)?.value ?? ''

    return `${get('day')}.${get('month')}.${get('year')} | ${get('hour')}:${get('minute')}`
  }

  return (
    <>
      <h1 className="mb-4 text-xl font-semibold">User Management</h1>

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
                    id={user.plans.find((p) => p.actual)?.id as number}
                    onSuccess={fetchUser}
                    status={
                      user.plans.find((p) => p.actual)?.planStatus as PlanStatus
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
