import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp } from '../../utils/motion'
import { getMediaType } from '../../utils/validators'
import { useTranslation } from 'react-i18next'
import type { MediaTypeEnum } from '../../types/api'

interface MediaUploadCardProps {
  onFileSelect: (file: File | null) => void
  acceptedTypes?: string
  file?: File | null
  error?: string
}

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const UploadIcon: React.FC<{ dragging: boolean }> = ({ dragging }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className={dragging ? 'text-primary-500' : 'text-slate-400'} aria-hidden="true">
    <path d="M14 4v14M8 10l6-6 6 6M6 22h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const FilePreview: React.FC<{ file: File; previewUrl: string; mediaType: MediaTypeEnum }> = ({ file, previewUrl, mediaType }) => {
  if (mediaType === 'image') {
    return <img src={previewUrl} alt={file.name} className="h-20 w-20 shrink-0 rounded-lg object-cover ring-1 ring-slate-200" />
  }
  if (mediaType === 'video') {
    return <video src={previewUrl} className="h-20 w-20 shrink-0 rounded-lg object-cover ring-1 ring-slate-200" muted preload="metadata" />
  }
  // audio
  return (
    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-slate-100 ring-1 ring-slate-200">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-slate-400" aria-hidden="true">
        <path d="M10 20H6a2 2 0 01-2-2v-4a2 2 0 012-2h4l6-5v18l-6-5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M19 10a6 6 0 010 8M22 7a11 11 0 010 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </div>
  )
}

const MediaUploadCard: React.FC<MediaUploadCardProps> = ({
  onFileSelect,
  acceptedTypes = 'image/jpeg,image/png,image/webp,video/mp4,video/webm,video/quicktime,audio/mpeg,audio/wav,audio/ogg,audio/aac,audio/mp4',
  file,
  error,
}) => {
  const { t } = useTranslation()
  const inputRef = useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)

  const mediaType = file ? getMediaType(file) : null

  useEffect(() => {
    if (!file) { setPreviewUrl(null); return }
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  const openPicker = () => inputRef.current?.click()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFileSelect(e.target.files?.[0] ?? null)
    e.target.value = ''
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped) onFileSelect(dropped)
  }

  return (
    <motion.div
      className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100"
      initial="hidden"
      animate="visible"
      variants={fadeUp(0.05)}
    >
      <input
        ref={inputRef}
        type="file"
        accept={acceptedTypes}
        aria-label={t('input.uploadLabel')}
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="flex flex-col gap-4">
        <span className="text-sm font-medium text-slate-700">{t('input.uploadLabel')}</span>

        <AnimatePresence mode="wait">
          {file && previewUrl ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.18 }}
              className="relative flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3"
            >
              <div className="flex items-center gap-4">
                <FilePreview file={file} previewUrl={previewUrl} mediaType={mediaType!} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-800">{file.name}</p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {mediaType && t(`mediaType.${mediaType}`)} · {formatBytes(file.size)}
                  </p>
                  <button
                    type="button"
                    onClick={openPicker}
                    className="mt-2 text-xs font-medium text-primary-600 transition hover:text-primary-700"
                  >
                    {t('input.changeFile')}
                  </button>
                </div>
                <button
                  type="button"
                  aria-label={t('input.removeFile')}
                  onClick={(e) => { e.stopPropagation(); onFileSelect(null) }}
                  className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm ring-1 ring-slate-200 transition hover:bg-rose-50 hover:text-rose-500"
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {mediaType === 'audio' && (
                <audio src={previewUrl} controls className="h-9 w-full" />
              )}
            </motion.div>
          ) : (
            <motion.div
              key="dropzone"
              role="button"
              tabIndex={0}
              aria-label={t('input.dropHint')}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={openPicker}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openPicker()}
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              className={`flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed px-6 py-8 text-center text-sm transition ${
                error
                  ? 'border-rose-300 bg-rose-50/60'
                  : dragging
                  ? 'border-primary-400 bg-primary-50/60'
                  : 'border-slate-200 bg-slate-50/40 hover:border-primary-200 hover:bg-white'
              }`}
            >
              <UploadIcon dragging={dragging} />
              <div className="text-base font-semibold text-slate-800">{t('input.dropHint')}</div>
              <div className="text-xs text-slate-500">{t('input.acceptedMedia')} · {t('input.maxSizeMedia')}</div>
            </motion.div>
          )}
        </AnimatePresence>

        {error && <span className="text-xs text-rose-600">{error}</span>}
      </div>
    </motion.div>
  )
}

export default MediaUploadCard
