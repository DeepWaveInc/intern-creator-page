import React from 'react'
import Range from './Range'

export default {
  title: 'component/DatePicker/Range',
  component: Range
}

const Template = (args) => {
  return <Range {...args} />
}

export const Default = Template.bind({})

Default.args = {}
