import React, { useRef, useCallback, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { createCanvas } from '../../util'
import { PROGRESS_WAVE_DETAIL } from '../../asset/constant'
import clsx from 'clsx'
import './ProgressWave.scss'

const DATA_LENGTH_LIMIT = 1024

const ProgressWave = ({
  percentage,
  handleManuallyUpdateTime,
  isDenoised,
  id,
  bufferData,
  className
}) => {
  const { t } = useTranslation()
  const enhancedContainerRef = useRef(null)
  const enhancedStaticTrackRef = useRef(null)
  const enhancedProgressTrackRef = useRef(null)
  const enhancedAudioStorageRef = useRef(null)
  const enhancedProgressTrackContainerRef = useRef(null)

  const noisyContainerRef = useRef(null)
  const noisyStaticTrackRef = useRef(null)
  const noisyProgressTrackRef = useRef(null)
  const noisyAudioStorageRef = useRef(null)
  const noisyProgressTrackContainerRef = useRef(null)

  const isBufferDataReady = useMemo(
    () =>
      [bufferData.denoise, bufferData.noise].every((item) => item.length > 0),
    [bufferData]
  )

  const handleOnChange = (e) => {
    handleManuallyUpdateTime(e.target.value / 100)
  }

  const dataSets = {
    enhanced: {
      bufferStorageData: enhancedAudioStorageRef,
      container: enhancedContainerRef,
      canvasses: [
        {
          instance: enhancedStaticTrackRef,
          fillColor: '#e5e5e5'
        },
        {
          instance: enhancedProgressTrackRef,
          fillColor: '#3C88EE'
        }
      ]
    },
    noisy: {
      bufferStorageData: noisyAudioStorageRef,
      container: noisyContainerRef,
      canvasses: [
        {
          instance: noisyStaticTrackRef,
          fillColor: '#e5e5e5'
        },
        {
          instance: noisyProgressTrackRef,
          fillColor: '#3C88EE'
        }
      ]
    }
  }

  const drawRoundBars = ({
    step,
    offsetWidth,
    width,
    gap,
    round,
    context,
    data,
    maxHeight,
    fillColor,
    dataMax,
    dataMin
  }) => {
    if (context) {
      const dataMaxMinGap = maxHeight / (dataMax - dataMin)
      for (let i = 0; i < offsetWidth; i = i + width + gap) {
        let min = 2.0
        let max = -2.0
        for (let j = 0; j < step; j++) {
          const datum = data[i + j] * dataMaxMinGap

          if (datum < min) min = datum
          if (datum > max) max = datum
        }

        const x = i
        const height =
          PROGRESS_WAVE_DETAIL.BASE_HEIGHT + Math.max(1, max - min) > maxHeight
            ? maxHeight
            : PROGRESS_WAVE_DETAIL.BASE_HEIGHT + Math.max(1, max - min)
        const y = PROGRESS_WAVE_DETAIL.BASE_HEIGHT + maxHeight / 2 - height / 2

        if (width < 2 * round) round = width / 2
        if (height < 2 * round) round = height / 2

        context.beginPath()
        context.moveTo(x + round, y)
        context.arcTo(x + width, y, x + width, y + height, round)
        context.arcTo(x + width, y + height, x, y + height, round)
        context.arcTo(x, y + height, x, y, round)
        context.arcTo(x, y, x + width, y, round)
        context.closePath()
        context.fillStyle = fillColor
        context.fill()
      }
    }
  }

  const handleSliceBufferData = (data) => {
    if (data.length > DATA_LENGTH_LIMIT) {
      const dataGap = Math.floor(data.length / DATA_LENGTH_LIMIT)
      let temp = []
      while (temp.length < DATA_LENGTH_LIMIT) {
        const length = temp.length
        temp.push(data[length * dataGap])
      }
      return temp
    }
    return data
  }

  const handleBufferData = useCallback(() => {
    if (isBufferDataReady) {
      enhancedAudioStorageRef.current = bufferData.denoise
      noisyAudioStorageRef.current = bufferData.noise
    }
  }, [isBufferDataReady, bufferData])

  const handleDrawing = useCallback(() => {
    if (isBufferDataReady) {
      Object.keys(dataSets).forEach((item) => {
        const container = dataSets[item].container.current
        let data = dataSets[item].bufferStorageData.current

        data = handleSliceBufferData(data)

        const width = PROGRESS_WAVE_DETAIL.WIDTH
        const gap = PROGRESS_WAVE_DETAIL.GAP
        const round = PROGRESS_WAVE_DETAIL.ROUND
        const offsetWidth = container.offsetWidth
        const step = Math.ceil(data.length / offsetWidth)
        const dataNoiseMax = Math.max(...data)
        const dataNoiseMin = Math.min(...data)

        const maxHeight =
          container.clientHeight - PROGRESS_WAVE_DETAIL.BASE_HEIGHT

        dataSets[item].canvasses.forEach((detail) => {
          const { context } = createCanvas(
            container.clientWidth,
            container.clientHeight,
            detail.instance.current
          )

          drawRoundBars({
            step,
            offsetWidth,
            width,
            round,
            gap,
            context,
            data,
            maxHeight,
            fillColor: detail.fillColor,
            dataMax: dataNoiseMax,
            dataMin: dataNoiseMin
          })
        })
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBufferDataReady, id])

  useEffect(() => {
    handleBufferData()
  }, [handleBufferData])

  useEffect(() => {
    window.addEventListener('resize', handleDrawing)
    handleDrawing()
    return () => {
      window.removeEventListener('resize', handleDrawing)
    }
  }, [handleDrawing, t])

  return (
    <div className={clsx('progressWave', className)}>
      <div
        className={clsx('progressWave__container', {
          active: !isDenoised
        })}
        ref={noisyContainerRef}
      >
        <canvas className="progressWave__static" ref={noisyStaticTrackRef} />
        <div
          className="progressWave__progress"
          style={{ maxWidth: `${percentage}%` }}
          ref={noisyProgressTrackContainerRef}
        >
          <canvas ref={noisyProgressTrackRef} />
        </div>
      </div>
      <div
        className={clsx('progressWave__container', {
          active: isDenoised
        })}
        ref={enhancedContainerRef}
      >
        <canvas className="progressWave__static" ref={enhancedStaticTrackRef} />
        <div
          className="progressWave__progress"
          style={{ maxWidth: `${percentage}%` }}
          ref={enhancedProgressTrackContainerRef}
        >
          <canvas ref={enhancedProgressTrackRef} />
        </div>
      </div>
      <input
        type="range"
        max="100"
        min="0"
        step="0.01"
        value={percentage}
        onChange={handleOnChange}
      />
    </div>
  )
}

export default ProgressWave
