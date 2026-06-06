import { Platforms } from '@/types'
import { getAdminSession } from '@/lib/auth'
import CommunityActivityClient from '@/components/admin/community-activity/CommunityActivityClient'

type SP = { page?: string; platform?: Platforms }

export default async function CommunityActivityPage({
  searchParams,
}: {
  searchParams?: Promise<SP>
}) {
  const session = await getAdminSession()
  const spPromise: Promise<SP> = searchParams || Promise.resolve({})

  return (
    <CommunityActivityClient
      spPromise={spPromise}
      adminId={Number(session?.id)}
    />
  )
}
