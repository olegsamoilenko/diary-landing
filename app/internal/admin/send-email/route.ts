import { NextResponse } from 'next/server'
import { requireRole } from '@/lib/auth'
import { sendEmail } from '@/lib/emails/email.service'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const session = await requireRole('ADMIN')
  if (!session) {
    return NextResponse.json(
      { ok: false, error: 'Unauthorized' },
      { status: 401 },
    )
  }

  try {
    const body = await req.json()

    const to = Array.isArray(body.to) ? body.to : [body.to].filter(Boolean)
    const subject = String(body.subject ?? '').trim()
    const title = String(body.title ?? '').trim()
    const html = String(body.html ?? '').trim()

    if (!to.length) {
      return NextResponse.json(
        { ok: false, error: 'Missing "to"' },
        { status: 400 },
      )
    }
    if (!subject) {
      return NextResponse.json(
        { ok: false, error: 'Missing "subject"' },
        { status: 400 },
      )
    }

    await sendEmail({
      to,
      subject,
      template: 'email',
      context: { title: title || subject, html },
    })

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    console.error('[send-email] failed:', e)
    return NextResponse.json(
      { ok: false, error: e?.message ?? 'Unknown error' },
      { status: 400 },
    )
  }
}
