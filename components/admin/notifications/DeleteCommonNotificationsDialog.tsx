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
import React, { useState } from 'react'
import { deleteCommonNotification } from '@/lib/api/commonNotifications'
export default function DeleteCommonNotificationsDialog({
  id,
  onSuccessDelete,
}: {
  id: number
  onSuccessDelete?: () => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="error" size="sm" asChild className="cursor-pointer">
          <span>Delete</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <div className="grid max-h-[85vh] grid-rows-[auto_minmax(0,1fr)_auto]">
          <DialogHeader className="mb-4">
            <DialogTitle>Delete notification</DialogTitle>
            <DialogDescription>
              A you really want to delete this notification?
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-y-auto pr-2">
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                type="button"
                onClick={async () => {
                  await deleteCommonNotification(id)
                  if (onSuccessDelete) onSuccessDelete()
                }}
              >
                Delete
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
