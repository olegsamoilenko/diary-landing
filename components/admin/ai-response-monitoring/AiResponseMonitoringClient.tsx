'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Check, RefreshCw, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Pagination from '@/components/ui/pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  deleteAiResponseMonitoringRecord,
  getAiResponseMonitoringRecords,
  markAiResponseMonitoringRecordAsRead,
} from '@/lib/api/aiResponseMonitoring'
import type {
  AiResponseMonitoringMode,
  AiResponseMonitoringRecord,
  AiResponseMonitoringRecordsResponse,
} from '@/types'

type ModeFilter = AiResponseMonitoringMode | 'all'
type ReadFilter = 'unread' | 'all' | 'read'

const modeOptions: { label: string; value: ModeFilter }[] = [
  { label: 'All modes', value: 'all' },
  { label: 'Entry', value: 'entry' },
  { label: 'Dialog', value: 'dialog' },
  { label: 'Check-in', value: 'checkin' },
  { label: 'Check-in dialog', value: 'checkin_dialog' },
]

const readOptions: { label: string; value: ReadFilter }[] = [
  { label: 'Unread', value: 'unread' },
  { label: 'All', value: 'all' },
  { label: 'Read', value: 'read' },
]

const limit = 20

export default function AiResponseMonitoringClient() {
  const [recordsRes, setRecordsRes] =
    useState<AiResponseMonitoringRecordsResponse | null>(null)
  const [page, setPage] = useState(1)
  const [mode, setMode] = useState<ModeFilter>('all')
  const [readFilter, setReadFilter] = useState<ReadFilter>('unread')
  const [loading, setLoading] = useState(false)

  const isRead = useMemo(() => {
    if (readFilter === 'read') return true
    if (readFilter === 'unread') return false
    return undefined
  }, [readFilter])

  const fetchRecords = useCallback(async () => {
    setLoading(true)
    try {
      const res = await getAiResponseMonitoringRecords({
        page,
        limit,
        mode: mode === 'all' ? undefined : mode,
        isRead,
      })
      setRecordsRes(res)
    } catch (err) {
      console.error('Failed to fetch AI response monitoring records:', err)
    } finally {
      setLoading(false)
    }
  }, [isRead, mode, page])

  useEffect(() => {
    void fetchRecords()
  }, [fetchRecords])

  const handleModeChange = (value: ModeFilter) => {
    setPage(1)
    setMode(value)
  }

  const handleReadFilterChange = (value: ReadFilter) => {
    setPage(1)
    setReadFilter(value)
  }

  const handleMarkAsRead = async (id: number) => {
    await markAiResponseMonitoringRecordAsRead(id)
    await fetchRecords()
  }

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm('Delete this monitoring record?')
    if (!confirmed) return

    await deleteAiResponseMonitoringRecord(id)
    await fetchRecords()
  }

  const records = recordsRes?.items ?? []

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">AI response monitoring</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Anonymous diary entry and model response samples.
          </p>
        </div>

        <Button onClick={() => void fetchRecords()} loading={loading}>
          <RefreshCw className="size-4" />
          Refresh
        </Button>
      </div>

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <Select
          value={mode}
          onValueChange={(v) => handleModeChange(v as ModeFilter)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Mode" />
          </SelectTrigger>
          <SelectContent>
            {modeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={readFilter}
          onValueChange={(v) => handleReadFilterChange(v as ReadFilter)}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Read state" />
          </SelectTrigger>
          <SelectContent>
            {readOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="text-muted-foreground text-sm">
          Total: {recordsRes?.total ?? 0}
        </div>
      </div>

      <div className="space-y-4">
        {records.map((record) => (
          <MonitoringRecordCard
            key={record.id}
            record={record}
            onMarkAsRead={handleMarkAsRead}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {!loading && records.length === 0 && (
        <div className="text-muted-foreground rounded-md border p-8 text-center text-sm">
          No monitoring records found.
        </div>
      )}

      {recordsRes && recordsRes.pages > 1 && (
        <Pagination
          page={recordsRes.page}
          pageCount={recordsRes.pages}
          isComponent
          onPress={setPage}
        />
      )}
    </div>
  )
}

function MonitoringRecordCard({
  record,
  onMarkAsRead,
  onDelete,
}: {
  record: AiResponseMonitoringRecord
  onMarkAsRead: (id: number) => Promise<void>
  onDelete: (id: number) => Promise<void>
}) {
  const [actionLoading, setActionLoading] = useState<'read' | 'delete' | null>(
    null,
  )

  const createdAt = formatDate(record.createdAt)
  const metricsText = formatMetrics(record)
  const tagsText = record.tagsJson?.length ? record.tagsJson.join(', ') : null
  const responseText = record.fullResponseText || record.responseText

  const runAction = async (action: 'read' | 'delete') => {
    setActionLoading(action)
    try {
      if (action === 'read') await onMarkAsRead(record.id)
      if (action === 'delete') await onDelete(record.id)
    } finally {
      setActionLoading(null)
    }
  }

  return (
    <article className="bg-background overflow-hidden rounded-md border">
      <div className="bg-muted/30 flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <InfoPill>#{record.id}</InfoPill>
          <InfoPill>{record.mode}</InfoPill>
          <InfoPill>{record.aiModel}</InfoPill>
          {record.mood && <InfoPill>Mood: {record.mood}</InfoPill>}
          {metricsText && <InfoPill>{metricsText}</InfoPill>}
          {tagsText && <InfoPill>Tags: {tagsText}</InfoPill>}
          <InfoPill>{createdAt}</InfoPill>
          <span
            className={[
              'rounded-full px-2 py-1 text-xs font-medium',
              record.isRead
                ? 'bg-slate-100 text-slate-600'
                : 'bg-amber-100 text-amber-800',
            ].join(' ')}
          >
            {record.isRead ? 'Read' : 'Unread'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {!record.isRead && (
            <Button
              size="sm"
              variant="outline"
              loading={actionLoading === 'read'}
              onClick={() => void runAction('read')}
            >
              <Check className="size-4" />
              Mark read
            </Button>
          )}
          <Button
            size="sm"
            variant="error"
            loading={actionLoading === 'delete'}
            onClick={() => void runAction('delete')}
          >
            <Trash2 className="size-4" />
            Delete
          </Button>
        </div>
      </div>

      <TextSection title="Entry" text={record.entryText} />
      <TextSection title="Response" text={responseText} />

      {record.shortResponseText &&
        record.shortResponseText !== responseText && (
          <TextSection title="Short response" text={record.shortResponseText} />
        )}
    </article>
  )
}

function InfoPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-background text-muted-foreground rounded-full border px-2 py-1 text-xs">
      {children}
    </span>
  )
}

function TextSection({ title, text }: { title: string; text: string }) {
  return (
    <section className="border-b px-4 py-4 last:border-b-0">
      <div className="text-muted-foreground mb-2 text-xs font-semibold tracking-wide uppercase">
        {title}
      </div>
      <div className="text-sm leading-6 break-words whitespace-pre-wrap">
        {text || '-'}
      </div>
    </section>
  )
}

function formatDate(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return new Intl.DateTimeFormat('uk-UA', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date)
}

function formatMetrics(record: AiResponseMonitoringRecord) {
  const metrics = record.metricsJson
  if (!metrics) return null

  const items = [
    ['E', metrics.energy],
    ['F', metrics.focus],
    ['S', metrics.stress],
    ['M', metrics.motivation],
    ['Sleep', metrics.sleepQuality],
  ].filter((item) => item[1] !== null && item[1] !== undefined)

  if (!items.length) return null

  return `Metrics: ${items.map(([label, value]) => `${label}:${value}`).join(' ')}`
}
