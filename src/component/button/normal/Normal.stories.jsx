import React from 'react'
import Normal from './Normal'

export default {
  title: 'component/Button/Normal',
  component: Normal
}

const Template = (args) => (
  <Normal {...args}>
    <span>Button</span>
  </Normal>
)

export const Default = Template.bind({})

Default.args = {
  type: 'primary'
}
