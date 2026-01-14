import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { UserRole } from '@/types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { changeUserRole } from '@/lib/api/users'

type Props = {
  uuid: string
  hash: string
  role: UserRole
  onSuccess?: () => void
}

const userRolesOptions = [
  {
    value: UserRole.ADMIN,
    label: 'Admin',
  },
  {
    value: UserRole.TESTER,
    label: 'Tester',
  },
  {
    value: UserRole.USER,
    label: 'User',
  },
] as const

export default function ChangeRoleDialog({
  uuid,
  hash,
  role,
  onSuccess,
}: Props) {
  const [open, setOpen] = useState(false)
  const [userRole, setUserRole] = useState(role)

  useEffect(() => {
    if (open) setUserRole(role)
  }, [open, role])

  const handleChange = async () => {
    try {
      await changeUserRole(uuid, hash, userRole)
      onSuccess?.()
    } catch (err: any) {
      console.error(err.response)
    }
    setOpen(false)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Change role</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <div className="grid max-h-[85vh] grid-rows-[auto_minmax(0,1fr)_auto]">
          <DialogHeader className="mb-4">
            <DialogTitle>Change role</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 overflow-y-auto px-6 pb-6">
            <div className="grid gap-4">
              <div className="items-end">
                <Select
                  value={userRole}
                  onValueChange={(v) => {
                    setUserRole(v as UserRole)
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    {userRolesOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="button" onClick={handleChange}>
                Change
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
