import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Dots } from '../../../loading'
import clsx from 'clsx'
import './Loading.scss'

const Loading = ({ isShow, className }) => {
  if (!isShow) return null
  return (
    <div className={clsx('eraser-voice-filter-player__loading', className)}>
      <Dots />
    </div>
  )
}

Loading.propTypes = {
  isShow: PropTypes.bool,
  className: PropTypes.string
}

export default memo(Loading)
