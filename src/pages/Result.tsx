import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Container from '../components/layout/Container'
import VerdictDisplay from '../components/results/VerdictDisplay'
import { fetchResult } from '../services/detections'
import type { DetectionResponse } from '../types/api'
import { fadeUp } from '../utils/motion'
import { useTranslation } from 'react-i18next'

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
          <div className="flex items-center gap-3 rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100 text-slate-500">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-primary-600" aria-hidden />
            {t('common.loading')}
          </div>
        )}

        {error && (
          <div className="rounded-2xl bg-rose-50 p-4 text-rose-700 ring-1 ring-rose-100">{error}</div>
        )}

        {data && !loading && !error && (
          <motion.div initial="hidden" animate="visible" variants={fadeUp()}>
            <VerdictDisplay data={data} showTaskId />
          </motion.div>
        )}
      </div>
    </Container>
  )
}

export default ResultPage
