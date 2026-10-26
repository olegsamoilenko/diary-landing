import type { ReactNode } from 'react'
import AdminShell from '@/components/admin/AdminShell'
import type { AdminNavItem } from '@/components/admin/sidebar-nav'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const navItems: AdminNavItem[] = [
  { href: '/admin-v2', label: 'Dashboard', icon: 'dashboard' },
  {
    href: '/admin-v2/users-statistics',
    label: 'Статистика користувачів',
    icon: 'users',
    section: 'Користувачі',
  },
  {
    href: '/admin-v2/new-users',
    label: 'Нові користувачі',
    icon: 'new-users',
    section: 'Користувачі',
  },
  {
    href: '/admin-v2/users-activity',
    label: 'Активність користувачів',
    icon: 'activity',
    section: 'Користувачі',
  },
  {
    href: '/admin-v2/observations',
    label: 'Спостереження',
    icon: 'observations',
    section: 'Користувачі',
  },
]

export default function AdminV2Layout({ children }: { children: ReactNode }) {
  return (
    <AdminShell title="Nemory Admin V2" navItems={navItems} variant="v2">
      {children}
    </AdminShell>
  )
}
