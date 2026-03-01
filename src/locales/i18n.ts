import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en.json'
import ru from './ru.json'

const STORAGE_KEY = 'lang'
const stored = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
const fallbackLng = 'en'
const lng = stored || fallbackLng

void i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru },
    },
    lng,
    fallbackLng,
    interpolation: {
      escapeValue: false,
    },
    returnNull: false,
  })

i18n.on('languageChanged', (language) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, language)
  }
})

export default i18n
