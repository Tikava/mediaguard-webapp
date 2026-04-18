import React from 'react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'

export type FooterLink = {
  label: string
  href: string
}

type FooterProps = {
  links?: FooterLink[]
}

const Footer: React.FC<FooterProps> = ({ links = [] }) => {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-slate-200 bg-white/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="flex items-center gap-4 text-slate-600">
          <LanguageSwitcher />
          <span>{t('common.footerBrand', { year: new Date().getFullYear() })}</span>
        </div>
        {links.length > 0 && (
          <div className="flex flex-wrap items-center gap-4">
            {links.map((link) => (
              <a key={link.label} href={link.href} className="transition hover:text-slate-700">
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </footer>
  )
}

export default Footer
