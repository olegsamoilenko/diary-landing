import { Platforms } from '@/types'
import { getAdminSession } from '@/lib/auth'
import ReportsClient from '@/components/admin/reports/ReportsClient'

type SP = { page?: string; platform?: Platforms }

export default async function ReportsPage({
  searchParams,
}: {
  searchParams?: Promise<SP>
}) {
  const session = await getAdminSession()
  const spPromise: Promise<SP> = searchParams || Promise.resolve({})

  return <ReportsClient spPromise={spPromise} adminId={Number(session?.id)} />
}
