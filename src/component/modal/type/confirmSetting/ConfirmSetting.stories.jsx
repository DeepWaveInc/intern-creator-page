import React from 'react'
import ConfirmSetting from './ConfirmSetting'

export default {
  title: 'component/Modal/ConfirmSetting',
  component: ConfirmSetting
}

const Template = (args) => {
  return <ConfirmSetting {...args} isOpen={true} />
}

export const Default = Template.bind({})

Default.args = {}
