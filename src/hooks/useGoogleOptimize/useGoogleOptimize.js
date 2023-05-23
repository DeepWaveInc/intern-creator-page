import { useEffect, useState } from 'react'

const useGoogleOptimize = (experimentId) => {
  const [variant, setVariant] = useState(null)
  useEffect(() => {
    ;(async () => {
      if (window.dataLayer) {
        const OPTIMIZE_ACTIVATE_KEY = 'optimize.activate'
        const google_optimize_activate = window.dataLayer.find(
          (item) => item.event === OPTIMIZE_ACTIVATE_KEY
        )
        !google_optimize_activate &&
          (await window.dataLayer.push({ event: 'optimize.activate' }))
      }
      const intervalId = setInterval(() => {
        if (window.google_optimize !== undefined) {
          setVariant(window.google_optimize.get(experimentId))
          clearInterval(intervalId)
        }
      }, 100)
    })()
  })
  return variant
}

export default useGoogleOptimize
