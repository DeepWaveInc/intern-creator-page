import React from 'react'
import Normal from './Normal'

export default {
  title: 'component/Input/Normal',
  component: Normal
}

const Template = (args) => {
  return <Normal {...{ ...args }} />
}

export const Default = Template.bind({})

Default.args = {
  className: '',
  placeholder: '輸入網址',
  disabled: true
}
