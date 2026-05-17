import { Comment, ForumContentStatus } from '@/types'
import ModerationRemoveCommentDialog from '@/components/admin/community/ModerationRemoveCommentDialog'
import ModerationRestoreCommentDialog from '@/components/admin/community/ModerationRestoreCommentDialog'
import { restoreComment } from '@/lib/api/moderation'
import React, { useState } from 'react'
import { JsonViewer } from '@/components/ui/JsonViewer'

type Props = {
  comment: Comment
  adminId: number
  onSuccessRemoveComment: () => void
  onSuccessRestoreComment: () => void
}

export default function CommentCard({
  comment,
  adminId,
  onSuccessRemoveComment,
  onSuccessRestoreComment,
}: Props) {
  const [expandedCommentId, setExpandedCommentId] = useState<string | null>(
    null,
  )
  const [expandedReplyId, setExpandedReplyId] = useState<string | null>(null)
  const handleRestore = async (commentId: string, targetUserId: number) => {
    await restoreComment(commentId, {
      moderationRestoredByAdminId: adminId,
      targetUserId,
    })
  }

  const toggleComment = (id: string) => {
    setExpandedCommentId((prev) => (prev === id ? null : id))
  }

  const toggleReply = (id: string) => {
    setExpandedReplyId((prev) => (prev === id ? null : id))
  }

  const isOpenComment = expandedCommentId === comment.id
  return (
    <div className="mb-4 flex flex-col gap-2 rounded-2xl border p-4">
      <div className="flex gap-4">
        <div>{comment.author.name}</div>
        <div>{comment.author.id}</div>
        <div>{comment.author.settings.lang}</div>
        <div>{new Date(comment.createdAt).toLocaleString()}</div>
        <div>{comment.status}</div>
      </div>
      <div>{comment.content}</div>
      <div className="mb-2">
        {comment.status === ForumContentStatus.PUBLISHED && (
          <ModerationRemoveCommentDialog
            id={comment.id}
            adminId={adminId}
            lang={comment.author.settings.lang}
            targetUserId={comment.author.id}
            onSuccessRemoveComment={onSuccessRemoveComment}
          />
        )}
        {comment.status === ForumContentStatus.REMOVED_BY_MODERATOR && (
          <ModerationRestoreCommentDialog
            id={comment.id}
            targetUserId={comment.author.id}
            onRestore={async (id: string, targetUserId: number) => {
              await handleRestore(id, targetUserId)
              onSuccessRestoreComment()
            }}
          />
        )}
      </div>
      <div className="mb-2">
        <button className="underline" onClick={() => toggleComment(comment.id)}>
          Expand
        </button>
      </div>
      {isOpenComment && (
        <div>
          <JsonViewer data={comment} />
        </div>
      )}
      {comment.replies.map((reply) => {
        const isOpenReply = expandedReplyId === reply.id
        return (
          <div
            key={reply.id}
            className="ml-4 flex flex-col gap-2 rounded-2xl border p-4"
          >
            <div className="flex gap-4">
              <div>{reply.author.name}</div>
              <div>{reply.author.id}</div>
              <div>{new Date(reply.createdAt).toLocaleString()}</div>
              <div>{reply.status}</div>
            </div>
            <div>{reply.content}</div>
            <div>
              {reply.status === ForumContentStatus.PUBLISHED && (
                <ModerationRemoveCommentDialog
                  id={reply.id}
                  targetUserId={reply.author.id}
                  lang={reply.author.settings.lang}
                  adminId={adminId}
                  onSuccessRemoveComment={onSuccessRemoveComment}
                />
              )}
              {reply.status === ForumContentStatus.REMOVED_BY_MODERATOR && (
                <ModerationRestoreCommentDialog
                  id={reply.id}
                  targetUserId={reply.author.id}
                  onRestore={async (id: string, targetUserId: number) => {
                    await handleRestore(id, targetUserId)
                    onSuccessRestoreComment()
                  }}
                />
              )}
            </div>
            <div className="mb-2">
              <button
                className="underline"
                onClick={() => toggleReply(reply.id)}
              >
                Expand
              </button>
            </div>
            {isOpenReply && (
              <div>
                <JsonViewer data={reply} />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
