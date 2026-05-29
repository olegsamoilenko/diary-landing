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
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  createComment,
  createSystemTopics,
  getUserByRole,
} from '@/lib/api/community'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  ForumCategorySlug,
  ForumModerationReason,
  ForumTopicType,
  UserRole,
} from '@/types'
import {
  moderationRemoveReasonOptions,
  topicCategoryOptions,
  topicTypeOptions,
  userRoleOptions,
} from '@/lib/constants/community'

export default function CreateSystemTopicDialog({
  adminId,
  onSuccessCreateTopic,
}: {
  adminId: number
  onSuccessCreateTopic?: () => void
}) {
  const [open, setOpen] = useState(false)
  const [titleEn, setTitleEn] = useState('')
  const [contentEn, setContentEn] = useState('')
  const [enError, setEnError] = useState<string | null>(null)
  const [titleUk, setTitleUk] = useState('')
  const [contentUk, setContentUk] = useState('')
  const [ukError, setUkError] = useState<string | null>(null)
  const [titleDe, setTitleDe] = useState('')
  const [contentDe, setContentDe] = useState('')
  const [deError, setDeError] = useState<string | null>(null)
  const [titlePl, setTitlePl] = useState('')
  const [contentPl, setContentPl] = useState('')
  const [plError, setPlError] = useState<string | null>(null)
  const [userId, setUserId] = useState<number | null>(null)
  const [userRole, setUserRole] = useState<UserRole | undefined>(undefined)
  const [topicType, setTopicType] = useState<string | undefined>(undefined)
  const [topicCategory, setTopicCategory] = useState<string | undefined>(
    undefined,
  )

  const handleUserRole = async (userRole: UserRole) => {
    const user = await getUserByRole(userRole)
    setUserId(user.id)
  }

  const handleCreateTopics = async () => {
    const data = {
      userId: userId as number,
      type: topicType as ForumTopicType,
      categorySlug: topicCategory as ForumCategorySlug,
      topics: [
        {
          lang: 'en',
          title: titleEn,
          content: contentEn,
        },
        {
          lang: 'uk',
          title: titleUk,
          content: contentUk,
        },
        {
          lang: 'de',
          title: titleDe,
          content: contentDe,
        },
        {
          lang: 'pl',
          title: titlePl,
          content: contentPl,
        },
      ],
    }
    await createSystemTopics(data)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" asChild className="cursor-pointer">
          <span>Create system topic</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <div className="grid max-h-[85vh] grid-rows-[auto_minmax(0,1fr)_auto]">
          <DialogHeader className="mb-4">
            <DialogTitle>Create system topic</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="overflow-y-auto pr-2">
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
              <div className="mb-2">Type</div>
              <Select
                value={topicType}
                onValueChange={(r) => {
                  setTopicType(r as ForumTopicType)
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {topicTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4 items-end">
              <div className="mb-2">Category</div>
              <Select
                value={topicCategory}
                onValueChange={(r) => {
                  setTopicCategory(r as ForumCategorySlug)
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {topicCategoryOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4 items-end">
              <div className="mb-2">UK</div>
              <Label htmlFor="titleUk" className="mb-2">
                Title
              </Label>
              <Textarea
                style={{ marginBottom: '20px' }}
                id="titleUk"
                value={titleUk}
                onChange={(e) => {
                  setTitleUk(e.target.value)
                  setUkError(null)
                }}
                placeholder="Title"
              />
              <Label htmlFor="contentUk" className="mb-2">
                Content
              </Label>
              <Textarea
                id="contentUk"
                value={contentUk}
                onChange={(e) => {
                  setContentUk(e.target.value)
                  setUkError(null)
                }}
                placeholder="Content"
              />
              {ukError && <p className="text-red-500">{ukError}</p>}
            </div>
            <div className="mb-4 items-end">
              <div className="mb-2">EN</div>
              <Label htmlFor="titleEn" className="mb-2">
                Title
              </Label>
              <Textarea
                style={{ marginBottom: '20px' }}
                id="titleEn"
                value={titleEn}
                onChange={(e) => {
                  setTitleEn(e.target.value)
                  setEnError(null)
                }}
                placeholder="Title"
              />
              <Label htmlFor="contentEn" className="mb-2">
                Content
              </Label>
              <Textarea
                id="contentEn"
                value={contentEn}
                onChange={(e) => {
                  setContentEn(e.target.value)
                  setEnError(null)
                }}
                placeholder="Content"
              />
              {enError && <p className="text-red-500">{enError}</p>}
            </div>
            <div className="mb-4 items-end">
              <div className="mb-2">DE</div>
              <Label htmlFor="titleDe" className="mb-2">
                Title
              </Label>
              <Textarea
                style={{ marginBottom: '20px' }}
                id="titleDe"
                value={titleDe}
                onChange={(e) => {
                  setTitleDe(e.target.value)
                  setDeError(null)
                }}
                placeholder="Title"
              />
              <Label htmlFor="contentDe" className="mb-2">
                Content
              </Label>
              <Textarea
                id="contentDe"
                value={contentDe}
                onChange={(e) => {
                  setContentDe(e.target.value)
                  setDeError(null)
                }}
                placeholder="Content"
              />
              {deError && <p className="text-red-500">{deError}</p>}
            </div>
            <div className="mb-4 items-end">
              <div className="mb-2">PL</div>
              <Label htmlFor="titlePl" className="mb-2">
                Title
              </Label>
              <Textarea
                style={{ marginBottom: '20px' }}
                id="titlePl"
                value={titlePl}
                onChange={(e) => {
                  setTitlePl(e.target.value)
                  setPlError(null)
                }}
                placeholder="Title"
              />
              <Label htmlFor="contentPl" className="mb-2">
                Content
              </Label>
              <Textarea
                id="contentPl"
                value={contentPl}
                onChange={(e) => {
                  setContentPl(e.target.value)
                  setPlError(null)
                }}
                placeholder="Content"
              />
              {plError && <p className="text-red-500">{plError}</p>}
            </div>
          </div>
          <div className="mt-4 overflow-y-auto pr-2">
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                type="button"
                onClick={async () => {
                  await handleCreateTopics()
                  if (onSuccessCreateTopic) onSuccessCreateTopic()
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
