import React from 'react'
import { motion } from 'framer-motion'
import { springHover, tap, fadeUp } from '../../utils/motion'
import { useTranslation } from 'react-i18next'

interface TextInputCardProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  helperText?: string
  error?: string
}

const TextInputCard: React.FC<TextInputCardProps> = ({ value, onChange, placeholder, helperText, error }) => {
  const { t } = useTranslation()
  const resolvedPlaceholder = placeholder ?? t('input.textPlaceholder')
  const resolvedHelper = helperText ?? t('input.textHelper')

  return (
    <motion.div
      className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100"
      initial="hidden"
      animate="visible"
      variants={fadeUp(0.05)}
      whileHover={springHover}
      whileTap={tap}
    >
      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium text-slate-700">{t('input.textLabel')}</label>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={resolvedPlaceholder}
          rows={5}
          className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition focus:border-primary-300 focus:ring-2 focus:ring-primary-100 ${
            error ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-100' : 'border-slate-200'
          }`}
        />
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>{resolvedHelper}</span>
          {error && <span className="text-rose-600">{error}</span>}
        </div>
      </div>
    </motion.div>
  )
}

export default TextInputCard
