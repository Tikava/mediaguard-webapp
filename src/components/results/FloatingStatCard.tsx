import React from 'react'
import { motion } from 'framer-motion'
import { springHover, tap, fadeUp } from '../../utils/motion'

interface FloatingStatCardProps {
  label: string
  value: string
  delta?: string
  description?: string
}

const FloatingStatCard: React.FC<FloatingStatCardProps> = ({ label, value, delta, description }) => (
  <motion.div
    className="flex flex-col gap-2 rounded-2xl bg-white p-5 shadow-card ring-1 ring-slate-100"
    initial="hidden"
    animate="visible"
    variants={fadeUp(0.04)}
    whileHover={springHover}
    whileTap={tap}
  >
    <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</span>
    <div className="flex items-baseline gap-2">
      <span className="text-3xl font-semibold text-slate-900">{value}</span>
      {delta && <span className="rounded-full bg-primary-50 px-2 py-1 text-xs font-semibold text-primary-700">{delta}</span>}
    </div>
    {description && <p className="text-sm text-slate-500">{description}</p>}
  </motion.div>
)

export default FloatingStatCard
