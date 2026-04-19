import React from 'react'
import { useTranslation } from 'react-i18next'
import ConfidenceMeter from './ConfidenceMeter'
import { VERDICT_STYLES, VERDICT_I18N_KEY } from '../../constants/verdict'
import { formatDate } from '../../utils/formatters'
import type { DetectionResponse } from '../../types/api'

interface VerdictDisplayProps {
  data: DetectionResponse
  showTaskId?: boolean
}

const VerdictDisplay: React.FC<VerdictDisplayProps> = ({ data, showTaskId = false }) => {
  const { t } = useTranslation()
  const styles = VERDICT_STYLES[data.verdict]

  return (
    <div className="space-y-4">
      {/* Verdict banner */}
      <div className={`rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100 ${styles.border}`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold ${styles.badge}`}
              aria-hidden="true"
            >
              {styles.icon}
            </span>
            <div>
              <span className={`rounded-full px-3 py-1 text-sm font-semibold ${styles.badge}`}>
                {t(VERDICT_I18N_KEY[data.verdict] ?? data.verdict)}
              </span>
              <p className="mt-1 text-xs text-slate-400">
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
        <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
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

      {/* Details */}
      <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-4">
          {t('result.details')}
        </h2>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3">
          {showTaskId && (
            <div>
              <dt className="text-slate-400">{t('result.taskId')}</dt>
              <dd className="font-mono text-xs text-slate-600 truncate">{data.id}</dd>
            </div>
          )}
          <div>
            <dt className="text-slate-400">{t('result.mediaTypeLabel')}</dt>
            <dd className="capitalize text-slate-700">
              {data.mediaType ? t(`mediaType.${data.mediaType}`) : '—'}
            </dd>
          </div>
          <div>
            <dt className="text-slate-400">{t('result.model')}</dt>
            <dd className="text-slate-700">{data.modelVersion ?? '—'}</dd>
          </div>
          <div>
            <dt className="text-slate-400">{t('result.real')}</dt>
            <dd className="font-semibold text-emerald-600">
              {((data.realProbability ?? 0) * 100).toFixed(4)}%
            </dd>
          </div>
          <div>
            <dt className="text-slate-400">{t('result.fake')}</dt>
            <dd className="font-semibold text-rose-600">
              {((data.fakeProbability ?? 0) * 100).toFixed(4)}%
            </dd>
          </div>
          {showTaskId && (
            <div>
              <dt className="text-slate-400">{t('result.created')}</dt>
              <dd className="text-slate-700">{formatDate(data.createdAt)}</dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  )
}

export default VerdictDisplay
