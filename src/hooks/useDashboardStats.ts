import { useEffect, useState } from 'react'
import { fetchHistory } from '../services/history'

export type DashboardStatsData = {
  total: number
  authentic: number
  manipulated: number
  avgConfidence: number
  sampleSize: number
}

export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStatsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    fetchHistory(1, 100)
      .then(({ items, total }) => {
        if (!active) return
        const authentic = items.filter((i) => i.verdict === 'Likely Authentic').length
        const manipulated = items.filter((i) => i.verdict === 'Likely Manipulated').length
        const avgConfidence =
          items.length > 0
            ? items.reduce((sum, i) => sum + i.confidence, 0) / items.length
            : 0
        setStats({ total, authentic, manipulated, avgConfidence, sampleSize: items.length })
      })
      .catch(() => setStats(null))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [])

  return { stats, loading }
}
