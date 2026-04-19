import React from 'react'
import { motion } from 'framer-motion'
import { fadeUp } from '../../utils/motion'
import type { DashboardStatsData } from '../../hooks/useDashboardStats'

interface StatCardProps {
  label: string
  value: string
  sub?: string
  iconBg: string
  icon: React.ReactNode
}

const StatCard: React.FC<StatCardProps> = ({ label, value, sub, iconBg, icon }) => (
  <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-card ring-1 ring-slate-100">
    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconBg}`}>
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-0.5 text-2xl font-bold text-slate-900 leading-none">{value}</p>
      {sub && <p className="mt-0.5 text-xs text-slate-400">{sub}</p>}
    </div>
  </div>
)

const SkeletonCard = () => (
  <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-card ring-1 ring-slate-100 animate-pulse">
    <div className="h-11 w-11 shrink-0 rounded-xl bg-slate-100" />
    <div className="flex-1 space-y-2">
      <div className="h-3 w-20 rounded bg-slate-100" />
      <div className="h-6 w-14 rounded bg-slate-100" />
    </div>
  </div>
)

interface DashboardStatsProps {
  stats: DashboardStatsData | null
  loading: boolean
  labels: {
    total: string
    authentic: string
    manipulated: string
    avgConfidence: string
    ofRecent: string
  }
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats, loading, labels }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    )
  }

  if (!stats) return null

  const authenticPct = stats.sampleSize > 0
    ? Math.round((stats.authentic / stats.sampleSize) * 100)
    : 0
  const manipulatedPct = stats.sampleSize > 0
    ? Math.round((stats.manipulated / stats.sampleSize) * 100)
    : 0
  const sub = stats.sampleSize < stats.total
    ? labels.ofRecent.replace('{{n}}', String(stats.sampleSize))
    : undefined

  return (
    <motion.div
      className="grid grid-cols-2 gap-3 lg:grid-cols-4"
      initial="hidden"
      animate="visible"
      variants={fadeUp()}
    >
      <StatCard
        label={labels.total}
        value={String(stats.total)}
        iconBg="bg-slate-100"
        icon={
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <rect x="3" y="3" width="6" height="6" rx="1.5" stroke="#64748b" strokeWidth="1.5" />
            <rect x="11" y="3" width="6" height="6" rx="1.5" stroke="#64748b" strokeWidth="1.5" />
            <rect x="3" y="11" width="6" height="6" rx="1.5" stroke="#64748b" strokeWidth="1.5" />
            <rect x="11" y="11" width="6" height="6" rx="1.5" stroke="#64748b" strokeWidth="1.5" />
          </svg>
        }
      />
      <StatCard
        label={labels.authentic}
        value={`${authenticPct}%`}
        sub={sub}
        iconBg="bg-emerald-50"
        icon={
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <circle cx="10" cy="10" r="7" stroke="#10b981" strokeWidth="1.5" />
            <path d="M7 10l2 2 4-4" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        }
      />
      <StatCard
        label={labels.manipulated}
        value={`${manipulatedPct}%`}
        sub={sub}
        iconBg="bg-rose-50"
        icon={
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <circle cx="10" cy="10" r="7" stroke="#f43f5e" strokeWidth="1.5" />
            <path d="M7 7l6 6M13 7l-6 6" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        }
      />
      <StatCard
        label={labels.avgConfidence}
        value={`${Math.round(stats.avgConfidence * 100)}%`}
        sub={sub}
        iconBg="bg-blue-50"
        icon={
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M3 14l4-4 3 3 4-5 3 2" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        }
      />
    </motion.div>
  )
}

export default DashboardStats
