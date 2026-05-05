import type { HistoryItem, PaginatedDetectionTaskList } from '../types/api'
import { taskToHistoryItem } from '../utils/mappers'
import { httpClient } from './httpClient'

export async function fetchHistory(
  page = 1,
  pageSize?: number,
): Promise<{ items: HistoryItem[]; total: number }> {
  const qs = pageSize ? `page=${page}&page_size=${pageSize}` : `page=${page}`
  const data = await httpClient.get<PaginatedDetectionTaskList>(`/api/detection/tasks/?${qs}`)
  return {
    items: data.results.map(taskToHistoryItem),
    total: data.count,
  }
}
