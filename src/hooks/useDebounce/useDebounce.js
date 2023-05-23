import { useRef, useCallback } from 'react'

/** useDebounce
 *
 * @param {function} func - function that want to debounce
 * @param {number} milliseconds - debounce duration
 *
 * @returns {function} - debounced function
 */
export default function useDebounce(func, milliseconds) {
  const timeoutId = useRef(null)

  const timeoutCallback = useCallback(() => {
    clearTimeout(timeoutId.current)
    timeoutId.current = setTimeout(func, milliseconds)
  }, [func, milliseconds])

  return timeoutCallback
}
