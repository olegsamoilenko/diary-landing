import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import React, { useState } from 'react'
import type { ModelReview } from '@/types'
import { Button } from '@/components/ui/button'
import { markAsRead } from '@/lib/api/modelReviews'

type Props = {
  reviews: ModelReview[]
  onSuccessMarkAsRead?: () => void
}

export default function AllModelReviewsTable({
  reviews,
  onSuccessMarkAsRead,
}: Props) {
  const [expandedUserId, setExpandedUserId] = useState<number | null>(null)

  const toggle = (id: number) => {
    setExpandedUserId((prev) => (prev === id ? null : id))
  }

  const handleRead = async (id: number) => {
    await markAsRead(id)
    onSuccessMarkAsRead?.()
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>User ID</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Is Helpful</TableHead>
          <TableHead>Model</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {reviews?.map((raw) => {
          const isOpen = expandedUserId === raw.id

          return (
            <React.Fragment key={raw.id}>
              <TableRow
                onClick={() => toggle(raw.id)}
                className="hover:bg-muted/50 cursor-pointer"
              >
                <TableCell>{raw.id}</TableCell>
                <TableCell>{raw.userId}</TableCell>
                <TableCell>{raw.type}</TableCell>
                <TableCell
                  className={raw.isHelpful ? 'text-green-600' : 'text-red-600'}
                >
                  {raw.isHelpful ? 'Yes' : 'No'}
                </TableCell>
                <TableCell>{raw.aiModel}</TableCell>
                <TableCell>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation()

                      const confirmed = window.confirm(
                        'Mark this review as read?',
                      )

                      if (!confirmed) return

                      void handleRead(raw.id)
                    }}
                  >
                    Mark Read
                  </Button>
                </TableCell>
              </TableRow>

              {isOpen && (
                <TableRow>
                  <TableCell colSpan={3} className="p-0">
                    <div className="bg-muted/20 border-t p-4">
                      <div className="mb-2 text-sm font-medium">
                        Unhelpful Answer Descriptions
                      </div>
                      <div className="bg-background max-h-[1020px] overflow-auto rounded-md border p-3">
                        {raw.unhelpfulAnswerDescriptions?.join(', ')}
                      </div>
                    </div>
                    <div className="bg-muted/20 border-t p-4">
                      <div className="mb-2 text-sm font-medium">
                        Unhelpful Comment
                      </div>
                      <div className="bg-background max-h-[1020px] overflow-auto rounded-md border p-3">
                        {raw.unhelpfulComment}
                      </div>
                    </div>
                    <div className="bg-muted/20 border-t p-4">
                      <div className="mb-2 text-sm font-medium">
                        Improvement Comment
                      </div>
                      <div className="bg-background max-h-[1020px] overflow-auto rounded-md border p-3">
                        {raw.improvementComment}
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
