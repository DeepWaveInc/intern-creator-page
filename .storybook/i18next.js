import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from '../src/assets/lang/en.json'
import tw from '../src/assets/lang/tw.json'

const supportedLngs = ['en', 'zh-TW']

const resources = {
  en: {
    translation: en
  },
  'zh-TW': {
    translation: tw
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'zh-TW',
    fallbackLng: 'zh-TW',
    keySeparator: false,
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  })

export { i18n }
