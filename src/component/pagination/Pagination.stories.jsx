import React, { useState } from 'react'
import Pagination from './Pagination'

export default {
  title: 'component/Pagination',
  component: Pagination
}

const Template = (args) => {
  const [current, setCurrent] = useState(1)
  const total = 100

  return (
    <Pagination
      {...{ ...args, total, current, onChange: (e) => setCurrent(e) }}
    />
  )
}

export const Default = Template.bind({})

Default.args = {
  current: 1,
  onChange: () => {},
  total: 1,
  showQuickJumper: false,
  className: ''
}
