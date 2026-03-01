import React from 'react'
import { motion } from 'framer-motion'
import { springHover, tap, fadeUp } from '../../utils/motion'
import { formatDate } from '../../utils/formatters'

export type Verdict = 'Likely Authentic' | 'Likely Manipulated' | 'Inconclusive'

type ResultCardProps = {
  verdict: Verdict
  confidence: number // 0-1
  summary: string
  tags?: string[]
  timestamp?: string
}

const badgeStyles: Record<Verdict, string> = {
  'Likely Authentic': 'bg-emerald-50 text-emerald-700',
  'Likely Manipulated': 'bg-rose-50 text-rose-700',
  Inconclusive: 'bg-amber-50 text-amber-700',
}

const ResultCard: React.FC<ResultCardProps> = ({ verdict, confidence, summary, tags = [], timestamp }) => {
  const percent = Math.round(confidence * 100)
  return (
    <motion.div
      className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100"
      initial="hidden"
      animate="visible"
      variants={fadeUp()}
      whileHover={springHover}
      whileTap={tap}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeStyles[verdict]}`}>{verdict}</span>
          <span className="text-sm text-slate-500">Confidence: {percent}%</span>
        </div>
        {timestamp && <span className="text-xs text-slate-400">{formatDate(timestamp)}</span>}
      </div>
      <p className="mt-4 text-base text-slate-700">{summary}</p>
      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default ResultCard
