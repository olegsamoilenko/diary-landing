import { requireRole } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AdminsClient from './AdminsClient'
import { use } from 'react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

type SP = { page?: string }

export default async function AdminsPage({
  searchParams,
}: {
  searchParams?: Promise<SP>
}) {
  const session = await requireRole('SUPER_ADMIN')
  if (!session) redirect('/admin')
  const spPromise: Promise<SP> = searchParams || Promise.resolve({})

  return <AdminsClient spPromise={spPromise} />
}
