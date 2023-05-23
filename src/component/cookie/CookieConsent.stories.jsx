import React from 'react'
import CookieConsent from './CookieConsent'
import '../../css/cookie.scss'

export default {
  title: 'component/CookieConsent',
  component: CookieConsent
}

const Template = (args) => {
  return <CookieConsent {...args} />
}

export const Default = Template.bind({})

Default.args = {}
