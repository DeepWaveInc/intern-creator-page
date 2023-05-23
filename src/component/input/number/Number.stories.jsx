import React, { useState } from 'react'
import Number from './Number'

export default {
  title: 'component/Input/Number',
  component: Number
}

const Template = (args) => {
  const [value, setValue] = useState('20')
  return (
    <Number
      {...{ ...args, value, onChange: (e) => setValue(e.target.value) }}
    />
  )
}

export const Default = Template.bind({})

Default.args = {
  className: 'center',
  placeholder: 'number'
}
