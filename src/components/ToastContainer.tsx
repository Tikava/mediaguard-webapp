import React, { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useToast, type Toast } from '../contexts/ToastContext'

const ICONS: Record<Toast['type'], React.ReactNode> = {
  success: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  error: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 5v3.5M8 11h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  info: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 7.5v3.5M8 5h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
}

const STYLES: Record<Toast['type'], string> = {
  success: 'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200',
  error: 'bg-rose-50 text-rose-800 ring-1 ring-rose-200',
  info: 'bg-slate-50 text-slate-800 ring-1 ring-slate-200',
}

const ToastItem: React.FC<{ toast: Toast }> = ({ toast }) => {
  const { removeToast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => removeToast(toast.id), toast.duration)
    return () => clearTimeout(timer)
  }, [toast.id, toast.duration, removeToast])

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.95 }}
      transition={{ duration: 0.2, ease: [0.22, 0.12, 0.18, 1] }}
      role="alert"
      aria-live="polite"
      className={`flex w-80 items-start gap-3 rounded-xl px-4 py-3 shadow-lg ${STYLES[toast.type]}`}
    >
      <span className="mt-0.5 shrink-0">{ICONS[toast.type]}</span>
      <p className="flex-1 text-sm leading-snug">{toast.message}</p>
      <button
        type="button"
        aria-label="Dismiss"
        onClick={() => removeToast(toast.id)}
        className="shrink-0 rounded p-0.5 opacity-60 transition hover:opacity-100"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </motion.div>
  )
}

const ToastContainer: React.FC = () => {
  const { toasts } = useToast()

  return (
    <div
      aria-live="polite"
      aria-label="Notifications"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2"
    >
      <AnimatePresence initial={false}>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} />
        ))}
      </AnimatePresence>
    </div>
  )
}

export default ToastContainer
