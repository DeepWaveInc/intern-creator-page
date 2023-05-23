import React from 'react'
import SessionExpired from './SessionExpired'

export default {
  title: 'component/Modal/SessionExpired',
  component: SessionExpired
}

const Template = (args) => {
  return <SessionExpired {...args} isOpen={true} />
}

export const Default = Template.bind({})

Default.args = {}
