import React from 'react'
import { DatePicker } from 'antd'
import clsx from 'clsx'
import './Range.scss'

const { RangePicker } = DatePicker

const Range = ({ className, ...remaining }) => {
  return (
    <RangePicker
      {...{
        className: clsx('hullaballoo-datepicker__range', className),
        ...remaining
      }}
    />
  )
}

export default Range
