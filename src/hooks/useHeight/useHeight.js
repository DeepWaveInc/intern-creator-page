import { useState, useRef, useLayoutEffect } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

export default function useHeight({ on, defaultHeight = 0, reset = false }) {
  const ref = useRef()
  const [height, set] = useState(defaultHeight)
  const heightRef = useRef(height)
  const [ro] = useState(
    () =>
      new ResizeObserver((packet) => {
        if (ref.current && heightRef.current !== ref.current.offsetHeight) {
          heightRef.current = ref.current.offsetHeight
          set(ref.current.offsetHeight)
        }
      })
  )
  useLayoutEffect(() => {
    if (on && ref.current) {
      set(ref.current.offsetHeight)
      ro.observe(ref.current, {})
    }

    if (reset) {
      !on && ref.current && set(defaultHeight)
    }

    return () => ro.disconnect()
  }, [on, ro, defaultHeight, reset])
  return [ref, height]
}
