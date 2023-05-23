import React from 'react'
import Uploading from './Uploading'
import { Container } from '../../../../component'

export default {
  title: 'component/Modal/Upload/Uploading',
  component: Uploading
}

const Template = (args) => {
  return (
    <Container
      isOpen={true}
      className="hullaballoo-modal__upload hullaballoo-modal__upload--loading"
      contentNode={<Uploading {...args} isOpen={true} />}
    />
  )
}

export const Default = Template.bind({})

Default.args = {
  isReady: false
}
