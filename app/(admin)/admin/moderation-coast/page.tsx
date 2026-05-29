import { Platforms } from '@/types'
import { getAdminSession } from '@/lib/auth'
import ModerationCoastClient from '@/components/admin/moderation-coast/ModerationCoastClient'

type SP = { page?: string; platform?: Platforms }

export default async function ModerationCoastPage({
  searchParams,
}: {
  searchParams?: Promise<SP>
}) {
  const session = await getAdminSession()
  const spPromise: Promise<SP> = searchParams || Promise.resolve({})

  return (
    <ModerationCoastClient
      spPromise={spPromise}
      adminId={Number(session?.id)}
    />
  )
}
