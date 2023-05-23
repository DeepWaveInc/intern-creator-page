import React from 'react'
import Wave from './Wave'

export default {
  title: 'component/Loading/Wave',
  component: Wave
}

const Template = (args) => {
  return <Wave {...args} />
}

export const Default = Template.bind({})

Default.args = {}
