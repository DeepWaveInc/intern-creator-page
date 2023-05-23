import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import TagManager from 'react-gtm-module'
import { Provider } from 'react-redux'
import { store } from './_helpers'
import Routers from './routers'
import smoothscroll from 'smoothscroll-polyfill'
import CookieConsent from './component/cookie'
import CommitHash from './component/commitHash'
import Cookies from 'universal-cookie'
import 'regenerator-runtime/runtime.js'
import 'mutationobserver-polyfill'
import './i18n'

import { GTM_KEY } from './_constants'
const cookies = new Cookies()

cookies.set('service', 'hullaballoo')
smoothscroll.polyfill()

const tagManagerArgs = {
  gtmId: GTM_KEY
}

TagManager.initialize(tagManagerArgs)

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routers />
        <CookieConsent />
      </BrowserRouter>
      <CommitHash />
    </Provider>
  )
}

export default App
