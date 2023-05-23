import React, { useRef, useCallback, useEffect } from 'react'
import { getDurationRandomNumber, createCanvas } from '../../util'

import {
  BAR_DEFAULT_DATA,
  CURVE_DEFAULT_DATA_1,
  CURVE_DEFAULT_DATA_2
} from '../../asset/constant'
import clsx from 'clsx'
import './Animation.scss'

const BAR = {
  GAP: 5.19,
  WIDTH: 7.25,
  ROUND: 15,
  COLOR: '#98B7EB',
  MAX_HEIGHT: 130,
  MIN_HEIGHT: 20
}

const CURVE = {
  WIDTH: 3,
  COLOR: '#E25B73',
  MAX_HEIGHT: 148,
  MIN_HEIGHT: -148,
  BOUNDARY: 20
}

const Animation = ({
  isDenoised,
  isPlaying,
  activeTrackId,
  fps = 60,
  showDefaultList
}) => {
  const containerRef = useRef(null)
  const canvasBarRef = useRef(null)
  const canvasCurve1Ref = useRef(null)
  const canvasCurve2Ref = useRef(null)
  const requestAnimationFrameId = useRef(0)
  const setTimeoutId = useRef(0)
  const barAnimateData = useRef(null)
  const curve1AnimateData = useRef(null)
  const curve2AnimateData = useRef(null)

  const animate = useCallback(() => {
    const animateDataGroup = {
      barAnimateData: {
        instance: barAnimateData,
        value: BAR_DEFAULT_DATA,
        max: BAR.MAX_HEIGHT,
        min: BAR.MIN_HEIGHT,
        callback: () =>
          drawRoundBars({
            points: barAnimateData.current.map((item) => item.position)
          }),
        randomMax: 3,
        randomMin: 5
      },
      curve1AnimateData: {
        instance: curve1AnimateData,
        value: CURVE_DEFAULT_DATA_1,
        max: CURVE.MAX_HEIGHT,
        min: CURVE.MIN_HEIGHT,
        callback: () =>
          drawCurve({
            canvasInstance: canvasCurve1Ref.current,
            points: curve1AnimateData.current.map((item) => item.position),
            defaultY: 20
          }),
        randomMax: 0,
        randomMin: 30
      },
      curve2AnimateData: {
        instance: curve2AnimateData,
        value: CURVE_DEFAULT_DATA_2,
        max: CURVE.MAX_HEIGHT,
        min: CURVE.MIN_HEIGHT,
        callback: () =>
          drawCurve({
            canvasInstance: canvasCurve2Ref.current,
            points: curve2AnimateData.current.map((item) => item.position),
            defaultY: 100
          }),
        randomMax: 10,
        randomMin: 15
      }
    }

    Object.keys(animateDataGroup).forEach((item) => {
      const currentInstance = animateDataGroup[item].instance

      if (!currentInstance.current) {
        currentInstance.current = animateDataGroup[item].value.map(
          (position) => ({
            position,
            increase: true
          })
        )
      }

      currentInstance.current = currentInstance.current.map(
        ({ position, increase }) => {
          const random = getDurationRandomNumber(
            animateDataGroup[item].randomMin,
            animateDataGroup[item].randomMax
          )

          const updateFlag = increase
            ? position + random > animateDataGroup[item].max
            : position - random < animateDataGroup[item].min
          return {
            position: updateFlag
              ? increase
                ? position - random
                : position + random
              : increase
              ? position + random
              : position - random,
            increase: updateFlag ? !increase : increase
          }
        }
      )
      isPlaying && animateDataGroup[item].callback()
    })

    if (isPlaying) {
      setTimeoutId.current = setTimeout(() => {
        requestAnimationFrameId.current = window.requestAnimationFrame(() => {
          animate()
        })
      }, 1000 / fps)
    } else {
      clearTimeout(setTimeoutId.current)
      window.cancelAnimationFrame(requestAnimationFrameId.current)
    }
  }, [fps, isPlaying])

  const drawRoundBars = (props) => {
    let width = props?.width ?? BAR.WIDTH
    let round = props?.round ?? BAR.ROUND
    let color = props?.round ?? BAR.COLOR
    let points = props?.points ?? BAR_DEFAULT_DATA
    const itemWidth = (index) => BAR.GAP * 2 + index * width + index * BAR.GAP

    const { context, canvas } = createCanvas(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight,
      canvasBarRef.current
    )

    const handlePointsToFitContainerWidth = (data) => {
      const dataWidth = data.length * width + data.length * BAR.GAP
      let result = data.reduce(
        (acc, cur, index) =>
          itemWidth(index) < containerRef.current.clientWidth
            ? [...acc, cur]
            : acc,
        []
      )
      if (dataWidth < containerRef.current.clientWidth) {
        return handlePointsToFitContainerWidth([...data, ...result])
      } else {
        return result
      }
    }

    const dataSetBaseOnContainerWidth = handlePointsToFitContainerWidth(points)

    context.clearRect(0, 0, canvas.width, canvas.height)
    dataSetBaseOnContainerWidth.forEach((item, i) => {
      const x = itemWidth(i)

      if (x + width >= containerRef.current.clientWidth) return
      const y = containerRef.current.clientHeight / 2 - item / 2
      const height = item
      if (width < 2 * round) round = width / 2
      if (height < 2 * round) round = height / 2
      context.beginPath()
      context.moveTo(x + round, y)
      context.arcTo(x + width, y, x + width, y + height, round)
      context.arcTo(x + width, y + height, x, y + height, round)
      context.arcTo(x, y + height, x, y, round)
      context.arcTo(x, y, x + width, y, round)
      context.closePath()
      context.fillStyle = color
      context.fill()
    })
  }

  const drawCurve = ({
    canvasInstance,
    defaultX = -CURVE.BOUNDARY,
    defaultY,
    width = CURVE.WIDTH,
    color = CURVE.COLOR,
    points
  }) => {
    const { context, canvas } = createCanvas(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight,
      canvasInstance
    )
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.lineWidth = width
    context.strokeStyle = color
    context.moveTo(defaultX, defaultY)

    const pointsDataSet = points.reduce((acc, cur, index) => {
      const curveGap = Math.round(
        containerRef.current.clientWidth / points.length
      )
      return curveGap * index <= containerRef.current.clientWidth
        ? [
            ...acc,
            {
              x: curveGap * index,
              y: (containerRef.current.clientHeight - cur) / 2
            }
          ]
        : acc
    }, [])

    const dataSetBaseOnContainerWidth = [
      ...pointsDataSet,
      ...(pointsDataSet[pointsDataSet.length - 1].x <=
      containerRef.current.clientWidth
        ? [
            {
              x: containerRef.current.clientWidth + CURVE.BOUNDARY,
              y:
                containerRef.current.clientHeight -
                  pointsDataSet[pointsDataSet.length - 2].y <
                containerRef.current.clientHeight
                  ? containerRef.current.clientHeight -
                    pointsDataSet[pointsDataSet.length - 2].y
                  : containerRef.current.clientHeight / 2
            }
          ]
        : [])
    ]

    const gradient = (a, b) => (b.y - a.y) / (b.x - a.x)

    const bzCurve = (points, f, t) => {
      if (typeof f == 'undefined') f = 0.3
      if (typeof t == 'undefined') t = 0.6

      context.beginPath()
      context.moveTo(points[0].x, points[0].y)

      let m = 0
      let dx1 = 0
      let dy1 = 0
      let dx2 = 0
      let dy2 = 0
      let nexPoint

      let prePoint = points[0]
      for (let i = 1; i < points.length; i++) {
        let curPoint = points[i]
        nexPoint = points[i + 1]
        if (nexPoint) {
          m = gradient(prePoint, nexPoint)
          dx2 = (nexPoint.x - curPoint.x) * -f
          dy2 = dx2 * m * t
        } else {
          dx2 = 0
          dy2 = 0
        }
        context.bezierCurveTo(
          prePoint.x - dx1,
          prePoint.y - dy1,
          curPoint.x + dx2,
          curPoint.y + dy2,
          curPoint.x,
          curPoint.y
        )
        dx1 = dx2
        dy1 = dy2
        prePoint = curPoint
      }
      context.stroke()
    }

    bzCurve(dataSetBaseOnContainerWidth, 0.3, 1)
  }

  const handleInit = useCallback(() => {
    drawRoundBars()
    drawCurve({
      canvasInstance: canvasCurve1Ref.current,
      points: CURVE_DEFAULT_DATA_1,
      defaultY: 20
    })
    drawCurve({
      canvasInstance: canvasCurve2Ref.current,
      points: CURVE_DEFAULT_DATA_2,
      defaultY: 100
    })
  }, [])

  useEffect(() => {
    animate()
  }, [animate])

  useEffect(() => {
    window.addEventListener('resize', handleInit)
    handleInit()
    return () => {
      window.removeEventListener('resize', handleInit)
    }
  }, [handleInit, activeTrackId, showDefaultList])

  return (
    <div className="animation" ref={containerRef}>
      <canvas ref={canvasBarRef} />
      <canvas ref={canvasCurve1Ref} className={clsx({ hidden: isDenoised })} />
      <canvas ref={canvasCurve2Ref} className={clsx({ hidden: isDenoised })} />
    </div>
  )
}

export default Animation
