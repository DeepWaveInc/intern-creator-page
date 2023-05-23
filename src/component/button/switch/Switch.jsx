import React, { useCallback, memo, forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import './Switch.scss'

const Switch = forwardRef(
  (
    {
      onLabel,
      offLabel,
      switchTrigger,
      isOn,
      disabled,
      className,
      handleClickNoiseCallback,
      handleClickDenoiseCallback
    },
    ref
  ) => {
    const { t } = useTranslation()

    const handleSwitchTrigger = useCallback(
      (value) => {
        if (typeof switchTrigger === 'function') switchTrigger(value)
        if (value) {
          typeof handleClickDenoiseCallback === 'function' &&
            handleClickDenoiseCallback()
        } else {
          typeof handleClickNoiseCallback === 'function' &&
            handleClickNoiseCallback()
        }
      },
      [handleClickDenoiseCallback, handleClickNoiseCallback, switchTrigger]
    )

    return (
      <div
        ref={ref}
        className={clsx('hullaballoo-button__switch', className, {
          active: isOn,
          disabled
        })}
      >
        <button onClick={() => handleSwitchTrigger(false)}>
          <span>{offLabel || t('common.noised')}</span>
        </button>
        <button onClick={() => handleSwitchTrigger(true)}>
          <span>{onLabel || t('common.denoised')}</span>
        </button>
      </div>
    )
  }
)

Switch.propTypes = {
  onLabel: PropTypes.string,
  offLabel: PropTypes.string,
  switchTrigger: PropTypes.func,
  isOn: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string
}

export default memo(Switch)
