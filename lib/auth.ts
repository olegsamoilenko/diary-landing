import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'

const SECRET = process.env.NEXT_ADMIN_JWT_SECRET || process.env.JWT_SECRET
if (!SECRET) {
  throw new Error('Missing NEXT_ADMIN_JWT_SECRET or JWT_SECRET')
}
const SECRET_KEY = new TextEncoder().encode(SECRET)

export type AdminSession = {
  id: string
  email: string
  role: 'SUPER_ADMIN' | 'ADMIN'
  type: 'admin'
  active: boolean
  iat?: number
  exp?: number
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const store = await cookies()
  const token = store.get('admin_session')?.value
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY, {
      algorithms: ['HS256'],
    })
    return payload as AdminSession
  } catch {
    return null
  }
}

export async function requireRole(required?: 'SUPER_ADMIN' | 'ADMIN') {
  const s = await getAdminSession()
  if (!s) return null
  if (s.type !== 'admin' || s.active !== true) return null
  if (required && s.role !== required) return null
  return s
}
