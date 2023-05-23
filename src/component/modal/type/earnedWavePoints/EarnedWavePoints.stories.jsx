import React from 'react'
import EarnedWavePoints from './EarnedWavePoints'

export default {
  title: 'component/Modal/EarnedWavePoints',
  component: EarnedWavePoints
}

const Template = (args) => {
  return <EarnedWavePoints {...args} isOpen={true} />
}

export const Default = Template.bind({})

Default.args = {}
