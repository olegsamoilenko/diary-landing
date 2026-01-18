import Mailgun from 'mailgun.js'
import FormData from 'form-data'
import handlebars from 'handlebars'
import fs from 'fs'
import path from 'path'

type MailgunClient = ReturnType<Mailgun['client']>

const templateCache = new Map<string, handlebars.TemplateDelegate>()

function getMailgun(): MailgunClient {
  const key = process.env.MAILGUN_API_KEY
  if (!key) throw new Error('Missing MAILGUN_API_KEY')

  return new Mailgun(FormData).client({
    username: 'api',
    key,
  })
}

function loadTemplate(templateName: string): handlebars.TemplateDelegate {
  const cached = templateCache.get(templateName)
  if (cached) return cached

  const full = path.join(
    process.cwd(),
    'lib',
    'emails',
    'templates',
    templateName,
  )

  if (!fs.existsSync(full)) {
    console.error('[Emails] template not found:', full, 'cwd=', process.cwd())
    throw new Error(`Email template not found: ${full}`)
  }

  const src = fs.readFileSync(full, 'utf8')
  const compiled = handlebars.compile(src)
  templateCache.set(templateName, compiled)
  return compiled
}

export async function sendEmail(params: {
  to: string[]
  subject: string
  template: string
  context?: any
}) {
  const domain = process.env.MAILGUN_DOMAIN
  const from = process.env.MAILGUN_FROM_EMAIL

  if (!domain) throw new Error('Missing MAILGUN_DOMAIN')
  if (!from) throw new Error('Missing MAILGUN_FROM_EMAIL')

  const mg = getMailgun()
  const compiled = loadTemplate(`${params.template}.hbs`)
  const html = compiled(params.context ?? {})

  return mg.messages.create(domain, {
    to: params.to,
    subject: params.subject,
    from: `Nemory <${from}>`,
    html,
  })
}
