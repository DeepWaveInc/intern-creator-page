import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useIsMobileLayout } from '../../../../../hooks'
import { useTranslation } from 'react-i18next'
import { ReactComponent as NoiseEraser } from '../../../../../assets/image/icons/noise_eraser.svg'
import { ReactComponent as Background } from '../../../../../assets/image/landing/head/background.svg'
import ProductMockupImageTW from '../../../../../assets/image/landing/head/productMockup_tw.png'
import ProductMockupImageTW_2x from '../../../../../assets/image/landing/head/productMockup@2x_tw.png'
import ProductMockupImageEN from '../../../../../assets/image/landing/head/productMockup_en.png'
import ProductMockupImageEN_2x from '../../../../../assets/image/landing/head/productMockup@2x_en.png'
import { Normal as Button } from '../../../../../component/button'
import { userActions } from '../../../../../_actions'
import {
  URL_PARAM_FROM,
  ACCOUNT_URL,
  APP_STORE_LINK
} from '../../../../../_constants'
import './Head.scss'

const Images = {
  tw: {
    src: ProductMockupImageTW,
    srcSet: `${ProductMockupImageTW} 1x,${ProductMockupImageTW_2x} 2x`
  },
  en: {
    src: ProductMockupImageEN,
    srcSet: `${ProductMockupImageEN} 1x,${ProductMockupImageEN_2x} 2x`
  }
}

const Head = () => {
  const { t, i18n } = useTranslation()
  const isZhTW = i18n.language === 'zh-TW'
  const { isMobileLayout } = useIsMobileLayout()
  const { modal_qr_code_shown } = userActions
  const dispatch = useDispatch()

  const handleGoToWebStudio = () => {
    const urlParams = new URLSearchParams()
    urlParams.set('from', URL_PARAM_FROM.NOISE_ERASER_WEB)
    window.location.href = `${ACCOUNT_URL}/login?${urlParams.toString()}`
  }

  const handleGoToMobileApp = useCallback(() => {
    if (isMobileLayout) {
      window.open(APP_STORE_LINK, '_blank', 'noopener,noreferrer')
    } else {
      modal_qr_code_shown(dispatch)
    }
  }, [dispatch, isMobileLayout, modal_qr_code_shown])

  return (
    <section className="landing-head">
      <div className="landing-head__circle" />
      <Background className="landing-head__background" />
      <div className="landing-head__container">
        <div className="landing-head__content">
          <div>
            <NoiseEraser className="landing-head__logo" />
            <h1>{t('landing.head.title')}</h1>
            <span>{t('landing.head.subtitle')}</span>
            <p>{t('landing.head.description')}</p>
            <div>
              <Button
                {...{
                  type: 'primary',
                  onClick: handleGoToMobileApp
                }}
              >
                <span>{t('nav.mobile.version')}</span>
              </Button>
              <Button
                {...{
                  type: 'primary',
                  onClick: handleGoToWebStudio
                }}
              >
                <span>{t('nav.web_studio.version')}</span>
              </Button>
            </div>
          </div>
          <img
            src={Images[isZhTW ? 'tw' : 'en'].src}
            srcSet={Images[isZhTW ? 'tw' : 'en'].srcSet}
            alt="Noise Eraser"
          />
        </div>
      </div>
    </section>
  )
}

export default Head
