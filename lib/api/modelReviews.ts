import { apiFetch } from '@/lib/api/apiFetch'
import { ModelReview } from '@/types'

export const getAll = async (
  page: number,
  limit: number,
): Promise<ModelReview[]> => {
  return apiFetch(`/api/model-review/get-ai-model-answer-reviews`, {
    method: 'GET',
  })
}

export const markAsRead = async (id: number) => {
  return apiFetch(`/api/model-review/mark-as-read-ai-model-answer-review`, {
    method: 'POST',
    body: JSON.stringify({ id }),
  })
}
