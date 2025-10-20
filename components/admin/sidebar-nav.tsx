'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'

const items = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/users', label: 'Users' },
  { href: '/admin/entries', label: 'Entries' },
  { href: '/admin/release-notifications', label: 'Release notifications' },
  { href: '/admin/admins', label: 'Admins' },
  { href: '/admin/logs', label: 'Logs' },
  { href: '/admin/support', label: 'Support' },
]

export function SidebarNav() {
  const pathname = usePathname()

  const isActive = (href: string, pathname: string) => {
    if (href === '/admin') return pathname === '/admin'
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <nav className="flex flex-col gap-0 space-y-2 text-sm">
      {items.map((item) => {
        const active = isActive(item.href, pathname)
        return (
          <Link
            key={item.href}
            href={item.href}
            className={[
              'rounded-md px-2 py-1.5 transition-colors',
              active
                ? 'bg-muted text-foreground font-medium'
                : 'text-muted-foreground hover:bg-muted',
            ].join(' ')}
            aria-current={active ? 'page' : undefined}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
