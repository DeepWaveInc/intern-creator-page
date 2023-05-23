import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import Trans from '../../component/trans'
import { useLocation } from 'react-router'
import Cookies from 'universal-cookie'
import clsx from 'clsx'

const PolicyLink = () => {
  const { t } = useTranslation()
  return (
    <a
      href="https://dwave.cc/privacy-policy"
      target="_blank"
      rel="noopener noreferrer"
    >
      {t('footer.privacy')}
    </a>
  )
}

function CookieConsent() {
  const cookies = useMemo(() => new Cookies(), [])
  const [isShow, setShow] = useState(!cookies.get('consent'))
  const [isFixedButton, setFixedButton] = useState(false)
  const { t } = useTranslation()
  const location = useLocation()

  const handleConsent = useCallback(() => {
    cookies.set('consent', 'yes', { maxAge: 31536000 })
    setShow(false)
  }, [cookies])

  const handleDecline = useCallback(() => {
    window.open(
      'https://dwave.cc/privacy-policy',
      '_blank',
      'noopener,noreferrer'
    )
  }, [])

  useEffect(() => {
    const footer = document.getElementsByTagName('footer')[0]
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach((mutation) => {
        setFixedButton(mutation?.target?.className === 'fixed__button')
      })
    })

    footer &&
      observer.observe(footer, {
        childList: true,
        attributes: true,
        characterData: true
      })
    return () => observer.disconnect()
  }, [location?.pathname])

  useEffect(() => {
    isFixedButton && location?.pathname !== '/studio' && setFixedButton(false)
  }, [location?.pathname, isFixedButton])

  if (!isShow) return null

  return (
    <div
      className={clsx('cookie-consent-modal', {
        fixed__button: isFixedButton
      })}
    >
      <div className="cookie-consent-modal__content">
        <Trans i18nKey={'common.cookie'}>
          <PolicyLink />
        </Trans>
      </div>
      <div className="cookie-consent-modal__actions">
        <button onClick={handleConsent}>
          <span>{t('common.accept')}</span>
        </button>
        <button onClick={handleDecline}>
          <span>{t('common.learn_more')}</span>
        </button>
      </div>
    </div>
  )
}

export default CookieConsent
