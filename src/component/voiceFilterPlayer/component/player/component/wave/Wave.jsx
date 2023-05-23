import React, { useRef, useEffect, useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { createCanvas } from '../../../../../../_helpers'
import './Wave.scss'

export const PROGRESS_WAVE_DETAIL = {
  WIDTH: 2,
  GAP: 2,
  ROUND: 2,
  BASE_HEIGHT: 5
}

const DATA_LENGTH_LIMIT = 1024

const Wave = ({ percentage, handleSeek, bufferData = [] }) => {
  const { t } = useTranslation()
  const containerRef = useRef(null)
  const staticTrackRef = useRef(null)
  const progressTrackContainerRef = useRef(null)
  const progressTrackRef = useRef(null)
  const audioStorageRef = useRef(null)

  const isBufferDataReady = useMemo(() => bufferData.length > 0, [bufferData])

  const dataSets = {
    bufferStorageData: audioStorageRef,
    container: containerRef,
    canvasses: [
      {
        instance: staticTrackRef,
        fillColor: '#e5e5e5'
      },
      {
        instance: progressTrackRef,
        fillColor: '#60A0FF'
      }
    ]
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

  const handleOnChange = (e) => {
    handleSeek(e.target.value / 100)
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
      audioStorageRef.current = bufferData
    }
  }, [isBufferDataReady, bufferData])

  const handleDrawing = useCallback(() => {
    if (isBufferDataReady) {
      const container = dataSets.container.current
      let data = dataSets.bufferStorageData.current

      data = handleSliceBufferData(data)

      const width = PROGRESS_WAVE_DETAIL.WIDTH
      const gap = PROGRESS_WAVE_DETAIL.GAP
      const round = PROGRESS_WAVE_DETAIL.ROUND
      const offsetWidth = container?.offsetWidth || 0
      const step = Math.ceil(data.length / offsetWidth)
      const dataNoiseMax = Math.max(...data)
      const dataNoiseMin = Math.min(...data)

      const maxHeight =
        container?.clientHeight - PROGRESS_WAVE_DETAIL.BASE_HEIGHT || 0

      dataSets.canvasses.forEach((detail) => {
        const { context } = createCanvas(
          container?.clientWidth,
          container?.clientHeight,
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBufferDataReady])

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
    <div className="eraser-voice-filter-player__wave">
      <div
        className={'eraser-voice-filter-player__wave__container'}
        ref={containerRef}
      >
        <canvas
          className="eraser-voice-filter-player__wave__static"
          ref={staticTrackRef}
        />
        <div
          className="eraser-voice-filter-player__wave__progress"
          style={{ maxWidth: `${percentage}%` }}
          ref={progressTrackContainerRef}
        >
          <canvas ref={progressTrackRef} />
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

export default Wave
