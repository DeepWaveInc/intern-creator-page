import React, { useRef, useState, useCallback, useMemo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import {
  useAnimationFrame,
  useAudioContext,
  useIsMobileLayout
} from '../../../../../hooks'
import Background from './component/Background'
import { Normal as Button } from '../../../../../component/button'
import Video from './component/Video'
import Audio from './component/Audio'
import Phone from '../../common/Phone'
import Loading from './component/Loading'
import useAnimation from './useAnimation'
import Trans from '../../../../../component/trans'
import DenoiseSrc from '../../../../../assets/audio/landing/denoise.mp3'
import NoiseSrc from '../../../../../assets/audio/landing/noise.mp3'
import { userActions } from '../../../../../_actions'
import { APP_STORE_LINK } from '../../../../../_constants'
import './FilterDemo.scss'

const DEFAULT_ACTIVE_FILTER = {
  id: 0,
  values: [100, 100]
}

const FilterDemo = () => {
  const { t } = useTranslation()
  const { isMobileLayout } = useIsMobileLayout()
  const { sectionInViewRef, titleSlideIn, contentSlideIn, a } = useAnimation()
  const videoRef = useRef(null)
  const { modal_qr_code_shown } = userActions
  const dispatch = useDispatch()
  const [percentage, setPercentage] = useState(0)
  const [isPlaying, setPlaying] = useState(false)
  const [mediaLoaded, setMediaLoaded] = useState({
    video: false,
    noise: false,
    denoise: false
  })
  const isMediaAllLoaded = useMemo(() => {
    return Object.values(mediaLoaded).every((value) => value)
  }, [mediaLoaded])

  const [activeFilter, setActiveFilter] = useState({
    ...DEFAULT_ACTIVE_FILTER
  })

  const adjustVolume = useMemo(() => {
    const maxVolume = Math.max(activeFilter.values[0], activeFilter.values[1])
    return maxVolume > 0 ? 100 / maxVolume : 1
  }, [activeFilter])
  // const [sizingRef, contentHeight] = useHeight({
  //   on: activeFilter.id === ERASER_VOICE_FILTER_CUSTOM_ID,
  //   reset: true
  // })

  const denoiseControllerRef = useRef(new AbortController())
  const noiseControllerRef = useRef(new AbortController())

  const {
    isLoaded: noiseIsLoaded,
    isAudioContextInit: noiseIsAudioContextInit,
    handleInit: handleNoiseInit,
    handlePlay: handleNoisePlay,
    handlePause: handleNoisePause,
    handleSeek: handleNoiseSeek,
    handleStop: handleNoiseStop
  } = useAudioContext({
    link: NoiseSrc,
    isMute: false,
    volume: activeFilter.values[1] * adjustVolume,
    isAnimationFrameOn: false,
    immediately: true,
    abortRef: noiseControllerRef
  })

  const {
    isLoaded: denoiseIsLoaded,
    isAudioContextInit: denoiseIsAudioContextInit,
    handlePlay: handleDenoisePlay,
    handlePause: handleDenoisePause,
    handleSeek: handleDenoiseSeek,
    handleStop: handleDenoiseStop,
    handleInit: handleDenoiseInit
  } = useAudioContext({
    link: DenoiseSrc,
    isMute: false,
    volume: activeFilter.values[0] * adjustVolume,
    outerSetPlaying: setPlaying,
    immediately: true,
    abortRef: denoiseControllerRef
  })

  const audioDataLoaded = useMemo(() => {
    return [noiseIsLoaded, denoiseIsLoaded].every((item) => item)
  }, [noiseIsLoaded, denoiseIsLoaded])

  const handleAudioDataLoaded = useCallback(() => {
    setMediaLoaded((media) => ({
      ...media,
      noise: noiseIsLoaded,
      denoise: denoiseIsLoaded
    }))
  }, [denoiseIsLoaded, noiseIsLoaded])

  const audioContextInit = useMemo(
    () =>
      [denoiseIsAudioContextInit, noiseIsAudioContextInit].every(
        (item) => item
      ),
    [denoiseIsAudioContextInit, noiseIsAudioContextInit]
  )

  const handlePlay = useCallback(() => {
    if (!isMediaAllLoaded) return

    if (isPlaying) {
      handleNoisePause()
      handleDenoisePause()
      setPlaying(false)
    } else {
      if (audioContextInit && audioDataLoaded) {
        setPlaying(true)
        handleDenoisePlay(percentage)
        handleNoisePlay(percentage)
      } else {
        handleDenoiseInit(() => {
          denoiseIsLoaded && handleDenoisePlay(percentage)
        })
        handleNoiseInit(() => {
          noiseIsLoaded && handleNoisePlay(percentage)
        })
        setPlaying(true)
      }
    }
  }, [
    isMediaAllLoaded,
    isPlaying,
    handleNoisePause,
    handleDenoisePause,
    audioContextInit,
    audioDataLoaded,
    handleDenoisePlay,
    percentage,
    handleNoisePlay,
    handleDenoiseInit,
    handleNoiseInit,
    denoiseIsLoaded,
    noiseIsLoaded
  ])

  const handleSeeking = useCallback(
    (e) => {
      e.preventDefault()
      const { value } = e.target

      if (audioContextInit && audioDataLoaded) {
        setPercentage(value)
        videoRef.current.seekTo(value / 100)
        handleDenoiseSeek(value, false, value, activeFilter.values[0])
        handleNoiseSeek(value, false, value, activeFilter.values[1])
        setPlaying(true)
      } else {
        handleDenoiseInit(() => {
          denoiseIsLoaded && handleDenoisePlay()
          setPlaying(true)
        })
        handleNoiseInit(() => {
          noiseIsLoaded && handleNoisePlay()
          setPercentage(value)
          setPlaying(true)
        })
      }
    },
    [
      audioContextInit,
      audioDataLoaded,
      handleDenoiseSeek,
      activeFilter.values,
      handleNoiseSeek,
      handleDenoiseInit,
      handleNoiseInit,
      denoiseIsLoaded,
      handleDenoisePlay,
      noiseIsLoaded,
      handleNoisePlay
    ]
  )

  const handleUseItNow = useCallback(() => {
    if (isMobileLayout) {
      window.open(APP_STORE_LINK, '_blank', 'noopener,noreferrer')
    } else {
      modal_qr_code_shown(dispatch)
    }
  }, [dispatch, modal_qr_code_shown, isMobileLayout])

  useAnimationFrame(() => {
    const duration = videoRef.current?.getDuration() ?? 0
    const currentTime = videoRef.current?.getCurrentTime() ?? 0

    if (currentTime && duration)
      setPercentage(Math.ceil((currentTime / duration) * 10000) / 100)
  }, isPlaying)

  useEffect(() => {
    handleAudioDataLoaded()
  }, [handleAudioDataLoaded])

  useEffect(() => {
    let denoiseControllerRefCurrent = denoiseControllerRef.current
    let noiseControllerRefCurrent = noiseControllerRef.current

    return () => {
      handleNoiseStop()
      handleDenoiseStop()
      denoiseControllerRefCurrent.abort()
      noiseControllerRefCurrent.abort()
      denoiseControllerRef.current = new AbortController()
      noiseControllerRef.current = new AbortController()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="landing-filter-demo-app">
      <div
        className="landing-filter-demo-app__container"
        ref={sectionInViewRef}
      >
        <a.div style={titleSlideIn} className="landing-filter-demo-app__title">
          <h2>
            <Trans i18nKey="landing.filter_demo_app.title">
              <br />
            </Trans>
          </h2>
          <p>
            <Trans i18nKey="landing.filter_demo_app.desc">
              <br />
            </Trans>
          </p>
          <Button
            {...{
              type: 'primary',
              onClick: handleUseItNow
            }}
          >
            <span>{t('common.use_now.title')}</span>
          </Button>
        </a.div>
        <a.div
          style={contentSlideIn}
          className="landing-filter-demo-app__content"
        >
          <Phone>
            <Background />
            <Video
              {...{
                videoRef,
                onClick: handlePlay,
                percentage,
                handleSeeking,
                isPlaying,
                setPlaying,
                handleNoiseStop,
                handleDenoiseStop,
                denoiseControllerRef,
                noiseControllerRef,
                setMediaLoaded
              }}
            />
          </Phone>
          <Audio
            {...{
              activeFilter,
              setActiveFilter,
              loading: !isMediaAllLoaded
            }}
          />
          <Loading {...{ isShow: !isMediaAllLoaded }} />
        </a.div>
        <Button
          {...{
            type: 'primary',
            onClick: handleUseItNow,
            className: 'landing-filter-demo-app__action'
          }}
        >
          <span>{t('common.use_now.title')}</span>
        </Button>
      </div>
    </section>
  )
}

export default FilterDemo
