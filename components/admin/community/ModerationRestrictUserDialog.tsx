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
import { ForumUserRestrictionType } from '@/types'
import { moderationRestrictionTypeOptions } from '@/lib/constants/community'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { DatePicker } from '@/components/ui/DatePicker'
import { restrictUser } from '@/lib/api/moderation'

export default function ModerationRestrictUserDialog({
  userId,
  adminId,
  lang,
  violationCount,
  onSuccessRestriction,
}: {
  userId: number
  adminId: number
  lang: string
  violationCount: number
  onSuccessRestriction?: () => void
}) {
  const [open, setOpen] = useState(false)
  const [restrictionType, setRestrictionType] =
    useState<ForumUserRestrictionType>(ForumUserRestrictionType.TEMPORARY_BAN)
  const [restrictionReason, setRestrictionReason] = useState('')
  const [startsAt, setStartsAt] = useState<Date | undefined>(new Date())
  const [endsAt, setEndsAt] = useState<Date | undefined>(undefined)
  const [error, setError] = useState<string | null>(null)

  const handleRestriction = async () => {
    if (restrictionType === ForumUserRestrictionType.TEMPORARY_BAN && !endsAt) {
      setError('Please select an end date for temporary ban')
      return
    }
    await restrictUser(userId, {
      type: restrictionType,
      reason: restrictionReason,
      createdByAdminId: adminId,
      violationCount: violationCount,
      startsAt: startsAt,
      endsAt: endsAt,
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="error" size="sm" asChild className="cursor-pointer">
          <span>Restrict user</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <div className="grid max-h-[85vh] grid-rows-[auto_minmax(0,1fr)_auto]">
          <DialogHeader className="mb-4">
            <DialogTitle>Restrict user</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="mb-4 items-end">
            <div className="mb-2">Restriction type</div>
            <Select
              value={restrictionType}
              onValueChange={(t) => {
                setRestrictionType(t as ForumUserRestrictionType)
                setError(null)
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                {moderationRestrictionTypeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="mb-4 items-end">
            <Label htmlFor="email" className="mb-2">
              Reason. Lang: {lang}
            </Label>
            <Textarea
              id="note"
              value={restrictionReason}
              onChange={(e) => setRestrictionReason(e.target.value)}
              placeholder="Note"
            />
          </div>
          <div className="flex gap-4">
            <DatePicker
              label={'Start date'}
              placeholder={'Start date'}
              date={startsAt}
              setDateAction={setStartsAt}
            />
            {restrictionType === ForumUserRestrictionType.TEMPORARY_BAN && (
              <DatePicker
                label={'End date'}
                placeholder={'End date'}
                date={endsAt}
                setDateAction={(d: Date | undefined) => {
                  setError(null)
                  setEndsAt(d)
                }}
              />
            )}
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
                  await handleRestriction()
                  if (onSuccessRestriction) onSuccessRestriction()
                }}
              >
                Restrict
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
