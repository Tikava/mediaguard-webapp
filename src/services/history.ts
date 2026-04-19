import { httpClient } from './httpClient'
import type { PaginatedDetectionTaskList, HistoryItem } from '../types/api'
import { taskToHistoryItem } from '../utils/mappers'

export async function fetchHistory(
  page = 1,
  pageSize?: number,
): Promise<{ items: HistoryItem[]; total: number }> {
  const params = new URLSearchParams({ page: String(page) })
  if (pageSize) params.set('page_size', String(pageSize))
  const data = await httpClient.get<PaginatedDetectionTaskList>(
    `/api/detection/tasks/?${params}`,
  )
  return {
    items: data.results.map(taskToHistoryItem),
    total: data.count,
  }
}
