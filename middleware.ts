import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const ADMIN_PREFIX = '/admin'
const AUTH_PATH = '/admin/auth'
const LOGIN_PATH = '/admin/login' // якщо є така сторінка
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
  } catch {
    return null
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (PUBLIC_ADMIN.some((p) => pathname.startsWith(p))) {
    return NextResponse.next()
  }

  if (pathname === ADMIN_PREFIX || pathname.startsWith(`${ADMIN_PREFIX}/`)) {
    const token = req.cookies.get('admin_session')?.value
    const session = await verify(token)

    const debug = (res: NextResponse) => {
      if (session) {
        res.headers.set('x-mw', 'hit')
        res.headers.set('x-admin-role', String(session.role || 'none'))
        res.headers.set('x-admin-active', String(session.active))
      } else {
        res.headers.set('x-mw', 'no-session')
      }
      return res
    }

    if (!session || session.type !== 'admin' || session.active !== true) {
      const url = req.nextUrl.clone()
      url.pathname = AUTH_PATH
      url.searchParams.set('next', pathname)
      return NextResponse.redirect(url)
    }

    if (pathname.startsWith('/admin/users') && session.role !== 'SUPER_ADMIN') {
      const url = req.nextUrl.clone()
      url.pathname = '/admin'
      return debug(NextResponse.redirect(url))
    }

    return debug(NextResponse.next())
  }

  return NextResponse.next()
}

export const config = { matcher: ['/admin', '/admin/:path*'] }
