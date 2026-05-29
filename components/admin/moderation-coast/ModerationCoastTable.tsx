import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import React from 'react'
import { ModerationCoast } from '@/types'

type Props = {
  moderationCoast: ModerationCoast[]
}
export default function ModerationCoastTable({ moderationCoast }: Props) {
  return (
    <Table className="w-full table-fixed">
      <TableHeader>
        <TableRow>
          <TableHead>Month</TableHead>
          <TableHead>Input T</TableHead>
          <TableHead>Output T</TableHead>
          <TableHead>Total T</TableHead>
          <TableHead>LLM calls</TableHead>
          <TableHead>Api calls</TableHead>
          <TableHead>Cost</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {moderationCoast &&
          moderationCoast.map((raw: ModerationCoast) => {
            return (
              <React.Fragment key={raw.monthKey}>
                <TableRow className="hover:bg-muted/50 cursor-pointer">
                  <TableCell>{raw.monthKey}</TableCell>
                  <TableCell>{raw.inputTokens}</TableCell>
                  <TableCell>{raw.outputTokens}</TableCell>
                  <TableCell>{raw.totalTokens}</TableCell>
                  <TableCell>{raw.llmReviewCalls}</TableCell>
                  <TableCell>{raw.moderationApiCalls}</TableCell>
                  <TableCell>{Number(raw.estimatedCostUsd)}</TableCell>
                </TableRow>
              </React.Fragment>
            )
          })}
      </TableBody>
    </Table>
  )
}
