import React, { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

type Lang = 'en' | 'ru' | 'kk'

const LANGUAGES: { code: Lang; native: string }[] = [
  { code: 'en', native: 'English' },
  { code: 'ru', native: 'Русский' },
  { code: 'kk', native: 'Қазақша' },
]

const GlobeIcon: React.FC = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
    <path d="M12 3c-2.5 3-4 5.7-4 9s1.5 6 4 9M12 3c2.5 3 4 5.7 4 9s-1.5 6-4 9M3 12h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
)

const ChevronIcon: React.FC<{ open: boolean }> = ({ open }) => (
  <svg
    width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"
    className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
  >
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const CheckIcon: React.FC = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const current = (i18n.language || 'en') as Lang
  const currentLang = LANGUAGES.find((l) => l.code === current) ?? LANGUAGES[0]

  const handleSelect = (code: Lang) => {
    if (code !== current) void i18n.changeLanguage(code)
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    const onOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onOutside)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onOutside)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open ? 'true' : 'false'}
        aria-haspopup="listbox"
        className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
      >
        <GlobeIcon />
        <span>{currentLang.native}</span>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Select language"
          className="absolute bottom-full left-0 mb-2 min-w-[140px] overflow-hidden rounded-xl border border-slate-100 bg-white shadow-lg"
        >
          {LANGUAGES.map((lang) => {
            const isActive = lang.code === current
            return (
              <button
                key={lang.code}
                type="button"
                role="option"
                aria-selected={isActive ? 'true' : 'false'}
                onClick={() => handleSelect(lang.code)}
                className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-sm transition hover:bg-slate-50 ${
                  isActive ? 'font-semibold text-slate-900' : 'text-slate-600'
                }`}
              >
                <span>{lang.native}</span>
                {isActive && (
                  <span className="text-primary-600"><CheckIcon /></span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher
