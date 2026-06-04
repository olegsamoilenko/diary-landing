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
import { Textarea } from '@/components/ui/textarea'
import { editComment, getUserByRole } from '@/lib/api/community'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ForumModerationReason, UserRole } from '@/types'
import {
  moderationRemoveReasonOptions,
  userRoleOptions,
} from '@/lib/constants/community'
import { Comment } from '@/types'

export default function ModerationEditCommentDialog({
  comment,
  onSuccessEditComment,
}: {
  comment: Comment
  onSuccessEditComment?: () => void
}) {
  const [open, setOpen] = useState(false)
  const [commentText, setCommentText] = useState(comment.content)
  const [error, setError] = useState<string | null>(null)
  const [userRole, setUserRole] = useState<UserRole | undefined>(
    comment.author.role,
  )
  const [userId, setUserId] = useState<number | null>(comment.authorId)

  useEffect(() => {
    console.log('userId', userId)
  }, [userId])

  const handleEditComment = async () => {
    if (!commentText) {
      setError('Please enter a text')
      return
    }
    await editComment(comment.id, {
      content: commentText,
      userId: userId as number,
    })
    setOpen(false)
    setCommentText('')
    setUserRole(undefined)
  }

  const handleUserRole = async (userRole: UserRole) => {
    const user = await getUserByRole(userRole)
    setUserId(user.id)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" asChild className="cursor-pointer">
          <span>Edit comment</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <div className="grid max-h-[85vh] grid-rows-[auto_minmax(0,1fr)_auto]">
          <DialogHeader className="mb-4">
            <DialogTitle>Edit comment</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="mb-4 items-end">
            <div className="mb-2">Role</div>
            <Select
              value={userRole}
              onValueChange={(r) => {
                setUserRole(r as UserRole)
                void handleUserRole(r as UserRole)
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="User role" />
              </SelectTrigger>
              <SelectContent>
                {userRoleOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="mb-4 items-end">
            <Label htmlFor="email" className="mb-2">
              Content
            </Label>
            <Textarea
              id="content"
              value={commentText}
              onChange={(e) => {
                setCommentText(e.target.value)
                setError(null)
              }}
              placeholder="Content"
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
                  await handleEditComment()
                  if (onSuccessEditComment) onSuccessEditComment()
                }}
              >
                Edit
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
