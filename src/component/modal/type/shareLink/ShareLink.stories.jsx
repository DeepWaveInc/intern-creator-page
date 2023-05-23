import React from 'react'
import ShareLink from './ShareLink'

export default {
  title: 'component/Modal/ShareLink',
  component: ShareLink
}

const Template = (args) => {
  return <ShareLink {...args} isOpen={true} />
}

export const Default = Template.bind({})

Default.args = {
  link: 'https://www.google.com'
}
