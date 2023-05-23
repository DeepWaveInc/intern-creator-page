import React, { useCallback, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import './Range.scss'

const Range = ({ className, value, onChange, max, min, step, disabled }) => {
  const inputRef = useRef(null)

  const handleModifyBackgroundSize = useCallback(() => {
    inputRef.current.style.backgroundSize =
      ((value - min) * 100) / (max - min) + '% 100%'
  }, [value, min, max])

  useEffect(() => {
    handleModifyBackgroundSize()
  }, [handleModifyBackgroundSize])

  return (
    <div
      className={clsx('hullaballoo-range', className, {
        disabled
      })}
    >
      <input
        type="range"
        {...{ value, onChange, max, min, step, ref: inputRef }}
      />
    </div>
  )
}

Range.prototype = {
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  step: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default Range
