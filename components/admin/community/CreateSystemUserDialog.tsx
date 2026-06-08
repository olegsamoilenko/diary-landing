import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { v4 as uuid } from 'uuid'
import { creteSystemUsers } from '@/lib/api/community'

export default function CreateSystemUserDialog({
  adminId,
  onSuccessCreateUser,
}: {
  adminId: number
  onSuccessCreateUser?: () => void
}) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleCreateUser = async () => {
    try {
      const userUuid = uuid()

      await creteSystemUsers({
        uuid: userUuid,
        name,
        username,
      })

      setOpen(false)
      onSuccessCreateUser?.()
    } catch (error: any) {
      console.error('Error creating user:', error)
      setError(error.message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" asChild className="cursor-pointer">
          <span>Create system user</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <div className="grid max-h-[85vh] grid-rows-[auto_minmax(0,1fr)_auto]">
          <DialogHeader className="mb-4">
            <DialogTitle>Create system user</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="overflow-y-auto pr-2">
            <div className="mb-4 items-end">
              <Label htmlFor="name" className="mb-2">
                Name
              </Label>
              <Input
                style={{ marginBottom: '20px' }}
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                }}
                placeholder="Name"
              />
            </div>
            <div className="mb-4 items-end">
              <Label htmlFor="username" className="mb-2">
                Username
              </Label>
              <Input
                style={{ marginBottom: '20px' }}
                id="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                }}
                placeholder="Username"
              />
            </div>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="mt-4 overflow-y-auto pr-2">
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                type="button"
                onClick={async () => {
                  await handleCreateUser()
                  if (onSuccessCreateUser) onSuccessCreateUser()
                }}
              >
                Create
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
