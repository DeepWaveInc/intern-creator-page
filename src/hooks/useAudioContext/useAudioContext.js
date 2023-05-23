import { useRef, useState, useCallback, useEffect } from 'react'
import useAnimationFrame from '../useAnimationFrame'
import { generateRandomString } from '../../_helpers'
import axios from 'axios'

const FAKE_DEFAULT_ID = 1

const useAudioContext = ({
  link,
  isMute = false,
  volume = 100,
  outerSetPlaying,
  isAnimationFrameOn = true,
  afterFetchDataCallback,
  fetchErrorCallback,
  immediately = false,
  id = FAKE_DEFAULT_ID,
  abortRef
}) => {
  const [isAudioContextInit, setAudioContextInit] = useState(false)
  const [isPlaying, setPlaying] = useState(false)
  const [error, setError] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [isLoaded, setLoaded] = useState(false)
  const [percentage, setPercentage] = useState(0)
  const audioContextRef = useRef(null)
  const sourceNodeRef = useRef(null)
  const streamNodeRef = useRef(null)
  const gainNodeRef = useRef(null)
  const bufferRef = useRef(null)
  const pausedAtRef = useRef(0)
  const startedAtRef = useRef(0)
  const audioInstance = useRef(null)

  useAnimationFrame(() => {
    const duration = sourceNodeRef.current?.buffer?.duration ?? 0
    const currentTime = sourceNodeRef.current?.buffer?.duration
      ? audioContextRef.current?.currentTime - startedAtRef?.current
      : 0

    if (currentTime && duration)
      setPercentage(Math.ceil((currentTime / duration) * 10000) / 100)
  }, isPlaying && isAnimationFrameOn)

  const fetchData = useCallback(async () => {
    return new Promise(async (resolve) => {
      setLoading(true)
      try {
        const { data } = await axios.get(link, {
          responseType: 'arraybuffer',
          ...(abortRef ? { signal: abortRef.current.signal } : {})
        })
        const audioBuffer = await audioContextRef.current?.decodeAudioData(data)
        bufferRef.current = audioBuffer
        setAudioContextInit(true)
        setLoading(false)
        setLoaded(true)
        resolve(audioBuffer)
        typeof afterFetchDataCallback === 'function' &&
          afterFetchDataCallback(audioBuffer)
      } catch (error) {
        if (!axios.isCancel(error)) {
          setLoading(false)
          setLoaded(false)
          setError(true)
          audioContextRef.current = null
          setAudioContextInit(false)
          typeof fetchErrorCallback === 'function' &&
            fetchErrorCallback(error?.status)
          console.error('Error with decoding audio data' + error)
        }
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setLoading, setError, setLoaded, link, abortRef?.current])

  const handleInit = useCallback(
    (callback) => {
      audioContextRef.current = new (window.AudioContext =
        window.AudioContext ||
        window.webkitAudioContext ||
        window.mozAudioContext ||
        window.msAudioContext)()
      sourceNodeRef.current = audioContextRef.current.createBufferSource()
      gainNodeRef.current = audioContextRef.current.createGain()
      streamNodeRef.current =
        audioContextRef.current.createMediaStreamDestination()
      if (!audioInstance.current) {
        const id = generateRandomString()
        audioInstance.current = new Audio()
        audioInstance.current.controls = false
        audioInstance.current.id = id
        document.body.appendChild(audioInstance.current)
      }
      setAudioContextInit(true)
      typeof callback === 'function' && callback()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isAudioContextInit]
  )

  const handlePlay = useCallback(
    (percentage = 0, isMute = false, seekPercentage) => {
      let goToPosition = seekPercentage ?? percentage
      if (percentage >= 100) {
        goToPosition = 0
        setPercentage(0)
      }

      if (audioContextRef.current && bufferRef.current) {
        audioContextRef.current?.state !== 'running' &&
          audioContextRef.current.resume()

        const duration = sourceNodeRef.current?.buffer?.duration || 0
        const updateAt = (duration * goToPosition) / 100
        const offsetAt = updateAt ? updateAt : pausedAtRef.current
        startedAtRef.current = audioContextRef.current?.currentTime - offsetAt
        pausedAtRef.current = 0

        setPlaying(true)
        typeof outerSetPlaying === 'function' && outerSetPlaying(true)

        sourceNodeRef.current.disconnect()
        sourceNodeRef.current = audioContextRef.current.createBufferSource()

        gainNodeRef.current.gain.value = isMute
          ? 0
          : (volume < 0 ? 0 : volume > 100 ? 100 : volume) / 100
        sourceNodeRef.current.connect(gainNodeRef.current)
        gainNodeRef.current.connect(audioContextRef.current.destination)

        sourceNodeRef.current.buffer = bufferRef.current
        sourceNodeRef.current.start(0, offsetAt)

        if (audioInstance.current) {
          audioInstance.current.srcObject = streamNodeRef.current.stream
          audioInstance.current.volume = isMute
            ? 0
            : (volume < 0 ? 0 : volume > 100 ? 100 : volume) / 100
          audioInstance.current.play()
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLoaded, handleInit, volume, outerSetPlaying, isMute]
  )

  const handlePause = useCallback(() => {
    audioContextRef.current?.state === 'running' &&
      audioContextRef.current.suspend()
    const elapsed =
      (audioContextRef.current?.currentTime || 0) - startedAtRef.current
    pausedAtRef.current = elapsed
    setPlaying(false)

    if (audioInstance.current) {
      audioInstance.current.pause()
    }

    typeof outerSetPlaying === 'function' &&
      outerSetPlaying((value) => (value === null ? null : false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outerSetPlaying, setPlaying, isAnimationFrameOn])

  const handleEnded = useCallback(() => {
    audioContextRef.current?.state === 'running' &&
      audioContextRef.current?.close()
    audioContextRef.current = null
    sourceNodeRef.current = null
    gainNodeRef.current = null
    pausedAtRef.current = 0
    startedAtRef.current = 0
    setLoaded(bufferRef.current ? true : false)
    setLoading(false)
    setAudioContextInit(false)
    setError(false)
    setPlaying(false)

    if (audioInstance.current) {
      document.body.removeChild(
        document.getElementById(audioInstance.current.id)
      )
      audioInstance.current.pause()
      audioInstance.current.srcObject = null
      audioInstance.current = null
    }

    if (isPlaying) {
      typeof outerSetPlaying === 'function' &&
        outerSetPlaying(bufferRef.current ? false : null)
    }
  }, [outerSetPlaying, isPlaying])

  const handleOnEnd = useCallback(() => {
    if (isPlaying && percentage >= 100) {
      handleEnded()
    }
  }, [percentage, handleEnded, isPlaying])

  const handleStop = useCallback(() => {
    handleEnded()
    setPercentage(0)
  }, [handleEnded, setPercentage])

  const handleSeek = useCallback(
    (percentage, isMute, seekPercentage) => {
      handlePlay(percentage, isMute, seekPercentage)
    },
    [handlePlay]
  )

  const handleMute = useCallback(() => {
    if (
      isLoaded &&
      bufferRef.current &&
      gainNodeRef.current &&
      sourceNodeRef.current &&
      audioContextRef.current
    ) {
      gainNodeRef.current.gain.value = isMute
        ? 0
        : (volume < 0 ? 0 : volume > 100 ? 100 : volume) / 100
      sourceNodeRef.current.connect(gainNodeRef.current)
      gainNodeRef.current.connect(audioContextRef.current.destination)
    }
  }, [isMute, volume, isLoaded])

  const handleImmediatelyInit = useCallback(() => {
    if (immediately) {
      setLoaded(false)
      handleInit()
    }
  }, [immediately, handleInit])

  useEffect(() => {
    handleImmediatelyInit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  useEffect(() => {
    handleOnEnd()
  }, [handleOnEnd])

  useEffect(() => {
    handleMute()
  }, [handleMute])

  useEffect(() => {
    if (isAudioContextInit) {
      !isLoaded && fetchData()
    }
  }, [isAudioContextInit, fetchData, isLoaded])

  return {
    error,
    isLoading,
    isAudioContextInit,
    isLoaded,
    handlePlay,
    handlePause,
    handleInit,
    handleStop,
    handleSeek,
    percentage,
    fetchData
  }
}

export default useAudioContext
