import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../contexts/AuthContext'

export type NavItem = {
  label: string
  to: string
}

type HeaderProps = {
  logoText?: string
  navItems?: NavItem[]
}

const Header: React.FC<HeaderProps> = ({ logoText, navItems }) => {
  const { t } = useTranslation()
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const resolvedLogo = logoText ?? t('common.logo')
  const items: NavItem[] =
    navItems ??
    (isAuthenticated
      ? [
          { label: t('nav.home'), to: '/' },
          { label: t('nav.history'), to: '/history' },
        ]
      : [])

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-30 w-full bg-white/90 backdrop-blur shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
        <Link to="/" className="text-lg font-semibold text-slate-900">
          {resolvedLogo}
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-slate-600 md:flex">
          {items.map((item) => (
            <Link key={item.to} to={item.to} className="transition hover:text-slate-900">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Link
                to="/"
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
              >
                {t('nav.home')}
              </Link>
              <span className="hidden text-sm text-slate-600 md:block">{user?.username}</span>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
              >
                {t('auth.logoutAction')}
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-primary-700"
            >
              {t('common.getStarted')}
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
