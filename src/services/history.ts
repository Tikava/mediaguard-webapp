import type { HistoryItem } from '../types/api'

export async function fetchHistory(page = 1, pageSize = 10): Promise<{ items: HistoryItem[]; total: number }> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const items: HistoryItem[] = Array.from({ length: pageSize }).map((_, idx) => {
    const id = `${page}-${idx}`
    return {
      id,
      inputType: idx % 2 === 0 ? 'text' : 'image',
      verdict: idx % 3 === 0 ? 'Likely Manipulated' : 'Likely Authentic',
      confidence: 0.5 + (idx % 4) * 0.1,
      createdAt: new Date(Date.now() - idx * 3600 * 1000).toISOString(),
    }
  })
  return { items, total: 42 }
}
