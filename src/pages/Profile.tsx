import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Container from '../components/layout/Container'
import { useAuth } from '../contexts/AuthContext'
import { formatDate } from '../utils/formatters'
import { fadeUp } from '../utils/motion'
import { useTranslation } from 'react-i18next'

function getInitials(username: string): string {
  return username.slice(0, 2).toUpperCase()
}

function getAvatarColor(username: string): string {
  const colors = [
    'bg-violet-500',
    'bg-blue-500',
    'bg-emerald-500',
    'bg-rose-500',
    'bg-amber-500',
    'bg-cyan-500',
    'bg-pink-500',
    'bg-indigo-500',
  ]
  let hash = 0
  for (let i = 0; i < username.length; i++) hash = username.charCodeAt(i) + ((hash << 5) - hash)
  return colors[Math.abs(hash) % colors.length]
}

const Field: React.FC<{ label: string; value: string | null | undefined }> = ({ label, value }) => (
  <div>
    <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</dt>
    <dd className="mt-1 text-sm text-slate-800">{value || '—'}</dd>
  </div>
)

const ProfilePage: React.FC = () => {
  const { user } = useAuth()
  const { t } = useTranslation()

  if (!user) return null

  const avatarColor = getAvatarColor(user.username)
  const fullName = [user.first_name, user.last_name].filter(Boolean).join(' ')

  return (
    <Container>
      <motion.div
        className="mx-auto max-w-2xl space-y-6 py-10"
        initial="hidden"
        animate="visible"
        variants={fadeUp()}
      >
        {/* Header card */}
        <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100">
          <div className="flex items-center gap-5">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.username}
                className="h-16 w-16 rounded-full object-cover ring-2 ring-slate-100"
              />
            ) : (
              <div
                className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-xl font-bold text-white ${avatarColor}`}
                aria-hidden="true"
              >
                {getInitials(user.username)}
              </div>
            )}
            <div className="min-w-0">
              <h1 className="text-xl font-semibold text-slate-900">
                {fullName || user.username}
              </h1>
              {fullName && (
                <p className="text-sm text-slate-500">@{user.username}</p>
              )}
              <p className="text-sm text-slate-500">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Details card */}
        <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
            {t('profile.details')}
          </h2>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm sm:grid-cols-3">
            <Field label={t('auth.username')} value={user.username} />
            <Field label={t('auth.email')} value={user.email} />
            <Field label={t('profile.firstName')} value={user.first_name} />
            <Field label={t('profile.lastName')} value={user.last_name} />
            <Field
              label={t('profile.joined')}
              value={user.date_joined ? formatDate(user.date_joined) : undefined}
            />
            {user.bio && (
              <div className="col-span-2 sm:col-span-3">
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  {t('profile.bio')}
                </dt>
                <dd className="mt-1 text-sm text-slate-800">{user.bio}</dd>
              </div>
            )}
          </dl>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            {t('common.newAnalysis')}
          </Link>
          <Link
            to="/history"
            className="flex items-center justify-center gap-2 rounded-xl bg-primary-600 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-primary-700"
          >
            {t('nav.history')}
          </Link>
        </div>
      </motion.div>
    </Container>
  )
}

export default ProfilePage
