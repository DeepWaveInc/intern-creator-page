import React, { forwardRef } from 'react'
import clsx from 'clsx'
import './Hamburger.scss'

const Hamburger = forwardRef(({ active, ...reset }, ref) => (
  <div ref={ref} className={clsx('hamburger', { active })} {...{ ...reset }}>
    <div className="hamburger--inner">
      <div className="hamburger--inner__container" />
    </div>
  </div>
))

export default Hamburger
