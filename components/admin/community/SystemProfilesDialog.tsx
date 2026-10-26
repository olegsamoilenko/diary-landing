'use client'

import { useEffect, useId, useState } from 'react'
import type { AuthorProfile, User } from '@/types'
import { UserRole } from '@/types'
import { updateSystemUserAvatar } from '@/lib/api/community'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

function AvatarEditor({
  user,
  busy,
  setBusy,
  onSaved,
}: {
  user: User
  busy: boolean
  setBusy: (busy: boolean) => void
  onSaved: (userId: number, profile: AuthorProfile) => void
}) {
  const inputId = useId()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [saving, setSaving] = useState(false)
  const profile = user.forumPublicProfile

  useEffect(() => {
    if (!file) {
      setPreview(null)
      return
    }
    const url = URL.createObjectURL(file)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  const chooseFile = (nextFile: File | null) => {
    setError('')
    setMessage('')
    if (!nextFile) return
    if (
      !['image/png', 'image/jpeg', 'image/webp'].includes(nextFile.type) ||
      nextFile.size > 2 * 1024 * 1024
    ) {
      setFile(null)
      setError('Оберіть PNG, JPEG або WebP розміром до 2 МБ.')
      return
    }
    setFile(nextFile)
  }

  const chooseNemoryLogo = async () => {
    setBusy(true)
    setError('')
    try {
      const response = await fetch('/assets/nemory-avatar.png')
      if (!response.ok) throw new Error('Не вдалося завантажити логотип.')
      chooseFile(
        new File([await response.blob()], 'nemory.png', { type: 'image/png' }),
      )
    } catch {
      setError('Не вдалося завантажити логотип. Спробуйте ще раз.')
    } finally {
      setBusy(false)
    }
  }

  const save = async () => {
    if (!file || busy) return
    setBusy(true)
    setSaving(true)
    setError('')
    setMessage('')
    try {
      const updated = await updateSystemUserAvatar(user.id, file)
      onSaved(user.id, updated)
      setFile(null)
      setMessage('Аватар збережено.')
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Не вдалося зберегти аватар.',
      )
    } finally {
      setBusy(false)
      setSaving(false)
    }
  }

  const savedUrl = profile?.avatarUrl
  const imageUrl =
    preview ||
    (savedUrl?.startsWith('/uploads/') ? `/api${savedUrl}` : savedUrl)
  return (
    <section
      className="space-y-3 rounded-lg border p-4"
      aria-label={profile?.displayName || user.name || 'Системний профіль'}
    >
      <div className="flex items-center gap-4">
        {imageUrl ? (
          // Uploaded avatars may have arbitrary dimensions; keep the native image preview.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={`Аватар ${profile?.displayName || user.name}`}
            className="h-20 w-20 rounded-full border object-cover"
          />
        ) : (
          <div
            className="flex h-20 w-20 items-center justify-center rounded-full border text-2xl"
            aria-label="Без аватара"
          >
            ?
          </div>
        )}
        <div>
          <h3 className="font-semibold">{profile?.displayName || user.name}</h3>
          <p className="text-muted-foreground text-sm">@{profile?.username}</p>
          {file && (
            <p className="text-sm">Попередній перегляд — ще не збережено</p>
          )}
        </div>
      </div>
      <Label htmlFor={inputId}>Новий аватар</Label>
      <Input
        id={inputId}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        disabled={busy}
        onChange={(event) => {
          chooseFile(event.target.files?.[0] || null)
          event.target.value = ''
        }}
      />
      <div className="flex flex-wrap gap-2">
        {user.role === UserRole.NEMORY && (
          <Button variant="outline" disabled={busy} onClick={chooseNemoryLogo}>
            Поточний логотип Nemory
          </Button>
        )}
        <Button disabled={!file || busy} onClick={save}>
          {saving ? 'Зберігаємо…' : 'Зберегти аватар'}
        </Button>
        {file && (
          <Button
            variant="ghost"
            disabled={busy}
            onClick={() => {
              setFile(null)
              setError('')
            }}
          >
            Скасувати вибір
          </Button>
        )}
      </div>
      {error && (
        <p role="alert" className="text-destructive text-sm">
          {error}
        </p>
      )}
      {message && (
        <p role="status" className="text-sm">
          {message}
        </p>
      )}
    </section>
  )
}

export default function SystemProfilesDialog({
  users,
  onSaved,
}: {
  users: User[]
  onSaved: (userId: number, profile: AuthorProfile) => void
}) {
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!busy) setOpen(next)
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Системні профілі
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Системні профілі</DialogTitle>
          <DialogDescription>
            Зміна аватарів ком’юніті. PNG, JPEG або WebP до 2 МБ. Зображення
            застосовується після збереження.
          </DialogDescription>
        </DialogHeader>
        {open &&
          users.map((user) => (
            <AvatarEditor
              key={user.id}
              user={user}
              busy={busy}
              setBusy={setBusy}
              onSaved={onSaved}
            />
          ))}
        {!users.length && (
          <p>
            Системні профілі не завантажені. Оновіть сторінку та спробуйте ще
            раз.
          </p>
        )}
      </DialogContent>
    </Dialog>
  )
}
