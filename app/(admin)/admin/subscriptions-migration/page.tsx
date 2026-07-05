'use client'

import { useMemo, useState } from 'react'
import { DatabaseZap, Eye, TriangleAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'

type MigrationAction = 'preview' | 'run'

type MigrationResult = {
  totalUsers?: number
  chunkSize?: number
  previews?: unknown[]
  userPlanStatesUpserted?: number
  storeSubscriptionsUpserted?: number
  warnings?: Array<{ userId: number; warnings: string[] }>
  [key: string]: unknown
}

async function readJsonResponse(res: Response) {
  const text = await res.text()
  const data = text ? JSON.parse(text) : null

  if (!res.ok) {
    const message =
      data?.message ?? data?.error ?? `Request failed with ${res.status}`
    throw new Error(Array.isArray(message) ? message.join('; ') : message)
  }

  return data
}

export default function SubscriptionsMigrationPage() {
  const [loadingAction, setLoadingAction] = useState<MigrationAction | null>(
    null,
  )
  const [result, setResult] = useState<MigrationResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const warningCount = useMemo(() => {
    if (!Array.isArray(result?.warnings)) return 0
    return result.warnings.reduce(
      (sum, item) => sum + (item.warnings?.length ?? 0),
      0,
    )
  }, [result])

  const runAction = async (action: MigrationAction) => {
    if (
      action === 'run' &&
      !window.confirm('Run subscriptions migration into new tables?')
    ) {
      return
    }

    setLoadingAction(action)
    setError(null)

    try {
      const res = await fetch(
        action === 'preview'
          ? '/api/subscriptions/migration/preview'
          : '/api/subscriptions/migration/run',
        {
          method: action === 'preview' ? 'GET' : 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          ...(action === 'run' ? { body: JSON.stringify({}) } : {}),
        },
      )
      setResult((await readJsonResponse(res)) as MigrationResult)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Migration request failed')
    } finally {
      setLoadingAction(null)
    }
  }

  return (
    <div className="max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Subscriptions migration</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Migration from legacy plans to user plan states and store
          subscriptions.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          onClick={() => runAction('preview')}
          loading={loadingAction === 'preview'}
          disabled={loadingAction !== null}
        >
          <Eye />
          Preview migration
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => runAction('run')}
          loading={loadingAction === 'run'}
          disabled={loadingAction !== null}
        >
          <DatabaseZap />
          Run migration
        </Button>
      </div>

      {error ? (
        <div className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          <TriangleAlert className="mt-0.5 size-4" />
          <span>{error}</span>
        </div>
      ) : null}

      {result ? (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Metric label="Users" value={result.totalUsers ?? 0} />
            <Metric label="Chunk size" value={result.chunkSize ?? 0} />
            <Metric
              label="Plan states"
              value={result.userPlanStatesUpserted ?? '-'}
            />
            <Metric
              label="Store subscriptions"
              value={result.storeSubscriptionsUpserted ?? '-'}
            />
          </div>

          {warningCount > 0 ? (
            <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
              {warningCount} migration warning{warningCount === 1 ? '' : 's'}.
            </div>
          ) : null}

          <pre className="max-h-[65vh] overflow-auto rounded-md border bg-muted/40 p-4 text-xs leading-relaxed">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      ) : null}
    </div>
  )
}

function Metric({
  label,
  value,
}: {
  label: string
  value: number | string
}) {
  return (
    <div className="rounded-md border p-3">
      <div className="text-muted-foreground text-xs">{label}</div>
      <div className="mt-1 text-xl font-semibold">{value}</div>
    </div>
  )
}
