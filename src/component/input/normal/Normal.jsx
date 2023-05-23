import React from 'react'
import PropTypes from 'prop-types'
import './Normal.scss'
import clsx from 'clsx'

const Normal = ({ className, ...props }) => {
  return (
    <input
      {...{
        className: clsx('hullaballoo-input__normal', className),
        ...props
      }}
    />
  )
}

Normal.propTypes = {
  className: PropTypes.string
}

export default Normal
