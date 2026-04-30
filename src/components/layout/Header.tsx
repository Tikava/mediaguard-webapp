import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
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
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const resolvedLogo = logoText ?? t('common.logo')
  const items: NavItem[] =
    navItems ??
    (isAuthenticated
      ? [
          { label: t('nav.home'), to: '/app' },
          { label: t('nav.history'), to: '/history' },
        ]
      : [])



  const closeMenu = () => setMenuOpen(false)

  const handleLogout = async () => {
    closeMenu()
    await logout()
    navigate('/login')
  }

  // Close menu on route change
  useEffect(() => {
    closeMenu()
  }, [location.pathname])

  // Close menu on Escape
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeMenu()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header className="sticky top-0 z-30 w-full bg-white/90 backdrop-blur shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
        <Link to="/" className="text-lg font-semibold text-slate-900">
          {resolvedLogo}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 text-sm text-slate-600 md:flex">
          {items.map((item) => (
            <Link key={item.to} to={item.to} className="transition hover:text-slate-900">
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop auth */}
        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className="text-sm text-slate-600 transition hover:text-slate-900"
              >
                {user?.username}
              </Link>
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

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100 md:hidden"
        >
          {menuOpen ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full border-t border-slate-100 bg-white shadow-lg md:hidden"
        >
          <nav className="flex flex-col divide-y divide-slate-100 px-4 py-2">
            {items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={closeMenu}
                className="py-3.5 text-sm font-medium text-slate-700 transition hover:text-slate-900"
              >
                {item.label}
              </Link>
            ))}
            <div className="py-3">
              {isAuthenticated ? (
                <div className="flex items-center justify-between">
                  <Link
                    to="/profile"
                    onClick={closeMenu}
                    className="text-sm font-medium text-slate-700 transition hover:text-slate-900"
                  >
                    {user?.username}
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    {t('auth.logoutAction')}
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="block rounded-xl bg-primary-600 px-4 py-2.5 text-center text-sm font-medium text-white transition hover:bg-primary-700"
                >
                  {t('common.getStarted')}
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
