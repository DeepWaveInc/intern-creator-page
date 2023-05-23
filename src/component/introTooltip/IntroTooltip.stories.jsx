import React, { useRef } from 'react'
import IntroTooltip from './IntroTooltip'
import { generateRandomString } from '../../_helpers'

export default {
  title: 'component/IntroTooltip',
  component: IntroTooltip
}

const Template = (args) => {
  const targetRef = useRef(null)
  return (
    <div style={{ height: '1600px' }}>
      <span
        ref={targetRef}
        style={{
          marginLeft: '700px',
          marginTop: '1000px',
          marginBottom: '400px',
          display: 'inline-block'
        }}
      >
        Target
      </span>
      <IntroTooltip {...{ ...args, targetInstance: targetRef }} />
    </div>
  )
}

export const Default = Template.bind({})

Default.args = {
  title:
    '得到你滿意的效果後，你可以選擇分享或是輸出，分享後朋友也可以聽到你降噪後的成果',
  actions: [
    {
      label: '跳過教學',
      key: generateRandomString(),
      onClick: () => {},
      type: 'blank'
    },
    {
      label: '下一步',
      key: generateRandomString(),
      onClick: () => {},
      type: 'primary'
    }
  ],
  placement: 'bottom'
}
