import { Platforms } from '@/types'
import { getAdminSession } from '@/lib/auth'
import ModerationLogsClient from '@/components/admin/moderation-logs/ModerationLogsClient'

type SP = { page?: string; platform?: Platforms }

export default async function ModerationLogsPage({
  searchParams,
}: {
  searchParams?: Promise<SP>
}) {
  const session = await getAdminSession()
  const spPromise: Promise<SP> = searchParams || Promise.resolve({})

  return (
    <ModerationLogsClient spPromise={spPromise} adminId={Number(session?.id)} />
  )
}
