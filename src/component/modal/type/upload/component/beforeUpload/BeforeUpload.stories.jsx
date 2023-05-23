import React from 'react'
import BeforeUpload from './BeforeUpload'
import { Container } from '../../../../component'

export default {
  title: 'component/Modal/Upload/BeforeUpload',
  component: BeforeUpload
}

const Template = (args) => {
  return (
    <Container
      isOpen={true}
      className="hullaballoo-modal__upload"
      contentNode={<BeforeUpload {...args} isOpen={true} />}
    />
  )
}

export const Default = Template.bind({})

Default.args = {}
