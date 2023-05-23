import React, { useMemo } from 'react'
import AfterUploaded from './AfterUploaded'
import { Container } from '../../../../component'

export default {
  title: 'component/Modal/Upload/AfterUploaded',
  component: AfterUploaded
}

const Template = (args) => {
  const data = useMemo(
    () => ({
      success_file: [
        {
          coin: 6,
          duration: 28,
          errorCode: null,
          file_id: 'c892059786a5a56f443e0c3d92f1d156',
          filename: 'dog-after.mp3',
          history_id: '83d8298ac8da'
        }
      ],
      total_coin: 6
    }),
    []
  )
  return (
    <Container
      isOpen={true}
      className="hullaballoo-modal__upload"
      contentNode={<AfterUploaded {...{ ...args, data }} isOpen={true} />}
    />
  )
}

export const Default = Template.bind({})

Default.args = {}
