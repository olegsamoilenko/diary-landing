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
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import React, { useState } from 'react'
import { Label } from '@/components/ui/label'
import { MonitoringType } from '@/types/monitoring'
import {
  addMonitoringTypeOptions,
  monitoringOptions,
} from '@/lib/constants/monitoring'

export default function AddUserMonitoringDialog({
  onSuccess,
}: {
  onSuccess: () => void
}) {
  const [open, setOpen] = useState(false)
  const [errorUuid, setErrorUuid] = useState<string | null>(null)
  const [userUuid, setUserUuid] = useState<string>('')
  const [monitoringType, setMonitoringType] = useState<MonitoringType>(
    MonitoringType.ACTIVITY,
  )
  const [description, setDescription] = useState<string>('')

  const handleSave = async () => {
    if (!userUuid) {
      setErrorUuid('Будь ласка, додайте uuid')
      return
    }

    const res = await fetch('/api/user-monitoring/add-to-monitoring', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ userUuid, type: monitoringType, description }),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      console.log('Failed to create notification:', err)
      return
    }

    const data = await res.json()
    setOpen(false)

    onSuccess()
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <div className="grid max-h-[85vh] grid-rows-[auto_minmax(0,1fr)_auto]">
          <DialogHeader className="mb-4">
            <DialogTitle>Create notification</DialogTitle>
            <DialogDescription className="sr-only">Add User</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 overflow-y-auto px-6 pb-6">
            <div className="mr-auto mb-8">
              <div className="mb-4">
                <Input
                  type="text"
                  placeholder="Uuid"
                  id="uuid"
                  name="uuid"
                  value={userUuid ?? ''}
                  onChange={(e) => {
                    setUserUuid(e.target.value)
                  }}
                ></Input>
                {errorUuid && (
                  <p className="mt-1 text-sm text-red-600">{errorUuid}</p>
                )}
              </div>
              <div className="mb-4 items-end">
                <Label className="mb-2">Monitoring Type</Label>
                <Select
                  value={monitoringType}
                  onValueChange={async (m: MonitoringType) => {
                    setMonitoringType(m as MonitoringType)
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {addMonitoringTypeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <textarea
                  name="description"
                  id="description"
                  cols={30}
                  rows={5}
                  className="w-full rounded-md border border-gray-300 p-2"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="button" onClick={handleSave}>
                Add user
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
