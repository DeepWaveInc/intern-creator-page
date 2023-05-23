import { useEffect, useState, useRef } from 'react'

function useInView({
  threshold = [0],
  rootMargin = '0px 0px 0px 0px',
  reset = false
}) {
  const itemRef = useRef(null)
  const [itemInView, setItemInView] = useState(false)

  useEffect(() => {
    const target = itemRef.current
    const observer = new IntersectionObserver(
      (entries) => {
        const isIntersecting = entries.some((item) => item.isIntersecting)
        if (isIntersecting) {
          setItemInView(true)
        }
      },
      { threshold, rootMargin }
    )

    target && observer.observe(target)

    return () => {
      target && observer.unobserve(target)
    }
  }, [threshold, rootMargin])

  useEffect(() => {
    reset && setItemInView(false)

    return () => {
      setItemInView(false)
    }
  }, [reset])

  return [itemRef, itemInView]
}

export default useInView
