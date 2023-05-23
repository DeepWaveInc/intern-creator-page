import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import Trans from '../../../../../component/trans'
import { useSpring, useTrail, a } from '@react-spring/web'
import { useIsMobileLayout, useInView } from '../../../../../hooks'
import { ReactComponent as UploadSvg } from '../../../../../assets/image/landing/operational-web/upload.svg'
import { ReactComponent as AiSvg } from '../../../../../assets/image/landing/operational-web/ai.svg'
import { ReactComponent as FinalSvg } from '../../../../../assets/image/landing/operational-web/final.svg'
import { ACCOUNT_URL, URL_PARAM_FROM } from '../../../../../_constants'
import { sendGAEvent } from '../../../../../_helpers'
import { Normal as Button } from '../../../../../component/button'
import './Operational.scss'

const ITEMS = [
  {
    icon: UploadSvg,
    title: 'landing.operational-web.items.0.title'
  },
  {
    icon: AiSvg,
    title: 'landing.operational-web.items.1.title'
  },
  {
    icon: FinalSvg,
    title: 'landing.operational-web.items.2.title'
  }
]

const OperationalWeb = () => {
  const { t } = useTranslation()
  const { isMobileLayout } = useIsMobileLayout()

  const [sectionInViewRef, sectionInView] = useInView({
    threshold: [0.25],
    ...(isMobileLayout ? { rootMargin: '0px 0px 200px 0px' } : {})
  })

  const circleSlideIn = useSpring({
    x: sectionInView ? '0%' : '-35%',
    opacity: sectionInView ? 1 : 0,
    config: {
      mass: 1,
      tension: 60,
      friction: 23
    }
  })

  const [contentInViewRef, contentInView] = useInView({
    threshold: [0.25],
    ...(isMobileLayout ? { rootMargin: '0px 0px 200px 0px' } : {})
  })

  const titleSlideIn = useSpring({
    y: sectionInView ? '0%' : '20%',
    opacity: sectionInView ? 1 : 0,
    config: {
      mass: 1,
      tension: 60,
      friction: 23
    }
  })

  const trail = useTrail(ITEMS.length, {
    config: {
      mass: 5,
      tension: 2000,
      friction: 200
    },
    opacity: contentInView ? 1 : 0,
    y: contentInView ? '0%' : '20%',
    delay: 200
  })

  const handleFreeTrailClick = useCallback(() => {
    sendGAEvent('index', 'click', 'btn_trynow')
    const urlParams = new URLSearchParams()
    urlParams.set('from', URL_PARAM_FROM.NOISE_ERASER_WEB)
    window.location.href = `${ACCOUNT_URL}/login?${urlParams.toString()}`
  }, [])

  return (
    <section className="landing-operational-web">
      <a.div
        className="landing-operational-web__circle"
        style={circleSlideIn}
      />
      <div
        className="landing-operational-web__container"
        ref={sectionInViewRef}
      >
        <a.div style={titleSlideIn} className="landing-operational-web__title">
          <h2>
            <Trans i18nKey="landing.operational-web.title">
              <br />
            </Trans>
          </h2>
          <p>
            <Trans i18nKey="landing.operational-web.desc">
              <br />
            </Trans>
          </p>
        </a.div>
        <ul className="landing-operational-web__content" ref={contentInViewRef}>
          {trail.map(({ ...style }, index) => {
            const item = ITEMS[index]
            const Icon = item.icon
            return (
              <a.li
                key={index}
                style={style}
                className="landing-operational-web__item"
              >
                <Icon />
                <p>{t(item.title)}</p>
              </a.li>
            )
          })}
        </ul>
        <Button
          {...{
            type: 'primary',
            onClick: handleFreeTrailClick
          }}
        >
          <span>{t('common.free_trail.title')}</span>
        </Button>
      </div>
    </section>
  )
}

export default OperationalWeb
