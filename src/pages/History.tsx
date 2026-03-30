import React from 'react'
import Container from '../components/layout/Container'
import HistoryTable from '../components/history/HistoryTable'
import { useHistory } from '../hooks/useHistory'
import { useTranslation } from 'react-i18next'

const HistoryPage: React.FC = () => {
  const { page, setPage, loading, error, rows, total } = useHistory()
  const { t } = useTranslation()

  return (
    <Container>
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold text-slate-900">{t('history.title')}</h1>
          <p className="text-slate-600">{t('history.subtitle')}</p>
        </div>

        <HistoryTable
          rows={rows}
          loading={loading}
          error={error}
          page={page}
          total={total}
          onPageChange={setPage}
          onRowClick={(id) => console.log('open result', id)}
          labels={{
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
          }}
        />
      </div>
    </Container>
  )
}

export default HistoryPage
