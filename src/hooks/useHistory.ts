import { useEffect, useRef, useState } from 'react'
import { fetchHistory } from '../services/history'
import { deleteTask } from '../services/detections'
import type { HistoryItem } from '../types/api'

type CacheEntry = { items: HistoryItem[]; total: number }

export const useHistory = (initialPage = 1) => {
  const [page, setPage] = useState(initialPage)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rows, setRows] = useState<HistoryItem[]>([])
  const [total, setTotal] = useState(0)
  const cache = useRef<Map<number, CacheEntry>>(new Map())

  useEffect(() => {
    const cached = cache.current.get(page)
    if (cached) {
      setRows(cached.items)
      setTotal(cached.total)
      setError(null)
      return
    }

    let active = true
    setLoading(true)
    fetchHistory(page)
      .then((res) => {
        if (!active) return
        cache.current.set(page, { items: res.items, total: res.total })
        setRows(res.items)
        setTotal(res.total)
        setError(null)
      })
      .catch((err) => {
        if (!active) return
        setError(err instanceof Error ? err.message : null)
      })
      .finally(() => active && setLoading(false))

    return () => {
      active = false
    }
  }, [page])

  const deleteRow = async (id: string) => {
    await deleteTask(id)
    setRows((prev) => prev.filter((r) => r.id !== id))
    setTotal((prev) => prev - 1)
    // Invalidate cache from current page onwards — pagination shifts after deletion
    Array.from(cache.current.keys())
      .filter((k) => k >= page)
      .forEach((k) => cache.current.delete(k))
  }

  return { page, setPage, loading, error, rows, total, deleteRow }
}
