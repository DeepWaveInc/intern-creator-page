import React from 'react'
import CustomError from './CustomError'

export default {
  title: 'component/Modal/CustomError',
  component: CustomError
}

const Template = (args) => {
  return <CustomError {...args} isOpen={true} />
}

export const Default = Template.bind({})

Default.args = {}
