import React from 'react'

const pre = {
  whiteSpace: 'pre-wrap' as const,
  wordBreak: 'break-word' as const,
  overflowWrap: 'anywhere' as const,
}

function safeStringify(obj: unknown, space = 2) {
  const seen = new WeakSet()
  return JSON.stringify(
    obj,
    (_, v) => {
      if (typeof v === 'object' && v !== null) {
        if (seen.has(v as object)) return '[Circular]'
        seen.add(v as object)
      }
      return v
    },
    space,
  )
}

export function RenderValue({ value }: { value: unknown }) {
  if (value == null) return <span>null</span>
  if (value instanceof Error) {
    return (
      <details>
        <summary>
          {value.name}: {value.message}
        </summary>
        {value.stack && <pre style={pre}>{value.stack}</pre>}
      </details>
    )
  }
  if (Array.isArray(value)) {
    return (
      <div style={{ display: 'grid', gap: 4 }}>
        {value.map((v, i) => (
          <div key={i} style={{ display: 'flex', gap: 6 }}>
            <strong>{i}:</strong> <RenderValue value={v} />
          </div>
        ))}
      </div>
    )
  }
  if (typeof value === 'object') {
    return <pre style={pre}>{safeStringify(value)}</pre>
  }
  return <span>{String(value)}</span>
}

export function normalizeData(data: unknown): Array<[string, unknown]> {
  if (!data || typeof data !== 'object') return [['value', data]]

  const d = data as Record<string, unknown>
  if (Array.isArray(d.args)) return [['args', d.args]]

  return Object.entries(d)
}
