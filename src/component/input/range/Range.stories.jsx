import React, { useState } from 'react'
import Range from './Range'

export default {
  title: 'component/Input/Range',
  component: Range
}

const Template = (args) => {
  const [value, setValue] = useState('20')
  return (
    <Range {...{ ...args, value, onChange: (e) => setValue(e.target.value) }} />
  )
}

export const Default = Template.bind({})

Default.args = {
  min: 0,
  max: 100,
  step: 10
}
