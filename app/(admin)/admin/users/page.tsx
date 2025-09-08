export const dynamic = 'force-dynamic'
export const revalidate = 0

import { requireRole } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function UsersPage() {
  const session = await requireRole('SUPER_ADMIN')
  console.log('session', session)
  if (!session) redirect('/admin')

  return (
    <>
      <h1 className="mb-4 text-xl font-semibold">User Management</h1>
      {/* тут таблиця, кнопка "Activate ADMIN" і т.д. */}
    </>
  )
}
