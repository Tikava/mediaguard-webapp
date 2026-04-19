import React from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../components/layout/Container'
import HistoryTable from '../components/history/HistoryTable'
import DashboardStats from '../components/history/DashboardStats'
import { useHistory } from '../hooks/useHistory'
import { useDashboardStats } from '../hooks/useDashboardStats'
import { useToast } from '../contexts/ToastContext'
import { useTranslation } from 'react-i18next'

const HistoryPage: React.FC = () => {
  const { page, setPage, loading, error, rows, total, deleteRow } = useHistory()
  const { stats, loading: statsLoading } = useDashboardStats()
  const { t } = useTranslation()
  const { addToast } = useToast()
  const navigate = useNavigate()

  const handleDelete = async (id: string) => {
    try {
      await deleteRow(id)
      addToast(t('history.deleteSuccess'), 'success')
    } catch {
      addToast(t('history.deleteError'), 'error')
    }
  }

  return (
    <Container>
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold text-slate-900">{t('history.title')}</h1>
          <p className="text-slate-600">{t('history.subtitle')}</p>
        </div>

        <DashboardStats
          stats={stats}
          loading={statsLoading}
          labels={{
            total: t('stats.detections'),
            authentic: t('verdict.likelyAuthentic'),
            manipulated: t('verdict.likelyManipulated'),
            avgConfidence: t('stats.confidence'),
            ofRecent: t('stats.ofRecent'),
          }}
        />

        <HistoryTable
          rows={rows}
          loading={loading}
          error={error}
          page={page}
          total={total}
          onPageChange={setPage}
          onRowClick={(id) => navigate(`/result/${id}`)}
          onDelete={handleDelete}
          labels={{
            file: t('history.file'),
            input: t('history.input'),
            verdict: t('history.verdict'),
            confidence: t('history.confidence'),
            timestamp: t('history.timestamp'),
            empty: t('history.empty'),
            error: t('history.error'),
            page: t('history.page', { page, total: Math.max(1, Math.ceil(total / 10)) }),
            prev: t('buttons.prev'),
            next: t('buttons.next'),
            typeImage: t('mediaType.image'),
            typeVideo: t('mediaType.video'),
            typeAudio: t('mediaType.audio'),
            deleteLabel: t('history.delete'),
            confirmDelete: t('history.confirmDelete'),
            cancel: t('common.cancel'),
          }}
        />
      </div>
    </Container>
  )
}

export default HistoryPage
