import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export type NavItem = {
  label: string
  to: string
}

type HeaderProps = {
  logoText?: string
  navItems?: NavItem[]
  ctaLabel?: string
  onCtaClick?: () => void
}

const Header: React.FC<HeaderProps> = ({ logoText, navItems, ctaLabel, onCtaClick }) => {
  const { t } = useTranslation()
  const resolvedLogo = logoText ?? t('common.logo')
  const items =
    navItems ??
    [
      { label: t('nav.home'), to: '/' },
      { label: t('nav.history'), to: '/history' },
    ]
  const resolvedCta = ctaLabel ?? t('common.getStarted')

  return (
    <header className="sticky top-0 z-30 w-full bg-white/90 backdrop-blur shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
        <Link to="/" className="text-lg font-semibold text-slate-900">
          {resolvedLogo}
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-slate-600 md:flex">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="transition hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          onClick={onCtaClick}
          className="rounded-full bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
        >
          {resolvedCta}
        </button>
      </div>
    </header>
  )
}

export default Header
