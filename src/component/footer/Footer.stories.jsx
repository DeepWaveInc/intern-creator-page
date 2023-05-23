import React from 'react'
import Footer from './Footer'

export default {
  title: 'component/Footer',
  component: Footer
}

const Template = (args) => {
  return <Footer {...args} />
}

export const Default = Template.bind({})

Default.args = {}
