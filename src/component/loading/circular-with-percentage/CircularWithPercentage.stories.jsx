import React from 'react'
import CircularWithPercentage from './CircularWithPercentage'

export default {
  title: 'component/Loading/CircularWithPercentage',
  component: CircularWithPercentage
}

const Template = (args) => {
  return <CircularWithPercentage {...args} />
}

export const Default = Template.bind({})

Default.args = {}
