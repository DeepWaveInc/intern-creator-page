import React from 'react'
import TrackDetailIntroBegin from './TrackDetailIntroBegin'

export default {
  title: 'component/Modal/TrackDetailIntroBegin',
  component: TrackDetailIntroBegin
}

const Template = (args) => {
  return <TrackDetailIntroBegin {...args} isOpen={true} />
}

export const Default = Template.bind({})

Default.args = {}
