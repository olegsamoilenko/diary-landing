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
export default function ModerationUnrestrictUser({
  userId,
  adminId,
  onUnrestrict,
}: {
  userId: number
  adminId: number
  onUnrestrict: (userId: number, adminId: number) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" asChild className="cursor-pointer">
          <span>Unrestrict</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <div className="grid max-h-[85vh] grid-rows-[auto_minmax(0,1fr)_auto]">
          <DialogHeader className="mb-4">
            <DialogTitle>Unrestrict user</DialogTitle>
            <DialogDescription>
              A you really want to unrestrict this user?
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-y-auto pr-2">
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                type="button"
                onClick={() => {
                  onUnrestrict(userId, adminId)
                  setOpen(false)
                }}
              >
                Unrestrict
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
