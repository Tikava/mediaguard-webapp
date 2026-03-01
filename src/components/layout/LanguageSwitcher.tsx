import React from 'react'
import { useTranslation } from 'react-i18next'

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation()
  const current = i18n.language || 'en'

  const handleChange = (lng: 'en' | 'ru') => {
    if (lng !== current) {
      void i18n.changeLanguage(lng)
    }
  }

  const buttonClass = (lng: string) =>
    `text-xs font-semibold ${
      current === lng ? 'text-primary-700' : 'text-slate-500'
    }`

  return (
    <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-1 text-slate-600 shadow-sm">
      <button type="button" onClick={() => handleChange('en')} className={buttonClass('en')}>
        {t('common.languageEnglish')}
      </button>
      <span className="text-slate-300">|</span>
      <button type="button" onClick={() => handleChange('ru')} className={buttonClass('ru')}>
        {t('common.languageRussian')}
      </button>
    </div>
  )
}

export default LanguageSwitcher
