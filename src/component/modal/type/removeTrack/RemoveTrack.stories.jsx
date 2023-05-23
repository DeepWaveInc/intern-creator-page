import React from 'react'
import RemoveTrack from './RemoveTrack'

export default {
  title: 'component/Modal/RemoveTrack',
  component: RemoveTrack
}

const Template = (args) => {
  return <RemoveTrack {...args} isOpen={true} />
}

export const Default = Template.bind({})

Default.args = {}
