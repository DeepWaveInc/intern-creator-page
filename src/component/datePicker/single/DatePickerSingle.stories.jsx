import React from 'react'
import Single from './Single'

export default {
  title: 'component/DatePicker/Single',
  component: Single
}

const Template = (args) => {
  return <Single {...args} />
}

export const Default = Template.bind({})

Default.args = {}
