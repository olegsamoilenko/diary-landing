import type { ReactNode } from 'react'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import { Button } from '@/components/ui/button'

/** Shared presentation for the existing community tools in Admin V2. */
export default function CommunityPage({
  title,
  description,
  children,
  variant = 'classic',
}: {
  title: string
  description: string
  children: ReactNode
  variant?: 'classic' | 'v2'
}) {
  if (variant === 'classic') return <div>{children}</div>
  return (
    <div className="community-workspace space-y-7">
      <AdminPageHeader section="Спільнота" title={title} />
      <p className="text-muted-foreground max-w-3xl text-sm leading-relaxed">
        {description}
      </p>
      <div className="community-content space-y-6">{children}</div>
    </div>
  )
}

export function CommunityLoadState({
  loading,
  error,
  empty,
  onRetry,
}: {
  loading: boolean
  error: string | null
  empty?: boolean
  onRetry: () => void
}) {
  if (loading)
    return (
      <p role="status" className="text-muted-foreground p-6 text-sm">
        Завантаження…
      </p>
    )
  if (error)
    return (
      <div
        role="alert"
        className="border-destructive/20 bg-destructive/5 rounded-xl border p-5 text-sm"
      >
        <p>{error}</p>
        <Button variant="outline" size="sm" onClick={onRetry} className="mt-3">
          Спробувати ще раз
        </Button>
      </div>
    )
  if (empty)
    return (
      <p className="text-muted-foreground p-8 text-center text-sm">
        За цим запитом даних немає.
      </p>
    )
  return null
}
