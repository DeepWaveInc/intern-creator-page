import React, { useRef, useCallback, memo } from 'react'
import clsx from 'clsx'
import { useClickOutSide } from '../../../../hooks'

const Child = memo(({ children }) => (
  <ul className={clsx('navigation--mobile__item')}>
    {children.map((child) => (
      <li
        onClick={(e) => {
          e.stopPropagation()
          child.onClick && child.onClick()
        }}
        key={child.id}
      >
        {child.name}
      </li>
    ))}
  </ul>
))

const Parent = ({ name, onClick, mobileProps, children }) => {
  const handleOnClick = useCallback(() => {
    typeof onClick === 'function' && onClick()
    mobileProps?.onClick && mobileProps.onClick()
  }, [onClick, mobileProps])

  return (
    <li {...{ onClick: handleOnClick }}>
      <div className={clsx('navigation-item__name')}>
        <span>{name}</span>
      </div>
      {children && <Child {...{ children }} />}
    </li>
  )
}

const MobileNav = ({ items, active, setActive, hamburgerRef }) => {
  const navRef = useRef(null)
  useClickOutSide([navRef, hamburgerRef], setActive)

  return (
    <ul className={clsx('navigation--mobile', { active })} ref={navRef}>
      {items.map((item) => (
        <Parent key={item.id} {...{ ...item }} />
      ))}
    </ul>
  )
}

export default MobileNav
