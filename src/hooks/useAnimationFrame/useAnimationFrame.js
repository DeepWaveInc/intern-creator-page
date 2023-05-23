import { useRef, useEffect, useCallback } from 'react'

const useAnimationFrame = (callback, isTrigger) => {
  const requestRef = useRef()
  const previousTimeRef = useRef()

  const animate = useCallback(
    (time) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current
        callback(deltaTime)
      }
      previousTimeRef.current = time
      requestRef.current = requestAnimationFrame(animate)
    },
    [callback]
  )

  const handleCancelAnimationFrame = useCallback(() => {
    if (requestRef.current) cancelAnimationFrame(requestRef.current)
  }, [])

  const handleStartAnimationFrame = useCallback(() => {
    requestRef.current = requestAnimationFrame(animate)
  }, [animate])

  useEffect(() => {
    isTrigger ? handleStartAnimationFrame() : handleCancelAnimationFrame()
    return handleCancelAnimationFrame
  }, [isTrigger, handleCancelAnimationFrame, handleStartAnimationFrame])

  return { handleCancelAnimationFrame, handleStartAnimationFrame }
}

export default useAnimationFrame
