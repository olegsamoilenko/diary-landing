import { Comment, ForumContentStatus, User } from '@/types'
import ModerationRemoveCommentDialog from '@/components/admin/community/ModerationRemoveCommentDialog'
import ModerationRestoreCommentDialog from '@/components/admin/community/ModerationRestoreCommentDialog'
import { restoreComment } from '@/lib/api/moderation'
import React, { useState } from 'react'
import { JsonViewer } from '@/components/ui/JsonViewer'
import ModerationAnswerTopicDialog from '@/components/admin/community/ModerationAnswerTopicDialog'
import ModerationEditCommentDialog from '@/components/admin/community/ModerationEditCommentDialog'

type Props = {
  comment: Comment
  adminId: number
  onSuccessRemoveComment: () => void
  onSuccessRestoreComment: () => void
  onSuccessAddAnswerComment?: () => void
  onSuccessEditComment?: () => void
  systemUsers: User[]
}

export default function CommentCard({
  comment,
  adminId,
  onSuccessRemoveComment,
  onSuccessRestoreComment,
  onSuccessAddAnswerComment,
  onSuccessEditComment,
  systemUsers,
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
    <div
      className="mb-4 flex flex-col gap-2 rounded-2xl border p-4"
      id={`comment-${comment.id}`}
    >
      <div className="flex gap-4">
        <div>{comment.authorProfile?.username ?? 'unknown'}</div>
        <div>{comment.author?.id}</div>
        <div>{comment.author?.settings?.lang}</div>
        <div>{new Date(comment.createdAt).toLocaleString()}</div>
        <div>{comment.status}</div>
      </div>
      <div>{comment.id}</div>
      <div className="w-full min-w-0 [overflow-wrap:anywhere] whitespace-pre-wrap">
        {comment.content}
      </div>
      <div className="mb-2 flex gap-4">
        {comment.status === ForumContentStatus.PUBLISHED && (
          <ModerationRemoveCommentDialog
            id={comment.id}
            adminId={adminId}
            lang={comment.author?.settings?.lang}
            targetUserId={comment.author?.id}
            onSuccessRemoveComment={onSuccessRemoveComment}
          />
        )}
        {comment.status === ForumContentStatus.REMOVED_BY_MODERATOR && (
          <ModerationRestoreCommentDialog
            id={comment.id}
            targetUserId={comment.author?.id}
            onRestore={async (id: string, targetUserId: number) => {
              await handleRestore(id, targetUserId)
              onSuccessRestoreComment()
            }}
          />
        )}
        <ModerationAnswerTopicDialog
          id={comment.topicId}
          adminId={adminId}
          parentCommentId={comment.id}
          onSuccessAddAnswerComment={onSuccessAddAnswerComment}
          systemUsers={systemUsers}
        />
        {(comment.author.role === 'forum_admin' ||
          comment.author.role === 'forum_moderator' ||
          comment.author.role === 'nemory') && (
          <ModerationEditCommentDialog
            comment={comment}
            onSuccessEditComment={onSuccessEditComment}
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
            id={`comment-${reply.id}`}
          >
            <div className="flex gap-4">
              <div>{reply.authorProfile?.username ?? 'unknown'}</div>
              <div>{reply.author?.id}</div>
              <div>{new Date(reply.createdAt).toLocaleString()}</div>
              <div>{reply.status}</div>
            </div>
            <div>{reply.id}</div>
            {reply.replyToComment && (
              <div
                className={
                  'border- ml-4 flex flex-col gap-2 rounded-2xl border border-gray-300 p-4'
                }
              >
                <div className="flex gap-4 text-gray-500">
                  <div>Reply to</div>
                  <div>{reply.replyToComment.authorProfile?.username}</div>
                </div>
                <div className="w-full min-w-0 [overflow-wrap:anywhere] whitespace-pre-wrap">
                  {reply.replyToComment.content}
                </div>
              </div>
            )}
            <div className="w-full min-w-0 [overflow-wrap:anywhere] whitespace-pre-wrap">
              {reply.content}
            </div>
            <div className="mb-2 flex gap-4">
              {reply.status === ForumContentStatus.PUBLISHED && (
                <ModerationRemoveCommentDialog
                  id={reply.id}
                  targetUserId={reply.author?.id}
                  lang={reply.author?.settings?.lang}
                  adminId={adminId}
                  onSuccessRemoveComment={onSuccessRemoveComment}
                />
              )}
              {reply.status === ForumContentStatus.REMOVED_BY_MODERATOR && (
                <ModerationRestoreCommentDialog
                  id={reply.id}
                  targetUserId={reply.author?.id}
                  onRestore={async (id: string, targetUserId: number) => {
                    await handleRestore(id, targetUserId)
                    onSuccessRestoreComment()
                  }}
                />
              )}
              <ModerationAnswerTopicDialog
                id={comment.topicId}
                adminId={adminId}
                parentCommentId={comment.id}
                replyToCommentId={reply.id}
                systemUsers={systemUsers}
              />
              {(reply.author.role === 'forum_admin' ||
                reply.author.role === 'forum_moderator' ||
                reply.author.role === 'nemory') && (
                <ModerationEditCommentDialog
                  comment={reply}
                  onSuccessEditComment={onSuccessEditComment}
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
