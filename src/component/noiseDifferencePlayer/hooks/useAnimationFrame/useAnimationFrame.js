import { useRef, useEffect, useCallback } from 'react'

const useAnimationFrame = (callback) => {
  const requestRef = useRef()
  const previousTimeRef = useRef()

  const animate = (time) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current
      callback(deltaTime)
    }
    previousTimeRef.current = time
    requestRef.current = requestAnimationFrame(animate)
  }

  const handleCancelAnimationFrame = useCallback(() => {
    if (requestRef.current) cancelAnimationFrame(requestRef.current)
  }, [])

  const handleStartAnimationFrame = useCallback(() => {
    requestRef.current = requestAnimationFrame(animate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    handleStartAnimationFrame()
    return () => cancelAnimationFrame(requestRef.current)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { handleCancelAnimationFrame, handleStartAnimationFrame }
}

export default useAnimationFrame
