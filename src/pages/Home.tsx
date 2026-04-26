import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import HeroSection from '../components/hero/HeroSection'
import MediaUploadCard from '../components/inputs/MediaUploadCard'
import Container from '../components/layout/Container'
import VerdictDisplay from '../components/results/VerdictDisplay'
import { useDetection } from '../hooks/useDetection'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'
import { fadeUp } from '../utils/motion'
import { useTranslation } from 'react-i18next'

const Home: React.FC = () => {
  const { file, setFile, loading, error, result, submit, reset, acceptedTypes, pollingProgress } = useDetection()
  const { isAuthenticated } = useAuth()
  const { addToast } = useToast()
  const { t } = useTranslation()
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const titleId = 'login-prompt-title'

  const closePrompt = () => setShowLoginPrompt(false)

  const handleSubmit = () => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true)
      return
    }
    submit().catch(() => addToast(t('toast.analysisError'), 'error'))
  }

  useEffect(() => {
    if (!showLoginPrompt) return
    const el = dialogRef.current
    if (!el) return

    const focusable = el.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    )
    focusable[0]?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closePrompt()
        return
      }
      if (e.key === 'Tab' && focusable.length > 0) {
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [showLoginPrompt])

  if (result) {
    return (
      <Container>
        <motion.div
          className="mx-auto max-w-2xl space-y-4 py-10"
          initial="hidden"
          animate="visible"
          variants={fadeUp()}
        >
          <VerdictDisplay data={result} />
          <button
            type="button"
            onClick={reset}
            className="w-full rounded-xl border border-slate-200 bg-white py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:border-slate-300"
          >
            {t('result.analyzeAnother')}
          </button>
        </motion.div>
      </Container>
    )
  }

  return (
    <div className="space-y-16">
      <HeroSection
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        helperText={t('hero.helper')}
        ctaLabel={loading ? (pollingProgress ?? t('buttons.analyzing')) : t('hero.cta')}
        onCta={handleSubmit}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-full max-w-3xl">
            <MediaUploadCard file={file} onFileSelect={setFile} acceptedTypes={acceptedTypes} error={error ?? undefined} />
          </div>
        </div>
      </HeroSection>

      {showLoginPrompt && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && closePrompt()}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="mx-4 w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl ring-1 ring-slate-100"
            initial="hidden"
            animate="visible"
            variants={fadeUp()}
          >
            <h2 id={titleId} className="text-xl font-semibold text-slate-900">
              {t('loginPrompt.title')}
            </h2>
            <p className="mt-2 text-sm text-slate-500">{t('loginPrompt.subtitle')}</p>
            <div className="mt-6 flex flex-col gap-3">
              <Link
                to="/login"
                className="rounded-xl bg-primary-600 px-4 py-2.5 text-center text-sm font-medium text-white transition hover:bg-primary-700"
              >
                {t('loginPrompt.signIn')}
              </Link>
              <Link
                to="/register"
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                {t('loginPrompt.createAccount')}
              </Link>
              <button
                type="button"
                onClick={closePrompt}
                className="text-sm text-slate-400 hover:text-slate-600"
              >
                {t('common.cancel')}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default Home
