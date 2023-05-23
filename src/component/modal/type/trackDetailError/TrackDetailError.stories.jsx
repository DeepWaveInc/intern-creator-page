import React from 'react'
import TrackDetailError from './TrackDetailError'

export default {
  title: 'component/Modal/TrackDetailError',
  component: TrackDetailError
}

const Template = (args) => {
  return <TrackDetailError {...args} isOpen={true} />
}

export const Default = Template.bind({})

Default.args = {}
