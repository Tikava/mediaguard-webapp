import { useEffect, useState } from 'react'
import { fetchHistory } from '../services/history'
import type { HistoryItem } from '../types/api'

export const useHistory = (initialPage = 1) => {
  const [page, setPage] = useState(initialPage)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rows, setRows] = useState<HistoryItem[]>([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    let active = true
    setLoading(true)
    fetchHistory(page)
      .then((res) => {
        if (!active) return
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

  return { page, setPage, loading, error, rows, total }
}
