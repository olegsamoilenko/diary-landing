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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ForumModerationReason } from '@/types'
import { moderationRemoveReasonOptions } from '@/lib/constants/community'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { removeTopic } from '@/lib/api/moderation'
export default function ModerationRemoveTopicDialog({
  id,
  adminId,
  onSuccessRemoveTopic,
}: {
  id: string
  adminId: number
  onSuccessRemoveTopic?: () => void
}) {
  const [open, setOpen] = useState(false)
  const [moderationRemoveReason, setModerationRemoveReason] =
    useState<ForumModerationReason>(ForumModerationReason.SPAM)
  const [moderationRemoveNote, setModerationRemoveNote] = useState('')

  const handleRemove = async () => {
    await removeTopic(id, {
      moderationRemovedByAdminId: adminId,
      moderationRemoveReason: moderationRemoveReason,
      moderationRemoveNote: moderationRemoveNote,
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="error" size="sm" asChild className="cursor-pointer">
          <span>Remove</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <div className="grid max-h-[85vh] grid-rows-[auto_minmax(0,1fr)_auto]">
          <DialogHeader className="mb-4">
            <DialogTitle>Remove topic</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="mb-4 items-end">
            <div className="mb-2">Reason</div>
            <Select
              value={moderationRemoveReason}
              onValueChange={(r) => {
                setModerationRemoveReason(r as ForumModerationReason)
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                {moderationRemoveReasonOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="mb-4 items-end">
            <Label htmlFor="email" className="mb-2">
              Note
            </Label>
            <Textarea
              id="note"
              value={moderationRemoveNote}
              onChange={(e) => setModerationRemoveNote(e.target.value)}
              placeholder="Note"
            />
          </div>
          <div className="overflow-y-auto pr-2">
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                type="button"
                onClick={async () => {
                  await handleRemove()
                  if (onSuccessRemoveTopic) onSuccessRemoveTopic()
                  setOpen(false)
                }}
              >
                Remove
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
