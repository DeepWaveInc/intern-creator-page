import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './assets/lang/en.json'
import tw from './assets/lang/tw.json'

const options = {
  order: [
    'cookie',
    'navigator',
    'htmlTag',
    'querystring',
    'localStorage',
    'sessionStorage',
    'path',
    'subdomain'
  ],
  lookupCookie: 'lang',
  caches: ['cookie'],
  excludeCacheFor: ['cimode'],
  htmlTag: document.documentElement
}

const resources = {
  'zh-TW': {
    translation: tw
  },
  'en-US': {
    translation: en
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: (code) => {
      if (!code || code === 'en-US' || code === 'en') return 'en-US'
      if (code === 'zh-TW' || code === 'zh') return 'zh-TW'
      if (code.startsWith('zh-')) return 'zh-TW'
      if (code.startsWith('en-')) return 'en-US'
      return 'en-US'
    },
    detection: options,
    debug: false,
    keySeparator: false,
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  })

export default i18n
