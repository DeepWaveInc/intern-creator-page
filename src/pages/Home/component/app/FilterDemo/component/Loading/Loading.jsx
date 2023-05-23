import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Dots } from '../../../../../../../component/loading'
import clsx from 'clsx'
import './Loading.scss'

const Loading = ({ isShow, className }) => {
  if (!isShow) return null
  return (
    <div className={clsx('landing-filter-demo-app__loading', className)}>
      <Dots />
    </div>
  )
}

Loading.propTypes = {
  isShow: PropTypes.bool,
  className: PropTypes.string
}

export default memo(Loading)
