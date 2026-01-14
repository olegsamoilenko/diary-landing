import { toast } from 'sonner'

export type ToastKind = 'success' | 'error' | 'warning' | 'info'

type NotifyOpts = {
  id?: string | number
  description?: string
  duration?: number
}

export function notify(kind: ToastKind, title: string, opts?: NotifyOpts) {
  const base = {
    id: opts?.id,
    description: opts?.description,
    duration: opts?.duration,
  }

  switch (kind) {
    case 'success':
      return toast.success(title, base)
    case 'error':
      return toast.error(title, base)
    case 'warning':
      return toast.warning(title, base)
    case 'info':
      return toast.info(title, base)
  }
}

notify.success = (title: string, opts?: NotifyOpts) =>
  toast.success(title, opts)
notify.error = (title: string, opts?: NotifyOpts) => toast.error(title, opts)
notify.warning = (title: string, opts?: NotifyOpts) =>
  toast.warning(title, opts)
notify.info = (title: string, opts?: NotifyOpts) => toast.info(title, opts)
