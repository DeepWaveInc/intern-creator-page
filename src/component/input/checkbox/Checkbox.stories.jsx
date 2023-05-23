import React from 'react'
import Checkbox from './Checkbox'

export default {
  title: 'component/Input/Checkbox',
  component: Checkbox
}

const Template = (args) => {
  return <Checkbox {...args} />
}

export const Default = Template.bind({})

Default.args = {
  label: '保留分析檔案，不自動刪除',
  checked: false,
  disabled: false
}
