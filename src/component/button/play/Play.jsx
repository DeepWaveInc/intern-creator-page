import React, { forwardRef, memo } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { PLAY_BUTTON_TYPE } from '../../../_constants'
import './Play.scss'

const Play = forwardRef(
  ({ type = PLAY_BUTTON_TYPE.PLAY, onClick, className }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx('hullaballoo-button__play', className)}
        type={type}
        onClick={onClick}
      />
    )
  }
)

Play.propTypes = {
  type: PropTypes.oneOf([PLAY_BUTTON_TYPE.PLAY, PLAY_BUTTON_TYPE.PAUSE])
    .isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string
}

export default memo(Play)
