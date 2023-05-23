import '../src/css/all.scss'
import { i18n } from './i18next.js'
import ContextDecorator from './contextDecorator'

export const parameters = {
  i18n,
  locale: 'en',
  locales: {
    en: 'English',
    tw: 'Chinese'
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
}

export const decorators = [ContextDecorator]
