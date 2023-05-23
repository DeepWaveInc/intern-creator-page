import { useCallback, forwardRef, useMemo } from 'react'
import './Sliders.scss'
import { useTranslation } from 'react-i18next'
import { Range } from '../../../../../../../component/input'
// import { a, useSpring } from '@react-spring/web'
import {
  ERASER_VOICE_FILTER_CUSTOM_ID,
  ERASER_VOICE_FILTER_CUSTOM_LOCAL_STORAGE_KEY
} from '../../../../../../../_constants'

const MAX = 100
const MIN = 0
const STEP = 1
const TYPES = {
  NOISE: 'noise',
  DENOISE: 'denoise'
}

const Sliders = forwardRef(({ active, setActive, height }, ref) => {
  const { t } = useTranslation()
  const { values } = active

  const handleOnChange = useCallback(
    (type, e) => {
      let _values = []
      if (type === TYPES.DENOISE) {
        _values = [parseInt(e.target.value || 0), values[1]]
      } else {
        _values = [values[0], parseInt(e.target.value || 0)]
      }

      setActive({
        id: ERASER_VOICE_FILTER_CUSTOM_ID,
        values: _values
      })
      localStorage.setItem(
        ERASER_VOICE_FILTER_CUSTOM_LOCAL_STORAGE_KEY,
        JSON.stringify(_values)
      )
    },
    [values, setActive]
  )

  const isSliderActive = useMemo(
    () => active.id === ERASER_VOICE_FILTER_CUSTOM_ID,
    [active]
  )

  // const heightStyles = useSpring({
  //   from: { height: 0, opacity: 0, marginBottom: 0 },
  //   to: {
  //     height,
  //     opacity: height > 0 ? 1 : 0,
  //     marginBottom: height > 0 ? 10 : 0
  //   },
  //   config: {
  //     mass: 0.05,
  //     tension: 200,
  //     friction: 26
  //   }
  // })

  return (
    // <a.div
    <div
      className="landing-filter-demo-app__sliders"
      // style={{
      //   ...heightStyles
      // }}
    >
      <div ref={ref} className="landing-filter-demo-app__sliders__container">
        <div className="landing-filter-demo-app__sliders__slider">
          <span>{t('common.human.volume')}</span>
          <div className="landing-filter-demo-app__sliders__slider__container">
            <Range
              {...{
                value: values[0],
                max: MAX,
                min: MIN,
                step: STEP,
                disabled: !isSliderActive,
                className: 'landing-filter-demo-app__sliders__slider__range',
                onChange: (e) => handleOnChange(TYPES.DENOISE, e)
              }}
            />
            <span>{values[0]}</span>
          </div>
        </div>
        <div className="landing-filter-demo-app__sliders__slider">
          <span>{t('common.noise.volume')}</span>
          <div className="landing-filter-demo-app__sliders__slider__container">
            <Range
              {...{
                value: values[1],
                max: MAX,
                min: MIN,
                step: STEP,
                disabled: !isSliderActive,
                className: 'landing-filter-demo-app__sliders__slider__range',
                onChange: (e) => handleOnChange(TYPES.NOISE, e)
              }}
            />
            <span>{values[1]}</span>
          </div>
        </div>
      </div>
    </div>
  )
})

export default Sliders
