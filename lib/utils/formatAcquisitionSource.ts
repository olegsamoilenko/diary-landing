export function formatAcquisitionSource(acquisitionMetaJson: unknown): string {
  const meta = safeJsonObject(acquisitionMetaJson)

  const referrerRaw =
    typeof meta.referrer_raw === 'string' ? meta.referrer_raw.trim() : ''

  const refParams = parseQueryLike(referrerRaw)

  if (
    typeof refParams.gclid === 'string' &&
    refParams.gclid.trim().length > 0
  ) {
    return 'Google Ads'
  }

  const out: Array<[string, string]> = []

  const keysInOrder = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term',
  ]

  for (const k of keysInOrder) {
    const v =
      (typeof meta[k] === 'string' && meta[k].trim()) ||
      (typeof refParams[k] === 'string' && refParams[k].trim()) ||
      ''
    if (v) out.push([k, v])
  }

  for (const [k, v] of Object.entries(refParams)) {
    if (!v) continue
    if (keysInOrder.includes(k)) continue
    if (k === 'gclid') continue
    if (k === 'gbraid' || k === 'wbraid') continue
    out.push([k, v])
  }

  if (out.length === 0) return 'Unknown'

  return out.map(([k, v]) => `${k}: ${v}`).join('\n')
}

function safeJsonObject(x: unknown): Record<string, any> {
  if (!x) return {}
  if (typeof x === 'object') return x as Record<string, any>
  if (typeof x === 'string') {
    try {
      const parsed = JSON.parse(x)
      return parsed && typeof parsed === 'object' ? (parsed as any) : {}
    } catch {
      return {}
    }
  }
  return {}
}

function parseQueryLike(raw: string): Record<string, string> {
  const s = raw.trim().replace(/^\?/, '')
  if (!s) return {}

  const params: Record<string, string> = {}
  for (const part of s.split('&')) {
    if (!part) continue
    const eq = part.indexOf('=')
    const key = (eq === -1 ? part : part.slice(0, eq)).trim()
    const val = (eq === -1 ? '' : part.slice(eq + 1)).trim()
    if (!key) continue

    const decodedKey = safeDecode(key)
    const decodedVal = safeDecode(val.replace(/\+/g, ' '))
    params[decodedKey] = decodedVal
  }
  return params
}

function safeDecode(s: string): string {
  try {
    return decodeURIComponent(s)
  } catch {
    return s
  }
}
