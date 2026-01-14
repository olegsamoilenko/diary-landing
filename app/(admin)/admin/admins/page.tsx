import { requireRole } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AdminsClient from './AdminsClient'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function AdminsPage() {
  const session = await requireRole('SUPER_ADMIN')
  if (!session) redirect('/admin')

  return <AdminsClient />
}
