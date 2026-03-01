import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Container from '../components/layout/Container'
import ResultCard from '../components/results/ResultCard'
import ConfidenceMeter from '../components/results/ConfidenceMeter'
import { fetchResult } from '../services/detections'
import type { DetectionResponse } from '../types/api'
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
      .catch((err) => setError(err instanceof Error ? err.message : 'Unable to fetch result'))
      .finally(() => setLoading(false))
  }, [id])

  return (
    <Container>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">{t('result.pageTitle')}</h1>
            <p className="text-slate-600">{t('result.pageSubtitle')}</p>
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
          <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100">{t('common.loading')}</div>
        )}
        {error && <div className="rounded-2xl bg-rose-50 p-4 text-rose-700 ring-1 ring-rose-100">{error}</div>}
        {data && !loading && !error && (
          <div className="grid gap-4 md:grid-cols-[2fr,1fr]">
            <ResultCard
              verdict={data.verdict}
              confidence={data.confidence}
              summary={data.summary}
              tags={data.tags}
              timestamp={data.createdAt}
            />
            <ConfidenceMeter
              value={data.confidence}
              tone={data.confidence > 0.7 ? 'success' : 'warning'}
              label={t('result.confidenceLabel')}
            />
          </div>
        )}
      </div>
    </Container>
  )
}

export default ResultPage
