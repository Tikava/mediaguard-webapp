import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import HeroSection from '../components/hero/HeroSection'
import ImageUploadCard from '../components/inputs/ImageUploadCard'
import Container from '../components/layout/Container'
import ConfidenceMeter from '../components/results/ConfidenceMeter'
import { useDetection } from '../hooks/useDetection'
import { useAuth } from '../contexts/AuthContext'
import { formatDate } from '../utils/formatters'
import { fadeUp } from '../utils/motion'
import { useTranslation } from 'react-i18next'
import type { DetectionResponse } from '../types/api'

type Verdict = DetectionResponse['verdict']

const verdictStyles: Record<Verdict, { badge: string; border: string; icon: string }> = {
  'Likely Authentic': {
    badge: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
    border: 'border-l-4 border-emerald-500',
    icon: '✓',
  },
  'Likely Manipulated': {
    badge: 'bg-rose-50 text-rose-700 ring-1 ring-rose-200',
    border: 'border-l-4 border-rose-500',
    icon: '✗',
  },
  Inconclusive: {
    badge: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
    border: 'border-l-4 border-amber-400',
    icon: '?',
  },
}

const verdictKey: Record<Verdict, string> = {
  'Likely Authentic': 'verdict.likelyAuthentic',
  'Likely Manipulated': 'verdict.likelyManipulated',
  Inconclusive: 'verdict.inconclusive',
}

const Home: React.FC = () => {
  const { file, setFile, loading, error, result, submit, reset } = useDetection()
  const { isAuthenticated } = useAuth()
  const { t } = useTranslation()
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)

  const handleSubmit = () => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true)
      return
    }
    submit()
  }

  if (result) {
    const styles = verdictStyles[result.verdict]
    return (
      <Container>
        <motion.div
          className="mx-auto max-w-2xl space-y-4 py-10"
          initial="hidden"
          animate="visible"
          variants={fadeUp()}
        >
          {/* Verdict banner */}
          <div className={`rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100 ${styles.border}`}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className={`flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold ${styles.badge}`}>
                  {styles.icon}
                </span>
                <div>
                  <span className={`rounded-full px-3 py-1 text-sm font-semibold ${styles.badge}`}>
                    {t(verdictKey[result.verdict])}
                  </span>
                  <p className="mt-1 text-xs text-slate-400">
                    {t('result.analyzedAt', { date: formatDate(result.createdAt) })}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-slate-900">
                  {Math.round(result.confidence * 100)}%
                </p>
                <p className="text-xs text-slate-500">{t('result.confidence')}</p>
              </div>
            </div>
          </div>

          {/* Probability breakdown */}
          <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100 space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {t('result.probabilityBreakdown')}
            </h2>
            <ConfidenceMeter
              value={result.realProbability ?? 0}
              label={t('result.realProbability')}
              tone="success"
            />
            <ConfidenceMeter
              value={result.fakeProbability ?? 0}
              label={t('result.fakeProbability')}
              tone="danger"
            />
          </div>

          {/* Details */}
          <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-4">
              {t('result.details')}
            </h2>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3">
              <div>
                <dt className="text-slate-400">{t('result.mediaTypeLabel')}</dt>
                <dd className="capitalize text-slate-700">{result.mediaType ? t(`mediaType.${result.mediaType}`) : '—'}</dd>
              </div>
              <div>
                <dt className="text-slate-400">{t('result.model')}</dt>
                <dd className="text-slate-700">{result.modelVersion ?? '—'}</dd>
              </div>
              <div>
                <dt className="text-slate-400">{t('result.real')}</dt>
                <dd className="font-semibold text-emerald-600">
                  {((result.realProbability ?? 0) * 100).toFixed(4)}%
                </dd>
              </div>
              <div>
                <dt className="text-slate-400">{t('result.fake')}</dt>
                <dd className="font-semibold text-rose-600">
                  {((result.fakeProbability ?? 0) * 100).toFixed(4)}%
                </dd>
              </div>
            </dl>
          </div>

          {/* Retry */}
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
        ctaLabel={loading ? t('buttons.analyzing') : t('hero.cta')}
        onCta={handleSubmit}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-full max-w-3xl">
            <ImageUploadCard file={file} onFileSelect={setFile} error={error ?? undefined} />
          </div>
        </div>
      </HeroSection>

      {showLoginPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <motion.div
            className="mx-4 w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl ring-1 ring-slate-100"
            initial="hidden"
            animate="visible"
            variants={fadeUp()}
          >
            <h2 className="text-xl font-semibold text-slate-900">{t('loginPrompt.title')}</h2>
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
                onClick={() => setShowLoginPrompt(false)}
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
