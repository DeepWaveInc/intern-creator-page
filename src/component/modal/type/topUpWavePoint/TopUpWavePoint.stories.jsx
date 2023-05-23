import React from 'react'
import TopUpWavePoint from './TopUpWavePoint'

export default {
  title: 'component/Modal/TopUpWavePoint',
  component: TopUpWavePoint
}

const Template = (args) => {
  return <TopUpWavePoint {...args} isOpen={true} />
}

export const Default = Template.bind({})

Default.args = {}
