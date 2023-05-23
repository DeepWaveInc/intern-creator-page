import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import './Number.scss'

const Number = ({
  value,
  onChange,
  max = 100,
  min = 1,
  step,
  className,
  disabled,
  ...remaining
}) => {
  return (
    <input
      {...{
        type: 'number',
        className: clsx('hullaballoo-input__number', className),
        value,
        max,
        min,
        onChange,
        disabled,
        ...remaining
      }}
    />
  )
}

Number.prototype = {
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  disabled: PropTypes.bool
}

export default Number
