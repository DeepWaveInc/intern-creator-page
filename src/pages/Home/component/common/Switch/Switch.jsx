import React from 'react'
import { useTranslation } from 'react-i18next'
import { DISPLAY_TYPES } from '../../../Home'
import clsx from 'clsx'
import './Switch.scss'

const Switch = ({ type, setType }) => {
  const { t } = useTranslation()
  const handleOnClick = (type) => {
    setType(type)
  }

  return (
    <div className="landing-switch">
      <div
        className={clsx('landing-switch__container', {
          app: type === DISPLAY_TYPES.APP,
          web: type === DISPLAY_TYPES.WEB
        })}
      >
        <div
          {...{
            onClick: () => handleOnClick(DISPLAY_TYPES.APP)
          }}
        >
          {t('nav.mobile.version')}
        </div>
        <div
          {...{
            onClick: () => handleOnClick(DISPLAY_TYPES.WEB)
          }}
        >
          {t('nav.web.version')}
        </div>
      </div>
    </div>
  )
}

export default Switch
