import React, { memo } from 'react'
import { ReactComponent as CircleBarsIcon } from '../../../assets/image/icons/loading-circle-bars.svg'
import './CircleBars.scss'
import clsx from 'clsx'

const CircleBars = ({ className }) => {
  return (
    <div className={clsx('hullaballoo-loading__circle-bars', className)}>
      <CircleBarsIcon />
    </div>
  )
}

export default memo(CircleBars)
