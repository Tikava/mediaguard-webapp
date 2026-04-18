import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Container from '../components/layout/Container'
import ConfidenceMeter from '../components/results/ConfidenceMeter'
import { fetchResult } from '../services/detections'
import type { DetectionResponse } from '../types/api'
import { formatDate } from '../utils/formatters'
import { fadeUp } from '../utils/motion'
import { useTranslation } from 'react-i18next'

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

const ResultPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<DetectionResponse | null>(null)

  useEffect(() => {
    if (!id) return
    fetchResult(id)
      .then(setData)
      .catch((err) => setError(err instanceof Error ? err.message : t('result.fetchError')))
      .finally(() => setLoading(false))
  }, [id, t])

  const styles = data ? verdictStyles[data.verdict] : null

  return (
    <Container>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">{t('result.pageTitle')}</h1>
            <p className="text-slate-500 text-sm mt-1">{t('result.pageSubtitle')}</p>
          </div>
          <button
            type="button"
            className="text-sm font-medium text-primary-700 underline-offset-4 hover:underline"
            onClick={() => navigate('/')}
          >
            {t('common.newAnalysis')}
          </button>
        </div>

        {loading && (
          <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100 text-slate-500">
            {t('common.loading')}
          </div>
        )}

        {error && (
          <div className="rounded-2xl bg-rose-50 p-4 text-rose-700 ring-1 ring-rose-100">{error}</div>
        )}

        {data && !loading && !error && styles && (
          <motion.div
            className="space-y-4"
            initial="hidden"
            animate="visible"
            variants={fadeUp()}
          >
            {/* Verdict banner */}
            <div className={`rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100 ${styles.border}`}>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className={`text-2xl font-bold rounded-full w-10 h-10 flex items-center justify-center ${styles.badge}`}>
                    {styles.icon}
                  </span>
                  <div>
                    <span className={`rounded-full px-3 py-1 text-sm font-semibold ${styles.badge}`}>
                      {t(verdictKey[data.verdict])}
                    </span>
                    <p className="text-xs text-slate-400 mt-1">
                      {t('result.analyzedAt', { date: formatDate(data.createdAt) })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-slate-900">
                    {Math.round(data.confidence * 100)}%
                  </p>
                  <p className="text-xs text-slate-500">{t('result.confidence')}</p>
                </div>
              </div>
            </div>

            {/* Probability breakdown */}
            <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100 space-y-4">
              <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                {t('result.probabilityBreakdown')}
              </h2>
              <ConfidenceMeter
                value={data.realProbability ?? 0}
                label={t('result.realProbability')}
                tone="success"
              />
              <ConfidenceMeter
                value={data.fakeProbability ?? 0}
                label={t('result.fakeProbability')}
                tone="danger"
              />
            </div>

            {/* Metadata */}
            <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100">
              <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-4">
                {t('result.details')}
              </h2>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3">
                <div>
                  <dt className="text-slate-400">{t('result.taskId')}</dt>
                  <dd className="font-mono text-xs text-slate-600 truncate">{data.id}</dd>
                </div>
                <div>
                  <dt className="text-slate-400">{t('result.mediaTypeLabel')}</dt>
                  <dd className="capitalize text-slate-700">{data.mediaType ? t(`mediaType.${data.mediaType}`) : '—'}</dd>
                </div>
                <div>
                  <dt className="text-slate-400">{t('result.model')}</dt>
                  <dd className="text-slate-700">{data.modelVersion ?? '—'}</dd>
                </div>
                <div>
                  <dt className="text-slate-400">{t('result.real')}</dt>
                  <dd className="text-emerald-600 font-semibold">
                    {((data.realProbability ?? 0) * 100).toFixed(4)}%
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-400">{t('result.fake')}</dt>
                  <dd className="text-rose-600 font-semibold">
                    {((data.fakeProbability ?? 0) * 100).toFixed(4)}%
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-400">{t('result.created')}</dt>
                  <dd className="text-slate-700">{formatDate(data.createdAt)}</dd>
                </div>
              </dl>
            </div>
          </motion.div>
        )}
      </div>
    </Container>
  )
}

export default ResultPage
