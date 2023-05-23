import React from 'react'
import Navbar from './Navbar'

export default {
  title: 'component/Navbar',
  component: Navbar
}

const Template = (args) => {
  return <Navbar {...args} />
}

export const Default = Template.bind({})

Default.args = {
  className: 'dark-theme'
}
