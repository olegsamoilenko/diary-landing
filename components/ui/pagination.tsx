'use client'

import Link from 'next/link'
import { useSearchParams, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function Pagination({
  page,
  pageCount,
}: {
  page: number
  pageCount: number
}) {
  const pathname = usePathname()
  const params = useSearchParams()

  const makeHref = (p: number) => {
    const sp = new URLSearchParams(params)
    sp.set('page', String(p))
    return `${pathname}?${sp.toString()}`
  }

  const prevDisabled = page <= 1
  const nextDisabled = page >= pageCount

  const windowSize = 5
  const start = Math.max(1, page - Math.floor(windowSize / 2))
  const end = Math.min(pageCount, start + windowSize - 1)
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i)

  return (
    <div className="mt-4 flex items-center gap-2">
      <Button variant="outline" size="sm" asChild disabled={prevDisabled}>
        <Link href={makeHref(page - 1)}>Prev</Link>
      </Button>

      {start > 1 && (
        <>
          <Button variant="ghost" size="sm" asChild>
            <Link href={makeHref(1)}>1</Link>
          </Button>
          {start > 2 && <span className="px-1">…</span>}
        </>
      )}

      {pages.map((p) => (
        <Button
          key={p}
          size="sm"
          variant={p === page ? 'default' : 'ghost'}
          asChild
        >
          <Link
            href={makeHref(p)}
            aria-current={p === page ? 'page' : undefined}
          >
            {p}
          </Link>
        </Button>
      ))}

      {end < pageCount && (
        <>
          {end < pageCount - 1 && <span className="px-1">…</span>}
          <Button variant="ghost" size="sm" asChild>
            <Link href={makeHref(pageCount)}>{pageCount}</Link>
          </Button>
        </>
      )}

      <Button variant="outline" size="sm" asChild disabled={nextDisabled}>
        <Link href={makeHref(page + 1)}>Next</Link>
      </Button>
    </div>
  )
}
