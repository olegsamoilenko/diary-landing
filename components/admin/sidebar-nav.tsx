'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  Activity,
  Eye,
  LayoutDashboard,
  UserPlus,
  UsersRound,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const items = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/users', label: 'Users' },
  { href: '/admin/users-list', label: 'Users List' },
  { href: '/admin/users-activity', label: 'Users Activity' },
  { href: '/admin/user-info', label: 'User Info' },
  { href: '/admin/user-monitoring', label: 'User Monitoring' },
  { href: '/admin/diary', label: 'Diary' },
  { href: '/admin/ai-response-monitoring', label: 'AI Response Monitoring' },
  { href: '/admin/tokens', label: 'Credits ' },
  { href: '/admin/tokens-usage', label: 'Credits  usage' },
  { href: '/admin/finance', label: 'Finance' },
  { href: '/admin/settings', label: 'Settings' },
  { href: '/admin/model-reviews', label: 'Model Reviews' },
  { href: '/admin/release-notifications', label: 'Release notifications' },
  { href: '/admin/common-notifications', label: 'Common notifications' },
  { href: '/admin/admins', label: 'Admins' },
  { href: '/admin/logs', label: 'Logs' },
  { href: '/admin/server-logs', label: 'Server Logs' },
  { href: '/admin/support', label: 'Support' },
  { href: '/admin/community', label: 'Community' },
  { href: '/admin/community-activity', label: 'Community Activity' },
  { href: '/admin/reports', label: 'Reports' },
  { href: '/admin/moderation-logs', label: 'Moderation logs' },
  { href: '/admin/moderation-coast', label: 'Moderation coast' },
  { href: '/admin/subscriptions-migration', label: 'Subscriptions migration' },
]

export type AdminNavItem = {
  href: string
  label: string
  icon?: 'dashboard' | 'users' | 'new-users' | 'activity' | 'observations'
  section?: string
}

const navIcons = {
  dashboard: LayoutDashboard,
  users: UsersRound,
  'new-users': UserPlus,
  activity: Activity,
  observations: Eye,
}

export function SidebarNav({
  navItems = items,
  variant = 'classic',
}: {
  navItems?: readonly AdminNavItem[]
  variant?: 'classic' | 'v2'
}) {
  const pathname = usePathname()
  const isV2 = pathname === '/admin-v2' || pathname.startsWith('/admin-v2/')

  const isActive = (href: string, pathname: string) => {
    if (href === '/admin' || href === '/admin-v2') return pathname === href
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <nav className="flex flex-col gap-0 space-y-2 text-sm">
      <div
        className="bg-muted mb-4 grid grid-cols-2 gap-1 rounded-xl p-1"
        role="group"
        aria-label="Admin version"
      >
        <Button
          asChild
          size="sm"
          variant={isV2 ? 'ghost' : 'default'}
          className="rounded-lg"
        >
          <Link href="/admin" aria-current={!isV2 ? 'location' : undefined}>
            Admin V1
          </Link>
        </Button>
        <Button
          asChild
          size="sm"
          variant={isV2 ? 'default' : 'ghost'}
          className="rounded-lg"
        >
          <Link href="/admin-v2" aria-current={isV2 ? 'location' : undefined}>
            Admin V2
          </Link>
        </Button>
      </div>
      {navItems.map((item, index) => {
        const active = isActive(item.href, pathname)
        const Icon = item.icon ? navIcons[item.icon] : null
        const startsSection =
          item.section && item.section !== navItems[index - 1]?.section
        return (
          <React.Fragment key={item.href}>
            {startsSection && (
              <div className="text-muted-foreground px-3 pt-6 pb-2 text-[10px] font-semibold tracking-[0.16em] uppercase">
                {item.section}
              </div>
            )}
            <Link
              href={item.href}
              className={cn(
                'focus-visible:ring-ring transition-colors outline-none focus-visible:ring-2',
                variant === 'v2'
                  ? 'flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5'
                  : 'rounded-md px-2 py-1.5',
                active
                  ? variant === 'v2'
                    ? 'bg-accent text-accent-foreground font-semibold'
                    : 'bg-muted text-foreground font-medium'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
              aria-current={active ? 'page' : undefined}
            >
              {Icon && (
                <Icon
                  className="size-[18px] shrink-0"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              )}
              {item.label}
              {variant === 'v2' && active && (
                <span
                  className="ml-auto size-1.5 rounded-full bg-current"
                  aria-hidden="true"
                />
              )}
            </Link>
          </React.Fragment>
        )
      })}
    </nav>
  )
}
