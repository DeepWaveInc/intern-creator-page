import React from 'react'
import TrackDetailIntroFinish from './TrackDetailIntroFinish'

export default {
  title: 'component/Modal/TrackDetailIntroFinish',
  component: TrackDetailIntroFinish
}

const Template = (args) => {
  return <TrackDetailIntroFinish {...args} isOpen={true} />
}

export const Default = Template.bind({})

Default.args = {}
