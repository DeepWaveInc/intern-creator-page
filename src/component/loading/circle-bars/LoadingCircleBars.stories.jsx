import React from 'react'
import CircleBars from './CircleBars'

export default {
  title: 'component/Loading/CircleBars',
  component: CircleBars
}

const Template = (args) => {
  return <CircleBars {...args} />
}

export const Default = Template.bind({})

Default.args = {}
