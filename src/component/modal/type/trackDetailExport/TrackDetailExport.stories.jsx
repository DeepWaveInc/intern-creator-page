import React from 'react'
import TrackDetailExport from './TrackDetailExport'

export default {
  title: 'component/Modal/TrackDetailExport',
  component: TrackDetailExport
}

const Template = (args) => {
  return <TrackDetailExport {...args} isOpen={true} />
}

export const Default = Template.bind({})

Default.args = {
  finished: false
}
