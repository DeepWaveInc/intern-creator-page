import React from 'react'
import FileSelected from './FileSelected'
import { Container } from '../../../../component'
import PropTypes from 'prop-types'

export default {
  title: 'component/Modal/Upload/FileSelected',
  component: FileSelected
}

const Template = (args) => {
  const files = Array.from(
    { length: 2 },
    (_, i) => new File([i + 1], `${i + 1}. example.mp3`)
  )

  return (
    <Container
      isOpen={true}
      className="hullaballoo-modal__upload"
      contentNode={
        <FileSelected
          {...{
            ...args,
            isOpen: true,
            files,
            handleOnClear: () => {},
            handleUpload: () => {}
          }}
        />
      }
    />
  )
}

export const Default = Template.bind({})

Default.args = {
  files: PropTypes.array.isRequired,
  handleOnClear: PropTypes.func.isRequired,
  handleUpload: PropTypes.func.isRequired
}
