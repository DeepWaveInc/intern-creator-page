import React from 'react'
import NormalPlay from './NormalPlay'

export default {
  title: 'component/Button/NormalPlay',
  component: NormalPlay
}

const Template = (args) => (
  <NormalPlay {...args}>
    <span>Button</span>
  </NormalPlay>
)

export const Default = Template.bind({})

Default.args = {
  type: 'primary',
  status: 'pause'
}
