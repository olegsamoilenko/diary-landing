import createMiddleware from 'next-intl/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { routing } from '@/lib/i18n/routing'
import { jwtVerify } from 'jose'

const handleI18nRouting = createMiddleware(routing)

const ADMIN_PREFIXES = ['/admin', '/admin-v2']
const AUTH_PATH = '/admin/auth'
const LOGIN_PATH = '/admin/login'
const PUBLIC_ADMIN = [AUTH_PATH, LOGIN_PATH]

const SECRET = new TextEncoder().encode(
  process.env.NEXT_ADMIN_JWT_SECRET || process.env.JWT_SECRET,
)

async function verify(token?: string) {
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, SECRET, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (err) {
    console.error('JWT verify failed', err)
    return null
  }
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  if (PUBLIC_ADMIN.some((p) => pathname.startsWith(p))) {
    return NextResponse.next()
  }

  if (
    ADMIN_PREFIXES.some(
      (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
    )
  ) {
    const token = req.cookies.get('admin_session')?.value
    const session = await verify(token)

    if (!session || session.type !== 'admin' || session.active !== true) {
      const url = req.nextUrl.clone()
      url.pathname = AUTH_PATH
      url.searchParams.set('next', req.nextUrl.pathname + req.nextUrl.search)
      return NextResponse.redirect(url)
    }

    return NextResponse.next()
  }

  return handleI18nRouting(req)
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
}
