import { httpClient } from './httpClient'
import type { PaginatedDetectionTaskList, HistoryItem } from '../types/api'
import { taskToHistoryItem } from '../utils/mappers'

export async function fetchHistory(
  page = 1,
): Promise<{ items: HistoryItem[]; total: number }> {
  const data = await httpClient.get<PaginatedDetectionTaskList>(
    `/api/detection/tasks/?page=${page}`,
  )
  return {
    items: data.results.map(taskToHistoryItem),
    total: data.count,
  }
}
