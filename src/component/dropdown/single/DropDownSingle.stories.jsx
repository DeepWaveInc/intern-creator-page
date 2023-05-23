import React from 'react'
import Single from './Single'

export default {
  title: 'component/DropDown/Single',
  component: Single
}

const Template = (args) => {
  return <Single {...args} />
}

export const Default = Template.bind({})

Default.args = {
  options: [
    {
      value: 'all',
      label: 'All Status'
    },
    {
      value: 'finished',
      label: 'Completed'
    },
    {
      value: 'processing',
      label: 'Processing'
    },
    {
      value: 'failed',
      label: 'Failed'
    }
  ],
  defaultValue: 'all',
  disabled: false,
  showSearch: false
}
