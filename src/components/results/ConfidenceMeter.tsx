import React from 'react'
import { motion } from 'framer-motion'
import { progressTransition } from '../../utils/motion'

interface ConfidenceMeterProps {
  value: number // 0-1
  label?: string
  tone?: 'success' | 'warning' | 'danger'
}

const toneClasses: Record<NonNullable<ConfidenceMeterProps['tone']>, string> = {
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  danger: 'bg-rose-500',
}

const ConfidenceMeter: React.FC<ConfidenceMeterProps> = ({ value, label = 'Confidence', tone = 'success' }) => {
  const clamped = Math.min(Math.max(value, 0), 1)
  const percent = Math.round(clamped * 100)
  return (
    <div className="rounded-xl bg-white p-4 shadow-card ring-1 ring-slate-100">
      <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
        <span>{label}</span>
        <span className="font-semibold text-slate-800">{percent}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-slate-100">
        <motion.div
          className={`h-2 rounded-full ${toneClasses[tone]}`}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={progressTransition}
        />
      </div>
    </div>
  )
}

export default ConfidenceMeter
