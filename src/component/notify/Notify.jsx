import React, { useState, useRef, useCallback, useEffect, memo } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { ReactComponent as CloseIcon } from '../../assets/image/icons/close_icon.svg'
import { NOTIFY_COMPONENT_CONFIG } from '../../_constants'
import './Notify.scss'

const Notify = ({
  message,
  className,
  type = NOTIFY_COMPONENT_CONFIG.TYPE_INFO,
  closeable,
  onClose,
  autoHidePeriod = NOTIFY_COMPONENT_CONFIG.AUTO_HIDE_PERIOD,
  isShow: outerShow,
  prefixIcon: PrefixIcon = null
}) => {
  const [isShow, setShow] = useState(false)
  const setTimeoutId = useRef(null)

  const handleClose = () => {
    typeof onClose === 'function' ? onClose() : setShow(false)
  }

  const handleAutoHide = useCallback(() => {
    if (outerShow) {
      setShow(true)
      setTimeoutId.current && clearTimeout(setTimeoutId.current)
      closeable &&
        autoHidePeriod > 0 &&
        (setTimeoutId.current = setTimeout(() => {
          typeof onClose === 'function' ? onClose() : setShow((value) => !value)
        }, autoHidePeriod))
    } else {
      setShow(false)
    }
  }, [autoHidePeriod, closeable, onClose, outerShow])

  useEffect(() => {
    handleAutoHide()
  }, [handleAutoHide])

  useEffect(() => {
    return () => {
      setTimeoutId.current && clearTimeout(setTimeoutId.current)
    }
  }, [])

  if (!isShow) return null

  return (
    <div
      className={clsx(
        'hullaballoo-notify',
        `hullaballoo-notify__${type}`,
        className,
        {
          closeable
        }
      )}
    >
      <div className="hullaballoo-notify__container">
        {PrefixIcon && <PrefixIcon className="hullaballoo-notify__prefix" />}
        <span>{message}</span>
      </div>
      {closeable && (
        <CloseIcon
          onClick={handleClose}
          className="hullaballoo-notify__close"
        />
      )}
    </div>
  )
}

Notify.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.oneOf(['error', 'info', 'success', 'warning']),
  closeable: PropTypes.bool,
  onClose: PropTypes.func,
  autoHidePeriod: PropTypes.number,
  isShow: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  prefixIcon: PropTypes.element
}

export default memo(Notify)
