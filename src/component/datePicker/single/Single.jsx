import React from 'react'
import { DatePicker } from 'antd'
import clsx from 'clsx'
import './Single.scss'

const Single = ({ className, ...remaining }) => {
  return (
    <DatePicker
      {...{
        className: clsx('hullaballoo-datepicker__single', className),
        ...remaining
      }}
    />
  )
}

export default Single
