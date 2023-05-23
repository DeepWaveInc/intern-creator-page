import React, { useState, useRef, useCallback, memo } from 'react'
import clsx from 'clsx'
import { useTransition, animated } from '@react-spring/web'
import { ReactComponent as Arrow } from '../../../../assets/image/icons/arrow.svg'
import { useClickOutSide } from '../../../../hooks'

const Child = memo(({ styles, children: Children, setOpen }) =>
  Array.isArray(Children) ? (
    <animated.ul style={styles}>
      {Children.map((child) => (
        <li
          onClick={(e) => {
            e.stopPropagation()
            child.onClick && child.onClick()
            setOpen((value) => !value)
          }}
          key={child.id}
        >
          {child.name}
        </li>
      ))}
    </animated.ul>
  ) : (
    Children && <Children {...{ styles }} />
  )
)

const Parent = ({ name, onClick, prefixIcon, children }) => {
  const [isOpen, setOpen] = useState(false)
  const parentRef = useRef(null)
  const transitions = useTransition(isOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  })

  const handleOnClick = useCallback(() => {
    onClick && onClick()
    setOpen((value) => children && !value)
  }, [children, onClick])

  useClickOutSide(parentRef, setOpen)

  return (
    <li {...{ onClick: handleOnClick }} ref={parentRef}>
      {prefixIcon && prefixIcon}
      <span>{name}</span>
      {children && (
        <Arrow className={clsx('navigation-item__arrow', { active: isOpen })} />
      )}
      {children &&
        transitions(
          (styles, item) => item && <Child {...{ styles, children, setOpen }} />
        )}
    </li>
  )
}

const PCNav = ({ items }) => {
  return (
    <ul className="navigation--pc">
      {items.map((item) => (
        <Parent key={item.id} {...{ ...item }} />
      ))}
    </ul>
  )
}

export default PCNav
