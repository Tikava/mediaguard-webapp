import React from 'react'
import HeroSection from '../components/hero/HeroSection'
import ImageUploadCard from '../components/inputs/ImageUploadCard'
import FloatingStatCard from '../components/results/FloatingStatCard'
import Container from '../components/layout/Container'
import { useDetection } from '../hooks/useDetection'
import { useTranslation } from 'react-i18next'

const Home: React.FC = () => {
  const { file, setFile, loading, error, result, submit } = useDetection()
  const { t } = useTranslation()

  return (
    <div className="space-y-16">
      <HeroSection
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        helperText={t('hero.helper')}
        ctaLabel={loading ? t('buttons.analyzing') : t('hero.cta')}
        onCta={submit}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-full max-w-3xl">
            <ImageUploadCard file={file} onFileSelect={setFile} error={error ?? undefined} />
          </div>
        </div>
      </HeroSection>

      <Container>
        <div className="grid gap-4 md:grid-cols-3">
          <FloatingStatCard label={t('stats.detections')} value="12.4k" delta="+4.2%" description={t('stats.last30d')} />
          <FloatingStatCard label={t('stats.confidence')} value="82%" delta="+2.1%" description={t('stats.acrossAll')} />
          <FloatingStatCard label={t('stats.latency')} value="1.4s" description={t('stats.p95')} />
        </div>
      </Container>

      {result && (
        <Container>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">{t('stats.latestResult')}</h2>
            <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-slate-800">
                  <span className="text-lg font-semibold">{result.verdict}</span>
                  <span className="text-sm text-slate-500">
                    {t('history.confidence')}: {Math.round(result.confidence * 100)}%
                  </span>
                </div>
                <button
                  type="button"
                  className="text-sm font-medium text-primary-700 underline-offset-4 hover:underline"
                >
                  {t('common.viewDetails')}
                </button>
              </div>
              <p className="mt-3 text-slate-600">{result.summary}</p>
            </div>
          </div>
        </Container>
      )}
    </div>
  )
}

export default Home
