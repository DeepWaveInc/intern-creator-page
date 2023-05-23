import React, { useState } from 'react'
import { PLAY_BUTTON_TYPE } from '../../../_constants'
import Play from './Play'

export default {
  title: 'component/Button/Play',
  component: Play
}

const Template = (args) => {
  const [isPlaying, setPlaying] = useState(false)
  return (
    <Play
      {...{
        ...args,
        type: isPlaying ? PLAY_BUTTON_TYPE.PAUSE : PLAY_BUTTON_TYPE.PLAY,
        onClick: () => setPlaying((value) => !value)
      }}
    />
  )
}

export const Default = Template.bind({})

Default.args = {
  type: PLAY_BUTTON_TYPE.PLAY
}
