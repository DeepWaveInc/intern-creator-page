import React from 'react'
import Dots from './Dots'

export default {
  title: 'component/Loading/Dots',
  component: Dots
}

const Template = (args) => {
  return <Dots {...args} />
}

export const Default = Template.bind({})

Default.args = {}
