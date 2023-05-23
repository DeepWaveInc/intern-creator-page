import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react'
import Button from '../button'
import ProgressBar from '../progressBar'
import ProgressWave from '../progressWave'
import { BUTTON_TYPE } from '../../asset/constant'
import useAudioContext from '../../hooks/useAudioContext'
import { sendGAEvent } from '../../../../_helpers'
import './Control.scss'

const Control = ({
  isDenoised,
  currentTrack,
  isPlaying,
  setPlaying,
  setPlayAreaLoading,
  handleClickSeekCallback,
  handleClickPlayCallback,
  isPlayAllTracks = false
}) => {
  const denoiseControllerRef = useRef(new AbortController())
  const noiseControllerRef = useRef(new AbortController())
  const { noise_link, denoise_link, noise_spectrum, denoise_spectrum, id } =
    currentTrack

  const [isCombinedSpectrum, setIsCombinedSpectrum] = useState(!isPlayAllTracks)
  const [bufferData, setBufferData] = useState({
    noise: noise_spectrum,
    denoise: denoise_spectrum
  })

  const fetchErrorCallback = (errorCode) => {
    sendGAEvent(
      'error',
      'pageView',
      `${errorCode ? errorCode : 'empty'} - ${window.location.hostname}`
    )
  }

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
    outerSetPlaying: setPlaying,
    abortRef: denoiseControllerRef,
    immediately: true,
    id,
    afterFetchDataCallback: (data) => {
      setIsCombinedSpectrum(false)
      setBufferData((bufferSet) => ({
        ...bufferSet,
        denoise: data.getChannelData(0)
      }))
    }
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
    isMute: isDenoised,
    isAnimationFrameOn: false,
    abortRef: noiseControllerRef,
    immediately: true,
    fetchErrorCallback,
    id,
    afterFetchDataCallback: (data) => {
      setIsCombinedSpectrum(false)
      setBufferData((bufferSet) => ({
        ...bufferSet,
        noise: data.getChannelData(0)
      }))
    }
  })

  const audioDataLoaded = useMemo(
    () => [noiseIsLoaded, denoiseIsLoaded].every((item) => item),
    [noiseIsLoaded, denoiseIsLoaded]
  )

  const handleCombinedSpectrum = useCallback(() => {
    if (audioDataLoaded && !isCombinedSpectrum) {
      setBufferData((bufferSet) => ({
        ...bufferSet,
        noise: bufferSet.noise.map(
          (item, index) => item + bufferSet.denoise[index]
        )
      }))
      setIsCombinedSpectrum(true)
    }
  }, [isCombinedSpectrum, audioDataLoaded])

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
      typeof handleClickSeekCallback === 'function' && handleClickSeekCallback()

      if (audioContextInit && audioDataLoaded) {
        handleDenoiseSeek(percentage, false, e * 100)
        handleNoiseSeek(percentage, isDenoised, e * 100)
      } else {
        handleDenoiseInit(() => {
          denoiseIsLoaded && handleDenoiseSeek(percentage, false, e * 100)
        })
        handleNoiseInit(() => {
          noiseIsLoaded && handleNoiseSeek(percentage, isDenoised, e * 100)
        })
      }
    },
    [
      handleClickSeekCallback,
      audioContextInit,
      audioDataLoaded,
      handleDenoiseSeek,
      percentage,
      handleNoiseSeek,
      isDenoised,
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
      typeof handleClickPlayCallback === 'function' && handleClickPlayCallback()
      if (audioContextInit && audioDataLoaded) {
        handleDenoisePlay(percentage)
        handleNoisePlay(percentage, isDenoised)
      } else {
        handleDenoiseInit(() => {
          denoiseIsLoaded && handleDenoisePlay(percentage)
        })
        handleNoiseInit(() => {
          noiseIsLoaded && handleNoisePlay(percentage, isDenoised)
        })
      }
    }
  }, [
    isPlaying,
    handleNoisePause,
    handleDenoisePause,
    handleClickPlayCallback,
    audioContextInit,
    audioDataLoaded,
    handleDenoisePlay,
    percentage,
    handleNoisePlay,
    isDenoised,
    handleDenoiseInit,
    handleNoiseInit,
    denoiseIsLoaded,
    noiseIsLoaded
  ])

  const handleSetPlayAreaLoading = useCallback(() => {
    setPlayAreaLoading(audioDataLoading)
  }, [setPlayAreaLoading, audioDataLoading])

  useEffect(() => {
    handleCombinedSpectrum()
  }, [handleCombinedSpectrum, id])

  useEffect(() => {
    handleSetPlayAreaLoading()
  }, [handleSetPlayAreaLoading, id])

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
  }, [id])

  return (
    <div className="control">
      <Button
        {...{
          type: isPlaying ? BUTTON_TYPE.PAUSE : BUTTON_TYPE.PLAY,
          onClick: handlePlay
        }}
      />
      {bufferData.noise.length <= 0 && bufferData.denoise.length <= 0 && (
        <ProgressBar
          {...{ percentage, handleManuallyUpdateTime: handleSeek }}
        />
      )}
      {bufferData.noise.length > 0 && bufferData.denoise.length > 0 && (
        <ProgressWave
          {...{
            isDenoised,
            id,
            percentage,
            bufferData,
            handleManuallyUpdateTime: handleSeek
          }}
        />
      )}
    </div>
  )
}

export default Control
