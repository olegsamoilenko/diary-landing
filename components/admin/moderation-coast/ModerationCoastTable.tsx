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
    <Table className="w-full min-w-[800px] table-fixed">
      <TableHeader>
        <TableRow>
          <TableHead>Місяць</TableHead>
          <TableHead>Вхідні токени</TableHead>
          <TableHead>Вихідні токени</TableHead>
          <TableHead>Усього токенів</TableHead>
          <TableHead>Виклики LLM</TableHead>
          <TableHead>Виклики API</TableHead>
          <TableHead>Оцінка, $</TableHead>
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
                  <TableCell>
                    {raw.estimatedCostUsd != null &&
                    String(raw.estimatedCostUsd).trim() !== '' &&
                    Number.isFinite(Number(raw.estimatedCostUsd))
                      ? Number(raw.estimatedCostUsd).toLocaleString('uk-UA', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 6,
                        })
                      : 'Немає даних'}
                  </TableCell>
                </TableRow>
              </React.Fragment>
            )
          })}
      </TableBody>
    </Table>
  )
}
