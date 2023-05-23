import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Navbar from '../../component/navbar'
import Footer from '../../component/footer'
import Head from './component/common/Head'
import Awards from './component/common/Awards'
import Switch from './component/common/Switch'
import Actions from './component/common/Actions'
import Pricing from './component/common/Pricing'
import Partner from './component/common/Partner'

// web component
import Description from './component/web/Description'
import VoiceDemo from './component/web/VoiceDemo'
import OperationalWeb from './component/web/Operational'
import FilterDemoWeb from './component/web/FilterDemo'
import Creator from './component/web/Creator'

// app component
import Steps from './component/app/Steps'
import OperationalApp from './component/app/Operational'
import FilterDemoApp from './component/app/FilterDemo'
import ProfessionalEffects from './component/app/ProfessionalEffects'
import Feedback from './component/app/Feedback'

import { SessionExpired } from '../../component/modal'

import './Home.scss'

export const DISPLAY_TYPES = {
  WEB: 'web',
  APP: 'app'
}

const HomePage = () => {
  const [searchParams] = useSearchParams()
  const urlSearchParamPlatform = searchParams.get('platform')
  const [type, setType] = useState(urlSearchParamPlatform ?? DISPLAY_TYPES.APP)

  return (
    <>
      <Navbar className={'dark-theme'} />
      <main className="home-page">
        <Head />
        <Awards />
        <Switch {...{ type, setType }} />
        {type === DISPLAY_TYPES.WEB && (
          <>
            <FilterDemoWeb />
            <Description />
            <OperationalWeb />
            <VoiceDemo />
            <Creator />
          </>
        )}
        {type === DISPLAY_TYPES.APP && (
          <>
            <FilterDemoApp />
            <Steps />
            <OperationalApp />
          </>
        )}
        <Actions {...{ type }} />
        {type === DISPLAY_TYPES.APP && (
          <>
            <ProfessionalEffects />
            <Feedback />
          </>
        )}
        <Pricing />
        <Partner />
      </main>
      <Footer />
      <SessionExpired />
    </>
  )
}

export default HomePage
