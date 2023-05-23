import React from 'react'
import Error from './Error'
import { Container } from '../../../../component'

export default {
  title: 'component/Modal/Upload/Error',
  component: Error
}

const Template = (args) => {
  return (
    <Container
      isOpen={true}
      className="hullaballoo-modal__upload"
      contentNode={<Error {...{ ...args }} isOpen={true} />}
    />
  )
}

export const Default = Template.bind({})

Default.args = {
  title: 'Upload < 5 files at a time',
  code: 500,
  onClick: () => {}
}
