import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import React, { useRef, useState } from 'react'
import { CommonNotification, ForumContentStatus } from '@/types'
import { Topic } from '@/types/community'
import { JsonViewer } from '@/components/ui/JsonViewer'
import UserLogs from '@/components/admin/user-list/UserLogs'
import Comments from '@/components/admin/community/Comments'
import { Button } from '@/components/ui/button'
import ModerationRemoveTopicDialog from '@/components/admin/community/ModerationRemoveTopicDialog'
import { restoreTopic } from '@/lib/api/moderation'
import ModerationRestoreTopicDialog from '@/components/admin/community/ModerationRestoreTopicDialog'

type Props = {
  topics: Topic[]
  adminId: number
  onSuccessRemoveTopic: () => void
  onSuccessRestoreTopic: () => void
}
export default function CommunityTable({
  topics,
  adminId,
  onSuccessRemoveTopic,
  onSuccessRestoreTopic,
}: Props) {
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const toggle = (id: string) => {
    setExpandedTopicId((prev) => (prev === id ? null : id))
  }

  const handleRestore = async (topicId: string) => {
    await restoreTopic(topicId, { moderationRestoredByAdminId: adminId })
  }
  return (
    <Table className="w-full table-fixed">
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Comments</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Visibility</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {topics &&
          topics.map((raw: Topic) => {
            const isOpen = expandedTopicId === raw.id
            return (
              <React.Fragment key={raw.id}>
                <TableRow
                  onClick={() => toggle(raw.id)}
                  className="hover:bg-muted/50 cursor-pointer"
                >
                  <TableCell>{raw.title}</TableCell>
                  <TableCell>{raw.author.name}</TableCell>
                  <TableCell>{raw.category.title}</TableCell>
                  <TableCell>{raw.commentsCount}</TableCell>
                  <TableCell>{raw.status}</TableCell>
                  <TableCell>{raw.visibility}</TableCell>
                  <TableCell
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                  >
                    {raw.status === ForumContentStatus.PUBLISHED && (
                      <ModerationRemoveTopicDialog
                        id={raw.id}
                        adminId={adminId}
                        onSuccessRemoveTopic={onSuccessRemoveTopic}
                      />
                    )}
                    {raw.status === ForumContentStatus.REMOVED_BY_MODERATOR && (
                      <ModerationRestoreTopicDialog
                        id={raw.id}
                        onRestore={async (id) => {
                          await handleRestore(id)
                          onSuccessRestoreTopic()
                        }}
                      />
                    )}
                  </TableCell>
                </TableRow>

                {isOpen && (
                  <TableRow>
                    <TableCell colSpan={7} className="p-0">
                      <div className="bg-muted/20 grid grid-cols-[460px_1fr] gap-4 border-t p-4">
                        <div>
                          <div className="mb-2 text-sm font-medium">
                            Topic details
                          </div>

                          <div className="bg-background max-h-[1020px] overflow-auto rounded-md border p-3">
                            <JsonViewer data={raw} />
                          </div>
                        </div>

                        <div className="min-w-0">
                          <div className="mb-2">Content</div>

                          <div className="mb-2 w-full rounded-md border p-4 text-sm font-medium">
                            {raw.content}
                          </div>

                          <div
                            ref={scrollRef}
                            className="bg-background max-h-[1020px] overflow-auto"
                          >
                            <Comments topicId={raw.id} adminId={adminId} />
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            )
          })}
      </TableBody>
    </Table>
  )
}
