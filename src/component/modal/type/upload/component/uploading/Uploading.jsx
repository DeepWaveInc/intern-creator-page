import React, { useState, useRef, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Wave } from '../../../../../loading'
import './Uploading.scss'

const SECOND_UPLOADED_MB_SIMULATION = 1000 * 1000 * 6

const Uploading = ({ files = [], afterCompleted, isReady }) => {
  const { t } = useTranslation()
  const frameId = useRef(null)
  const [current, setCurrent] = useState(0)

  const handleAutoIncrement = useCallback(() => {
    const fileTotalSize = files.reduce((acc, cur) => acc + cur.file.size, 0)
    setTimeout(() => {
      setCurrent((value) => {
        const nextValue = Math.round(value + Math.random())
        const invalidValue = value < 0 || value > 99 || nextValue > 99
        if (invalidValue) {
          cancelAnimationFrame(frameId.current)
          return value < 0 ? 0 : value === 100 ? 100 : 99
        }
        return nextValue
      })
      frameId.current = requestAnimationFrame(handleAutoIncrement)
    }, (1000 / 60) * (fileTotalSize / SECOND_UPLOADED_MB_SIMULATION))
  }, [files])

  const handleCompletedNumber = useCallback(() => {
    if (isReady) {
      cancelAnimationFrame(frameId.current)
      setCurrent(100)
    }
  }, [isReady])

  const handleAfterCompleted = useCallback(() => {
    if (current === 100) {
      setTimeout(() => {
        afterCompleted()
      }, 275)
    }
  }, [current, afterCompleted])

  useEffect(() => {
    handleAfterCompleted()
  }, [handleAfterCompleted])

  useEffect(() => {
    handleCompletedNumber()
  }, [handleCompletedNumber])

  useEffect(() => {
    handleAutoIncrement()
    return () => {
      setCurrent(0)
      cancelAnimationFrame(frameId.current)
    }
  }, [handleAutoIncrement])

  return (
    <div className="hullaballoo-modal__upload__uploading">
      <Wave />
      <h3>{`${current}%`}</h3>
      <h4>{t('common.uploading.title')}</h4>
      <span>{t('common.uploading.description')}</span>
    </div>
  )
}

Uploading.propTypes = {
  files: PropTypes.array.isRequired,
  afterCompleted: PropTypes.func,
  isReady: PropTypes.bool
}

export default Uploading
