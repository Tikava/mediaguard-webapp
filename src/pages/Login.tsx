import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useTranslation } from 'react-i18next'
import Container from '../components/layout/Container'

const Login: React.FC = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await login(username, password)
      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : t('common.unknownError'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <div className="mx-auto max-w-sm space-y-6 py-16">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-slate-900">{t('auth.loginTitle')}</h1>
          <p className="text-sm text-slate-500">{t('auth.loginSubtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700 ring-1 ring-rose-100">
              {error}
            </p>
          )}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              {t('auth.username')}
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              {t('auth.password')}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-primary-600 px-4 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-primary-700 disabled:opacity-50"
          >
            {loading ? t('common.loading') : t('auth.loginAction')}
          </button>
        </form>

        <p className="text-center text-sm text-slate-600">
          {t('auth.noAccount')}{' '}
          <Link to="/register" className="font-medium text-primary-700 hover:underline">
            {t('auth.registerAction')}
          </Link>
        </p>
      </div>
    </Container>
  )
}

export default Login
