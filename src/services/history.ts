import type { HistoryItem } from '../types/api'
import { taskToHistoryItem } from '../utils/mappers'
import { getMockHistory } from './mockData'

const delay = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms))

export async function fetchHistory(
  page = 1,
  pageSize = 5,
): Promise<{ items: HistoryItem[]; total: number }> {
  await delay(600)
  const data = getMockHistory(page, pageSize)
  return {
    items: data.results.map(taskToHistoryItem),
    total: data.count,
  }
}
