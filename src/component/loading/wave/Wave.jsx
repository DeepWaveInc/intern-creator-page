import React, { memo } from 'react'
import { ReactComponent as Wave1 } from '../../../assets/image/icons/loadingWave/wave-1.svg'
import { ReactComponent as Wave2 } from '../../../assets/image/icons/loadingWave/wave-2.svg'
import { ReactComponent as Wave3 } from '../../../assets/image/icons/loadingWave/wave-3.svg'
import './Wave.scss'
import clsx from 'clsx'

const Wave = ({ className }) => (
  <div className={clsx('hullaballoo-loading__wave', className)}>
    <Wave1 className="hullaballoo-loading__wave_0" />
    <Wave2 className="hullaballoo-loading__wave_1" />
    <Wave3 className="hullaballoo-loading__wave_2" />
  </div>
)

export default memo(Wave)
