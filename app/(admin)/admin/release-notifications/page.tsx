'use client'

import React from 'react'
import ReleaseNotificationsDialog from '@/components/admin/notifications/ReleaseNotificationsDialog'

export default function ReleaseNotificationsPage() {
  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold">Release Notifications Page</h1>
      <ReleaseNotificationsDialog />
    </div>
  )
}
