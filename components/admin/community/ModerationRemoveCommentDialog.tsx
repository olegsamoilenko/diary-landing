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
import { removeComment, removeTopic } from '@/lib/api/moderation'
export default function ModerationRemoveCommentDialog({
  id,
  adminId,
  lang,
  targetUserId,
  onSuccessRemoveComment,
}: {
  id: string
  adminId: number
  lang: string
  targetUserId: number
  onSuccessRemoveComment?: () => void
}) {
  const [open, setOpen] = useState(false)
  const [moderationRemoveReason, setModerationRemoveReason] =
    useState<ForumModerationReason>(ForumModerationReason.SPAM)
  const [moderationRemoveNote, setModerationRemoveNote] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleRemove = async () => {
    if (!moderationRemoveNote) {
      setError('Please enter a note')
      return
    }
    await removeComment(id, {
      moderationRemovedByAdminId: adminId,
      targetUserId: targetUserId,
      moderationRemoveReason: moderationRemoveReason,
      moderationRemoveNote: moderationRemoveNote,
    })
    setOpen(false)
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
            <DialogTitle>Remove comment</DialogTitle>
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
              Note. Lang: {lang}
            </Label>
            <Textarea
              id="note"
              value={moderationRemoveNote}
              onChange={(e) => {
                setModerationRemoveNote(e.target.value)
                setError(null)
              }}
              placeholder="Note"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="overflow-y-auto pr-2">
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                type="button"
                onClick={async () => {
                  await handleRemove()
                  if (onSuccessRemoveComment) onSuccessRemoveComment()
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
