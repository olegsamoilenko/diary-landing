import React from 'react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

import { getAdminSession } from '@/lib/auth'
import Link from 'next/link'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getAdminSession()

  return (
    <div className="grid min-h-screen grid-cols-[240px_1fr]">
      <aside className="border-r p-4">
        <div className="mb-4 font-semibold">Nemory Admin</div>
        <nav className="flex flex-col gap-0 space-y-2 text-sm">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/users">Users</Link>
          <Link href="/admin/entries">Entries</Link>
          <Link href="/admin/release-notifications">Release notifications</Link>
          <Link href="/admin/admins">Admins</Link>
        </nav>
        <div className="mt-6 text-xs opacity-70">
          {session?.email} &middot; {session?.role}
        </div>
      </aside>
      <main className="p-6">{children}</main>
    </div>
  )
}
