import { useState, useLayoutEffect, useCallback } from 'react'
import { PHONE_LG_MEDIA } from '../../_constants'

const MOBILE_SIZE = PHONE_LG_MEDIA

export default function useIsMobileLayout(mobileSize = MOBILE_SIZE) {
  const [isMobileLayout, setMobileLayout] = useState(false)
  const [currentWidth, setCurrentWidth] = useState(0)

  const handleResize = useCallback(() => {
    const isMobileSize = window.screen.width <= mobileSize
    setMobileLayout(isMobileSize)
    setCurrentWidth(window.screen.width)
  }, [mobileSize])

  useLayoutEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

  return { isMobileLayout, currentWidth }
}
