import React from 'react'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import './Switch.scss'

const Switch = ({
  switchOnLabel,
  switchOffLabel,
  switchTrigger,
  isDenoised
}) => {
  const { t } = useTranslation()

  const handleSwitchTrigger = (value) => {
    if (typeof switchTrigger === 'function') switchTrigger(value)
  }

  return (
    <div className={clsx('switch', { active: isDenoised })}>
      <button onClick={() => handleSwitchTrigger(false)}>
        {switchOffLabel || t('common.noised')}
      </button>
      <button onClick={() => handleSwitchTrigger(true)}>
        {switchOnLabel || t('common.denoised')}
      </button>
    </div>
  )
}

export default Switch
