'use client'

import { useEffect, useState } from 'react'
import { getAdminUserDetails } from '@/lib/api/users'
import { getErrorMessage } from '@/lib/errors'
import { JsonViewer } from '@/components/ui/JsonViewer'
import { Button } from '@/components/ui/button'
import UserLogs from './UserLogs'
import type { AdminUserSummary } from '@/types/user'

export default function AdminUserDetails({ user }: { user: AdminUserSummary }) {
  const [details, setDetails] = useState<Record<string, unknown> | null>(null)
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)
  useEffect(() => {
    const controller = new AbortController()
    setDetails(null)
    setError('')
    getAdminUserDetails(user.id, controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) setDetails(data)
      })
      .catch((err) => {
        if (!controller.signal.aborted) setError(getErrorMessage(err))
      })
    return () => controller.abort()
  }, [user.id, attempt])
  return (
    <div
      id={`user-details-${user.id}`}
      className="bg-muted/30 space-y-6 p-5 whitespace-normal"
    >
      <section aria-label="Інформація про користувача">
        <h3 className="mb-3 font-semibold">
          Профіль і статистика · #{user.id}
        </h3>
        {error ? (
          <div role="alert" className="text-destructive">
            {error}{' '}
            <Button variant="outline" onClick={() => setAttempt((n) => n + 1)}>
              Повторити
            </Button>
          </div>
        ) : details ? (
          <div className="bg-card max-h-[480px] overflow-auto rounded-xl border p-4 break-all">
            <JsonViewer data={details} />
          </div>
        ) : (
          <p role="status" className="text-muted-foreground">
            Завантаження профілю…
          </p>
        )}
      </section>
      <section className="bg-card min-w-0 rounded-xl border p-4">
        <UserLogs
          userUuid={user.uuid}
          initialStartDate={new Date(user.createdAt)}
        />
      </section>
    </div>
  )
}
