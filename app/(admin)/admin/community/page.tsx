import { Platforms } from '@/types'
import { getAdminSession } from '@/lib/auth'
import CommunityClient from '@/components/admin/community/CommunityClient'

type SP = { page?: string; platform?: Platforms }

export default async function CommunityPage({
  searchParams,
}: {
  searchParams?: Promise<SP>
}) {
  const session = await getAdminSession()
  const spPromise: Promise<SP> = searchParams || Promise.resolve({})

  return <CommunityClient spPromise={spPromise} adminId={Number(session?.id)} />
}
