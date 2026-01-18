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
import React, { useEffect, useRef, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import Editor from '@/components/ui/Editor'
import type { EditorRef } from '@/types'

type Props = {
  email: string
  lang: string
  onSuccess?: () => void
}

export default function SendEmailDialog({ email, lang, onSuccess }: Props) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const editorRef = useRef<EditorRef | null>(null)

  const handleSendEmail = async () => {
    try {
      const data = editorRef.current?.get()
      const html = data?.html ?? ''

      const res = await fetch('/internal/admin/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: email,
          subject: title,
          html,
        }),
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json?.error ?? 'Send failed')

      onSuccess?.()
      setOpen(false)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Send email</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <div className="grid max-h-[85vh] grid-rows-[auto_minmax(0,1fr)_auto]">
          <DialogHeader className="mb-4">
            <DialogTitle>Send email</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 overflow-y-auto px-6 pb-6">
            <div className="grid gap-4">
              <div>Lang: {lang}</div>
              <div>
                <Label htmlFor="title" className="mb-2">
                  Title
                </Label>
                <Input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                />
              </div>
              <Editor
                ref={(api) => {
                  editorRef.current = api
                }}
                initialHtml={'<p>Enter text…</p>'}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="button" onClick={handleSendEmail}>
                Send Email
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
