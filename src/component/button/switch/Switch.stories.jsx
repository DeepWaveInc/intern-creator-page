import React from 'react'
import Switch from './Switch'

export default {
  title: 'component/Button/Switch',
  component: Switch
}

const Template = (args) => (
  <Switch {...args}>
    <span>Button</span>
  </Switch>
)

export const Default = Template.bind({})

Default.args = {
  onLabel: '',
  offLabel: '',
  isOn: false,
  disabled: false
}
