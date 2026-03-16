import createMiddleware from 'next-intl/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { routing } from '@/lib/i18n/routing'
import { jwtVerify } from 'jose'

const handleI18nRouting = createMiddleware(routing)

const ADMIN_PREFIX = '/admin'
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
    return payload as any
  } catch (err) {
    console.error('JWT verify failed', err)
    return null
  }
}

export async function proxy(req: NextRequest) {
  console.log('--- PROXY DEBUG START ---')
  console.log('req.url =', req.url)
  console.log('nextUrl.href =', req.nextUrl.href)
  console.log('host =', req.headers.get('host'))
  console.log('x-forwarded-host =', req.headers.get('x-forwarded-host'))
  console.log('x-forwarded-proto =', req.headers.get('x-forwarded-proto'))
  console.log('x-forwarded-port =', req.headers.get('x-forwarded-port'))
  console.log('--- PROXY DEBUG END ---')
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

  if (pathname === ADMIN_PREFIX || pathname.startsWith(`${ADMIN_PREFIX}/`)) {
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
