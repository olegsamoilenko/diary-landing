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
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ReleaseNotificationsEditor from '@/components/admin/notifications/ReleaseNotificationsEditor'
import React, { useRef, useState } from 'react'
import type { ReleaseNotificationsEditorRef } from '@/types'
import { Platforms } from '@/types'

const LOCALES = ['en', 'uk'] as const
type Locale = (typeof LOCALES)[number]

export default function ReleaseNotificationsDialog() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<Locale>('en')
  const [platform, setPlatform] = useState<'android' | 'ios' | undefined>(
    undefined,
  )
  const [errorPlatform, setErrorPlatform] = useState<string | null>(null)
  const [build, setBuild] = useState<number | undefined>(undefined)
  const [errorBuild, setErrorBuild] = useState<string | null>(null)

  const editorsRef = useRef<
    Record<Locale, ReleaseNotificationsEditorRef | null>
  >({
    uk: null,
    en: null,
  })

  const handleSave = async () => {
    if (platform === undefined) {
      setErrorPlatform('Будь ласка, оберіть платформу')
      return
    }

    if (build === undefined || isNaN(build) || build <= 0) {
      setErrorBuild('Будь ласка, введіть коректний білд')
      return
    }

    const translations = LOCALES.map((loc) => {
      const api = editorsRef.current[loc]
      const { html, docJson } = api?.get() ?? { html: '', docJson: null }
      return { locale: loc, html, docJson }
    })

    if (translations.every((t) => !t.html || t.html.trim() === '')) {
      alert('Будь ласка, заповніть контент хоча б для однієї мови')
      return
    }

    const payload = {
      defaultLocale: 'en',
      platform,
      build,
      translations,
    }

    console.log('Payload to save:', payload)

    const res = await fetch('/api/release-notifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      console.log('Failed to create notification:', err)
      return
    }

    const data = await res.json()
    setOpen(false)

    console.log('Created notification:', data)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create notification</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <div className="grid max-h-[85vh] grid-rows-[auto_minmax(0,1fr)_auto]">
          <DialogHeader className="mb-4">
            <DialogTitle>Create notification</DialogTitle>
            <DialogDescription className="sr-only">
              Create notification
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 overflow-y-auto px-6 pb-6">
            <div className="mr-auto mb-4">
              <Select
                value={platform}
                onValueChange={(v) => {
                  setPlatform(v as Platforms)
                  setErrorPlatform(null)
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="android">Android</SelectItem>
                  <SelectItem value="ios">iOS</SelectItem>
                </SelectContent>
              </Select>
              {errorPlatform && (
                <p className="mt-1 text-sm text-red-600">{errorPlatform}</p>
              )}
            </div>
            <div className="mr-auto mb-8 w-48">
              <Input
                type="number"
                placeholder="Build"
                id="build"
                name="build"
                value={build ?? ''}
                onChange={(e) => {
                  setBuild(Number(e.target.value) || undefined)
                  setErrorBuild(null)
                }}
              ></Input>
              {errorBuild && (
                <p className="mt-1 text-sm text-red-600">{errorBuild}</p>
              )}
            </div>
            <div className="grid gap-4">
              <Tabs
                value={active}
                onValueChange={(v) => setActive(v as Locale)}
              >
                <TabsList>
                  {LOCALES.map((l) => (
                    <TabsTrigger key={l} value={l}>
                      {l.toUpperCase()}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {LOCALES.map((l) => (
                  <TabsContent
                    key={l}
                    value={l}
                    className="mt-4 data-[state=inactive]:hidden"
                    forceMount
                  >
                    <ReleaseNotificationsEditor
                      ref={(api) => (editorsRef.current[l] = api)}
                      initialHtml={
                        l === LOCALES[1]
                          ? '<p>Опис змін…</p>'
                          : '<p>Describe the updates…</p>'
                      }
                    />
                  </TabsContent>
                ))}
              </Tabs>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="button" onClick={handleSave}>
                Save changes
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
