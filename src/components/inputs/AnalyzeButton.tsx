import React from 'react'
import { motion } from 'framer-motion'
import { springHover, tap } from '../../utils/motion'
import { useTranslation } from 'react-i18next'

interface AnalyzeButtonProps {
  label?: string
  loading?: boolean
  disabled?: boolean
  onClick?: () => void
}

const AnalyzeButton: React.FC<AnalyzeButtonProps> = ({
  label,
  loading = false,
  disabled = false,
  onClick,
}) => {
  const { t } = useTranslation()
  const text = label ?? t('buttons.analyze')
  const loadingText = t('buttons.analyzing')

  return (
    <motion.button
      type="button"
      disabled={disabled || loading}
      onClick={onClick}
      whileHover={!disabled && !loading ? springHover : undefined}
      whileTap={!disabled && !loading ? tap : undefined}
      className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-white" aria-hidden />
      )}
      <span>{loading ? loadingText : text}</span>
    </motion.button>
  )
}

export default AnalyzeButton
