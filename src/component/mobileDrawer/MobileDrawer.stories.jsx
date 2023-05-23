import React from 'react'
import MobileDrawer from './MobileDrawer'
import Banner, { NoiseEraser } from '../../pages/Share/component/banner'

export default {
  title: 'component/MobileDrawer',
  component: MobileDrawer
}

const Template = () => {
  return (
    <MobileDrawer>
      <Banner>
        <NoiseEraser />
      </Banner>
    </MobileDrawer>
  )
}

export const Default = Template.bind({})

Default.args = {}
