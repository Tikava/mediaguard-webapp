import React from 'react'
import { motion } from 'framer-motion'
import { springHover, tap, fadeUp } from '../../utils/motion'
import { useTranslation } from 'react-i18next'

interface ImageUploadCardProps {
  onFileSelect: (file: File | null) => void
  acceptedTypes?: string
  maxSizeMb?: number
  file?: File | null
  error?: string
}

const ImageUploadCard: React.FC<ImageUploadCardProps> = ({
  onFileSelect,
  acceptedTypes = 'image/png, image/jpeg',
  maxSizeMb = 10,
  file,
  error,
}) => {
  const { t } = useTranslation()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    onFileSelect(selected ?? null)
  }

  return (
    <motion.div
      className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100"
      initial="hidden"
      animate="visible"
      variants={fadeUp(0.05)}
      whileHover={springHover}
      whileTap={tap}
    >
      <div className="flex flex-col gap-4">
        <label className="text-sm font-medium text-slate-700">{t('input.uploadLabel')}</label>
        <label
          className={`flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed px-6 py-8 text-center text-sm transition ${
            error ? 'border-rose-300 bg-rose-50/60 text-rose-600' : 'border-slate-200 bg-slate-50/40 hover:border-primary-200 hover:bg-white'
          }`}
        >
          <input
            type="file"
            accept={acceptedTypes}
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="text-base font-semibold text-slate-800">
            {t('input.dropHint')}
          </div>
          <div className="text-xs text-slate-500">
            {t('input.accepted')}: {acceptedTypes} · {t('input.maxSize', { size: maxSizeMb })}
          </div>
          {file && (
            <span className="mt-2 rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700 shadow-sm">
              {file.name}
            </span>
          )}
        </label>
        {error && <span className="text-xs text-rose-600">{error}</span>}
      </div>
    </motion.div>
  )
}

export default ImageUploadCard
