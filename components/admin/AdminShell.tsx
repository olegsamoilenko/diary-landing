import type { ReactNode } from 'react'
import Image from 'next/image'
import { getAdminSession } from '@/lib/auth'
import { SidebarNav, type AdminNavItem } from '@/components/admin/sidebar-nav'
import { cn } from '@/lib/utils'

export default async function AdminShell({
  children,
  title = 'Nemory Admin',
  navItems,
  variant = 'classic',
}: {
  children: ReactNode
  title?: string
  navItems?: readonly AdminNavItem[]
  variant?: 'classic' | 'v2'
}) {
  const session = await getAdminSession()
  const isV2 = variant === 'v2'

  return (
    <div
      className={cn(
        isV2
          ? 'admin-v2 bg-background text-foreground min-h-dvh lg:grid lg:grid-cols-[260px_minmax(0,1fr)]'
          : 'grid min-h-screen grid-cols-[240px_1fr]',
      )}
    >
      <aside
        className={cn(
          isV2
            ? 'border-border bg-card flex flex-col border-b px-5 py-6 lg:sticky lg:top-0 lg:h-dvh lg:overflow-y-auto lg:border-r lg:border-b-0'
            : 'border-r p-4',
        )}
      >
        {isV2 ? (
          <div className="mb-8 flex items-center gap-3 px-2">
            <Image
              src="/assets/nemory-mark-v2.svg"
              alt=""
              width={40}
              height={40}
              className="size-10 shrink-0"
            />
            <div>
              <div className="text-lg font-semibold tracking-tight text-[var(--admin-brand)]">
                Nemory
              </div>
              <div className="text-muted-foreground text-xs">
                Administration
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-4 font-semibold">{title}</div>
        )}
        <SidebarNav navItems={navItems} variant={variant} />
        <div
          className={cn(
            isV2
              ? 'border-border mt-8 flex items-center gap-3 border-t pt-5 lg:mt-auto'
              : 'mt-6 text-xs opacity-70',
          )}
        >
          {isV2 ? (
            <>
              <div
                className="bg-muted text-muted-foreground flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
                aria-hidden="true"
              >
                {session?.email?.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <div
                  className="truncate text-xs font-medium"
                  title={session?.email}
                >
                  {session?.email}
                </div>
                <div className="text-muted-foreground mt-1 text-xs">
                  {session?.role === 'SUPER_ADMIN' ? 'Super admin' : 'Admin'}
                </div>
              </div>
            </>
          ) : (
            <>
              {session?.email} &middot; {session?.role}
            </>
          )}
        </div>
      </aside>
      <main
        className={cn(
          'min-w-0',
          isV2 ? 'px-6 py-8 sm:px-10 lg:px-12 lg:py-10' : 'p-6',
        )}
      >
        <div className={isV2 ? 'mx-auto w-full max-w-[1440px]' : undefined}>
          {children}
        </div>
      </main>
    </div>
  )
}
