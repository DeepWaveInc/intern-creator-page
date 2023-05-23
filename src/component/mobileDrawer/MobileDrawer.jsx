import React, { useRef, useState, useEffect, useCallback } from 'react'
import { useDrag } from '@use-gesture/react'
import { a, useSpring, config } from '@react-spring/web'
import clsx from 'clsx'
import './MobileDrawer.scss'

const MobileDrawer = ({ children, className }) => {
  const drawerRef = useRef(null)
  const handlerRef = useRef(null)
  const [containerHeight, setContainerHeight] = useState(
    drawerRef.current?.clientHeight || 0
  )

  const handleResize = () =>
    setContainerHeight(drawerRef.current?.clientHeight || 0)

  const [{ y }, api] = useSpring(() => ({ y: containerHeight }))

  const open = useCallback(
    ({ canceled }) => {
      api.start({
        y: 0,
        immediate: false,
        config: canceled ? config.wobbly : config.stiff
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [config]
  )

  const close = useCallback(
    (velocity = 0) => {
      api.start({
        y: containerHeight - 24,
        immediate: false,
        config: { ...config.stiff, velocity }
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [containerHeight, config]
  )

  const bind = useDrag(
    ({
      last,
      velocity: [, vy],
      direction: [, dy],
      movement: [, my],
      cancel,
      canceled
    }) => {
      if (my < -70) cancel()

      if (last) {
        my > containerHeight * 0.5 || (vy > 0.5 && dy > 0)
          ? close(vy)
          : open({ canceled })
      } else api.start({ y: my, immediate: false })
    },
    {
      from: () => [0, y.get()],
      filterTaps: true,
      bounds: { top: 0 },
      rubberband: true
    }
  )

  const handlePreventDefault = (e) => {
    e.preventDefault()
  }

  useEffect(() => {
    drawerRef.current?.addEventListener('touchmove', handlePreventDefault)
    handlerRef.current.addEventListener('click', handlePreventDefault)
    handlerRef.current.addEventListener('touchstart', handlePreventDefault)
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      drawerRef.current?.removeEventListener('touchmove', handlePreventDefault)
      handlerRef.current.removeEventListener('click', handlePreventDefault)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      handlerRef.current.removeEventListener('touchstart', handlePreventDefault)
    }
  }, [])

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <a.div
      className={clsx('hullaballoo-mobile-drawer', className)}
      ref={drawerRef}
      {...bind()}
      style={{
        y
      }}
    >
      <div className="hullaballoo-mobile-drawer__handler" ref={handlerRef} />
      {children}
    </a.div>
  )
}

export default MobileDrawer
