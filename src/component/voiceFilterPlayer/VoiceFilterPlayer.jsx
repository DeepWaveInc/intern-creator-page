import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import clsx from 'clsx'
import Filters from './component/filters'
import Player from './component/player'
import Sliders from './component/sliders'
import Loading from './component/loading'
import useAudioContext from '../../hooks/useAudioContext'
import useHeight from '../../hooks/useHeight'
import { NormalPlay } from '../../component/button'
import {
  PLAY_BUTTON_TYPE,
  ERASER_VOICE_FILTER_ORIGINAL_ID,
  DEFAULT_ACTIVE_FILTER
} from '../../_constants'
import './VoiceFilterPlayer.scss'

const MIN = 0
const MAX = 100
const STEP = 1

const VoiceFilterPlayer = ({
  is_premium_feature_available,
  className,
  noise_link,
  denoise_link,
  outSetActiveFilter,
  outerActiveFilter,
  afterLoadedCallback,
  denoise_spectrum = [],
  noise_spectrum = [],
  duration,
  introInstance
}) => {
  const [activeFilter, setActiveFilter] = useState(
    outerActiveFilter || DEFAULT_ACTIVE_FILTER
  )

  const [sizingRef, contentHeight] = useHeight({
    on: activeFilter.id !== ERASER_VOICE_FILTER_ORIGINAL_ID,
    reset: true
  })
  const [denoiseVolume, setDenoiseVolume] = useState(activeFilter.values[0])
  const [noiseVolume, setNoiseVolume] = useState(activeFilter.values[1])
  const adjustVolume = useMemo(() => {
    const maxVolume = Math.max(denoiseVolume, noiseVolume)
    return maxVolume > 0 ? 100 / maxVolume : 1
  }, [denoiseVolume, noiseVolume])

  const [isPlaying, setPlaying] = useState(false)
  const [isPlayAreaLoading, setPlayAreaLoading] = useState(false)
  const denoiseControllerRef = useRef(new AbortController())
  const noiseControllerRef = useRef(new AbortController())

  const [bufferData, setBufferData] = useState({
    noise: noise_spectrum,
    denoise: denoise_spectrum
  })

  const {
    isLoaded: noiseIsLoaded,
    isLoading: noiseIsLoading,
    isAudioContextInit: noiseIsAudioContextInit,
    handleInit: handleNoiseInit,
    handlePlay: handleNoisePlay,
    handlePause: handleNoisePause,
    handleSeek: handleNoiseSeek,
    handleStop: handleNoiseStop
  } = useAudioContext({
    link: noise_link,
    isMute: false,
    volume: noiseVolume * adjustVolume,
    isAnimationFrameOn: false,
    immediately: true,
    abortRef: noiseControllerRef,
    afterFetchDataCallback:
      bufferData.noise.length <= 0
        ? (data) =>
            setBufferData((bufferSet) => ({
              ...bufferSet,
              noise: data.getChannelData(0)
            }))
        : null
  })

  const {
    isLoaded: denoiseIsLoaded,
    isLoading: denoiseIsLoading,
    isAudioContextInit: denoiseIsAudioContextInit,
    handlePlay: handleDenoisePlay,
    handlePause: handleDenoisePause,
    handleSeek: handleDenoiseSeek,
    handleStop: handleDenoiseStop,
    handleInit: handleDenoiseInit,
    percentage
  } = useAudioContext({
    link: denoise_link,
    isMute: false,
    volume: denoiseVolume * adjustVolume,
    outerSetPlaying: setPlaying,
    immediately: true,
    abortRef: denoiseControllerRef,
    afterFetchDataCallback: (data) =>
      bufferData.denoise.length <= 0
        ? setBufferData((bufferSet) => ({
            ...bufferSet,
            denoise: data.getChannelData(0)
          }))
        : null
  })

  const audioDataLoaded = useMemo(
    () => [noiseIsLoaded, denoiseIsLoaded].every((item) => item),
    [noiseIsLoaded, denoiseIsLoaded]
  )

  const audioContextInit = useMemo(
    () =>
      [denoiseIsAudioContextInit, noiseIsAudioContextInit].every(
        (item) => item
      ),
    [denoiseIsAudioContextInit, noiseIsAudioContextInit]
  )

  const audioDataLoading = useMemo(
    () => [noiseIsLoading, denoiseIsLoading].some((item) => item),
    [noiseIsLoading, denoiseIsLoading]
  )

  const handleSeek = useCallback(
    (e) => {
      if (audioContextInit && audioDataLoaded) {
        handleDenoiseSeek(percentage, false, e * 100, denoiseVolume)
        handleNoiseSeek(percentage, false, e * 100, noiseVolume)
      } else {
        handleDenoiseInit(() => {
          denoiseIsLoaded &&
            handleDenoiseSeek(percentage, false, e * 100, denoiseVolume)
        })
        handleNoiseInit(() => {
          noiseIsLoaded &&
            handleNoiseSeek(percentage, false, e * 100, noiseVolume)
        })
      }
    },
    [
      audioContextInit,
      audioDataLoaded,
      handleDenoiseSeek,
      percentage,
      denoiseVolume,
      handleNoiseSeek,
      noiseVolume,
      handleDenoiseInit,
      handleNoiseInit,
      denoiseIsLoaded,
      noiseIsLoaded
    ]
  )

  const handlePlay = useCallback(() => {
    if (isPlaying) {
      handleNoisePause()
      handleDenoisePause()
    } else {
      if (audioContextInit && audioDataLoaded) {
        handleDenoisePlay(percentage)
        handleNoisePlay(percentage)
      } else {
        handleDenoiseInit(() => {
          denoiseIsLoaded && handleDenoisePlay(percentage)
        })
        handleNoiseInit(() => {
          noiseIsLoaded && handleNoisePlay(percentage)
        })
      }
    }
  }, [
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

  const handleSetPlayAreaLoading = useCallback(() => {
    setPlayAreaLoading(audioDataLoading)
  }, [setPlayAreaLoading, audioDataLoading])

  const handleActiveFilterValues = useCallback(() => {
    setDenoiseVolume(activeFilter.values[0])
    setNoiseVolume(activeFilter.values[1])
  }, [activeFilter])

  const handleSetActiveFilter = useCallback(
    (props) => {
      setActiveFilter(props)
      typeof outSetActiveFilter === 'function' && outSetActiveFilter(props)
    },
    [outSetActiveFilter]
  )

  useEffect(() => {
    if (audioDataLoaded && typeof afterLoadedCallback === 'function') {
      afterLoadedCallback()
    }
  }, [afterLoadedCallback, audioDataLoaded])

  useEffect(() => {
    if (audioDataLoaded && isPlaying === null) {
      handleDenoisePlay(percentage)
      handleNoisePlay(percentage)
    }
  }, [
    audioDataLoaded,
    handleDenoisePlay,
    handleNoisePlay,
    isPlaying,
    percentage
  ])

  useEffect(() => {
    handleSetPlayAreaLoading()
  }, [handleSetPlayAreaLoading])

  useEffect(() => {
    handleActiveFilterValues()
  }, [handleActiveFilterValues])

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
    <div className={clsx('eraser-voice-filter-player', className)}>
      <Filters
        {...{
          active: activeFilter,
          onClick: handleSetActiveFilter,
          is_premium_feature_available,
          introInstance
        }}
      />
      <div className="eraser-voice-filter-player__container">
        <Player
          {...{
            ref: introInstance?.playBtnDesktopRef,
            type: isPlaying ? PLAY_BUTTON_TYPE.PAUSE : PLAY_BUTTON_TYPE.PLAY,
            onClick: handlePlay,
            bufferData,
            duration,
            percentage,
            handleSeek
          }}
        />
        <Sliders
          {...{
            ref: sizingRef,
            height: contentHeight,
            min: MIN,
            max: MAX,
            step: STEP,
            denoiseVolume,
            noiseVolume,
            setNoiseVolume,
            setDenoiseVolume,
            setActiveFilter: handleSetActiveFilter,
            activeFilter
          }}
        />
      </div>
      <NormalPlay
        {...{
          ref: introInstance?.playBtnMobileRef,
          type: 'primary',
          status: isPlaying ? PLAY_BUTTON_TYPE.PAUSE : PLAY_BUTTON_TYPE.PLAY,
          onClick: handlePlay,
          className: 'eraser-voice-filter-player__normal-play-btn'
        }}
      />
      <Loading {...{ isShow: isPlayAreaLoading }} />
    </div>
  )
}

export default VoiceFilterPlayer
