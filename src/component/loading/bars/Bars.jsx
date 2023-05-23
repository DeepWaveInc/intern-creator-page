import React, { memo } from 'react'
import './Bars.scss'

const Bars = () => {
  return (
    <div className="hullaballoo-loading__bars">
      {Array.from({ length: 7 }).map((_, index) => (
        <div key={index} />
      ))}
    </div>
  )
}

export default memo(Bars)
