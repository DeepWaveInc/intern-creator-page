import { useEffect } from 'react'

const useClickOutSide = (refs, callback) => {
  useEffect(() => {
    const listener = (event) => {
      if (!Array.isArray(refs)) {
        if (!refs.current || refs.current.contains(event.target)) return
        callback()
      } else {
        let isPassing = true
        refs.forEach((ref) => {
          if (!ref.current || ref.current.contains(event.target))
            isPassing = false
        })
        isPassing && callback()
      }
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [refs, callback])
  return {}
}

export default useClickOutSide
