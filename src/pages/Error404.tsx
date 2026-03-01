import React from 'react'
import { Link } from 'react-router-dom'
import Container from '../components/layout/Container'
import { useTranslation } from 'react-i18next'

const Error404: React.FC = () => {
  const { t } = useTranslation()
  return (
    <Container>
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <div className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
          404
        </div>
        <h1 className="text-4xl font-semibold text-slate-900">{t('notFound.title')}</h1>
        <p className="max-w-md text-slate-600">{t('notFound.body')}</p>
        <Link
          to="/"
          className="rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary-700"
        >
          {t('common.backHome')}
        </Link>
      </div>
    </Container>
  )
}

export default Error404
