import React from 'react'
import Notify from './Notify'

export default {
  title: 'component/Notify',
  component: Notify
}

const Template = (args) => {
  return <Notify {...args} />
}

export const Default = Template.bind({})

Default.args = {
  message: '開始分析',
  type: 'success',
  closeable: true,
  autoHidePeriod: 0,
  isShow: true
}
