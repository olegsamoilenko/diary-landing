import React from 'react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

import AdminShell from '@/components/admin/AdminShell'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminShell>{children}</AdminShell>
}
