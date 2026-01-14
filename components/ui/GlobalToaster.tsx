'use client'

import { Toaster, toast } from 'sonner'
import { useEffect } from 'react'
import { getErrorMessage } from '@/lib/errors'

export default function GlobalToaster() {
  useEffect(() => {
    const onUnhandledRejection = (e: PromiseRejectionEvent) => {
      toast.error(getErrorMessage(e.reason))
    }
    const onError = (e: ErrorEvent) => {
      toast.error(e.message || 'Unexpected error')
    }

    window.addEventListener('unhandledrejection', onUnhandledRejection)
    window.addEventListener('error', onError)
    return () => {
      window.removeEventListener('unhandledrejection', onUnhandledRejection)
      window.removeEventListener('error', onError)
    }
  }, [])

  return <Toaster richColors position="top-right" closeButton />
}
