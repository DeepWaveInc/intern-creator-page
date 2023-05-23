import { useRef, useState, useCallback, useMemo, useEffect } from 'react'
import raf from 'raf' // requestAnimationFrame polyfill
import ReactHowler from 'react-howler'

// const FAKE_DEFAULT_ID = 1

const useHowler = ({
  link,
  isMute = false,
  volume: outerVolume = 100,
  outerSetPlaying,
  // isAnimationFrameOn = true,
  // afterFetchDataCallback,
  fetchErrorCallback
  // immediately = false,
  // id = FAKE_DEFAULT_ID,
  // abortRef
}) => {
  const playerRef = useRef(null)
  const [duration, setDuration] = useState(0)
  const [isLoaded, setLoaded] = useState(false)
  const [isPlaying, setPlaying] = useState(false)
  const [isError, setError] = useState(false)
  const [isSeeking, setSeeking] = useState(false)
  const [seekValue, setSeekValue] = useState(0)
  const requestAnimationFrameRefId = useRef(null)

  const handleRenderSeekPosition = useCallback(() => {
    if (!isSeeking) {
      setSeekValue(playerRef.current?.seek() ?? 0)
    }

    requestAnimationFrameRefId.current = raf(handleRenderSeekPosition)
  }, [isSeeking])

  const handleOnPlay = useCallback(() => {
    handleRenderSeekPosition()
  }, [handleRenderSeekPosition])

  const handleOnToggle = useCallback(() => {
    setPlaying((value) => !value)
    typeof outerSetPlaying === 'function' && outerSetPlaying(!isPlaying)
  }, [isPlaying, outerSetPlaying])

  const handleOnLoad = useCallback(() => {
    setDuration(playerRef.current?.duration() ?? 0)
    setLoaded((value) => (!value ? true : value))
    setError(false)
  }, [])

  const handleOnLoadError = useCallback(() => {
    typeof fetchErrorCallback === 'function' && fetchErrorCallback()
    setError(true)
  }, [fetchErrorCallback])

  const handleMouseDownSeek = useCallback(() => {
    setSeeking(true)
  }, [])

  const handleMouseUpSeek = useCallback((e) => {
    setSeeking(false)
    playerRef.current.seek(e.target.value)
  }, [])

  const handleOnEnd = useCallback(() => {
    setPlaying(false)
    if (requestAnimationFrameRefId.current) {
      raf.cancel(requestAnimationFrameRefId.current)
    }
  }, [])

  const handleSeekValue = useCallback((e) => {
    setSeekValue(e.target.value)
  }, [])

  const volume = useMemo(() => parseFloat(outerVolume / 100), [outerVolume])

  useEffect(() => {
    return () => {
      if (requestAnimationFrameRefId.current) {
        raf.cancel(requestAnimationFrameRefId.current)
      }
    }
  }, [])

  const instance = useMemo(() => {
    return (
      <ReactHowler
        src={link}
        ref={playerRef}
        onLoad={handleOnLoad}
        onEnd={handleOnEnd}
        onPlay={handleOnPlay}
        onLoadError={handleOnLoadError}
        playing={isPlaying}
        mute={isMute}
        volume={volume}
        html5={true}
      />
    )
  }, [
    link,
    handleOnLoad,
    handleOnLoadError,
    handleOnEnd,
    handleOnPlay,
    isPlaying,
    isMute,
    volume
  ])

  return {
    instance,
    isLoaded,
    isPlaying,
    duration,
    isError,
    handleOnToggle,
    handleMouseDownSeek,
    handleMouseUpSeek,
    handleSeekValue,
    seekValue
  }
}

export default useHowler
