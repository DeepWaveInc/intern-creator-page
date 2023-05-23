import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import './Normal.scss'

const Normal = forwardRef(
  ({ loading, outline, className, size, ...remaining }, ref) => {
    return (
      <button
        {...{
          ref,
          loading: loading?.toString(),
          outline: outline?.toString(),
          className: clsx(
            'hullaballoo-button__normal',
            size ? `hullaballoo-button__normal--${size}` : '',
            className
          ),
          ...remaining
        }}
      />
    )
  }
)

Normal.propTypes = {
  type: PropTypes.oneOf(['primary', 'secondary', 'blank', 'remove']),
  size: PropTypes.oneOf(['lg', 'md']),
  loading: PropTypes.bool,
  outline: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func
}

export default Normal
