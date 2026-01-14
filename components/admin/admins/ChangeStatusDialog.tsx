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
import { PlanStatus } from '@/types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { changeUserPlanStatus } from '@/lib/api/users'

type Props = {
  id: number
  status: PlanStatus
  onSuccess?: () => void
}

const userPlanStatusOptions = [
  {
    value: PlanStatus.ACTIVE,
    label: 'ACTIVE',
  },
  {
    value: PlanStatus.INACTIVE,
    label: 'INACTIVE',
  },
  {
    value: PlanStatus.CANCELED,
    label: 'CANCELED',
  },
  {
    value: PlanStatus.EXPIRED,
    label: 'EXPIRED',
  },
  {
    value: PlanStatus.IN_GRACE,
    label: 'IN_GRACE',
  },
  {
    value: PlanStatus.ON_HOLD,
    label: 'ON_HOLD',
  },
  {
    value: PlanStatus.PAUSED,
    label: 'PAUSED',
  },
  {
    value: PlanStatus.RESTARTED,
    label: 'RESTARTED',
  },
  {
    value: PlanStatus.REFUNDED,
    label: 'REFUNDED',
  },
  {
    value: PlanStatus.TOKEN_EXCEEDED,
    label: 'TOKEN_EXCEEDED',
  },
  {
    value: PlanStatus.CREDIT_EXCEEDED,
    label: 'CREDIT_EXCEEDED',
  },
] as const

export default function ChangeStatusDialog({ id, status, onSuccess }: Props) {
  const [open, setOpen] = useState(false)
  const [userPlanStatus, setUserPlanStatus] = useState(status)

  useEffect(() => {
    if (open) setUserPlanStatus(status)
    console.log('status', status)
  }, [open, status])

  const handleChange = async () => {
    try {
      await changeUserPlanStatus(id, userPlanStatus)
      onSuccess?.()
    } catch (err) {
      console.error(err)
    }
    setOpen(false)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Change status</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <div className="grid max-h-[85vh] grid-rows-[auto_minmax(0,1fr)_auto]">
          <DialogHeader className="mb-4">
            <DialogTitle>Change status</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 overflow-y-auto px-6 pb-6">
            <div className="grid gap-4">
              <div className="items-end">
                <Select
                  value={userPlanStatus}
                  onValueChange={(v) => {
                    setUserPlanStatus(v as PlanStatus)
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {userPlanStatusOptions.map((option) => (
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
