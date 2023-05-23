import { useCallback, useMemo, forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import { a, useSpring } from '@react-spring/web'
import RangeWithTwoInput from './component/rangeWithTwoInput'
import { useIsMobileLayout } from '../../../../hooks'
import {
  ERASER_VOICE_FILTER_CUSTOM_ID,
  ERASER_VOICE_FILTER_CUSTOM_LOCAL_STORAGE_KEY
} from '../../../../_constants'
import clsx from 'clsx'
import './Sliders.scss'

const TYPES = {
  NOISE: 'noise',
  DENOISE: 'denoise'
}

const Sliders = forwardRef(
  (
    {
      setNoiseVolume,
      setDenoiseVolume,
      setActiveFilter,
      denoiseVolume,
      height,
      noiseVolume,
      min,
      max,
      className,
      step,
      activeFilter
    },
    ref
  ) => {
    const { t } = useTranslation()
    const { isMobileLayout } = useIsMobileLayout()
    const handleOnChange = useCallback(
      (type, e) => {
        let values = []
        if (type === TYPES.DENOISE) {
          const noiseVolume = 100 - (e.target.value || 0)
          setDenoiseVolume(e.target.value || 0)
          setNoiseVolume(noiseVolume)
          values = [parseInt(e.target.value || 0), noiseVolume]
        } else {
          const denoiseVolume = 100 - (e.target.value || 0)
          setNoiseVolume(e.target.value || 0)
          setDenoiseVolume(denoiseVolume)
          values = [denoiseVolume, parseInt(e.target.value || 0)]
        }

        setActiveFilter({
          id: ERASER_VOICE_FILTER_CUSTOM_ID,
          values
        })
        localStorage.setItem(
          ERASER_VOICE_FILTER_CUSTOM_LOCAL_STORAGE_KEY,
          JSON.stringify(values)
        )
      },
      [setActiveFilter, setDenoiseVolume, setNoiseVolume]
    )

    const isSliderActive = useMemo(
      () => activeFilter.id === ERASER_VOICE_FILTER_CUSTOM_ID,
      [activeFilter]
    )

    const heightStyles = useSpring({
      from: { height: 0, opacity: 0, marginTop: isMobileLayout ? 20 : 36 },
      to: {
        height,
        opacity: height > 0 ? 1 : 0,
        marginTop:
          height > 0 ? (isMobileLayout ? 43 : 50) : isMobileLayout ? 24 : 36
      },
      config: {
        mass: 0.05,
        tension: 200,
        friction: 26
      }
    })

    return (
      <a.div
        style={{
          ...heightStyles
        }}
        className={clsx('eraser-voice-filter-player__sliders', className)}
      >
        <div ref={ref}>
          <RangeWithTwoInput
            {...{
              mainLabel: t('common.human_voice'),
              subLabel: t('common.background_noise'),
              mainValue: denoiseVolume,
              subValue: noiseVolume,
              min,
              max,
              step,
              subOnChange: (e) => {
                handleOnChange(TYPES.NOISE, e)
              },
              mainOnChange: (e) => {
                handleOnChange(TYPES.DENOISE, e)
              },
              disabled: !isSliderActive
            }}
          />
        </div>
      </a.div>
    )
  }
)

export default Sliders
