import React from 'react'
import Bars from './Bars'

export default {
  title: 'component/Loading/Bars',
  component: Bars
}

const Template = (args) => {
  return <Bars {...args} />
}

export const Default = Template.bind({})

Default.args = {}
