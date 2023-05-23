import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import Trans from '../../../../../component/trans'
import { useSpring, a } from '@react-spring/web'
import { useIsMobileLayout, useInView } from '../../../../../hooks'
import VoiceFilterPlayer from '../../../../../component/voiceFilterPlayer'
import { Normal as Button } from '../../../../../component/button'
import { sendGAEvent } from '../../../../../_helpers'
import noise from '../../../../../assets/audio/landing/noise.mp3'
import denoise from '../../../../../assets/audio/landing/denoise.mp3'
import { ACCOUNT_URL, URL_PARAM_FROM } from '../../../../../_constants'
import './FilterDemo.scss'

const FilterDemo = () => {
  const { t } = useTranslation()
  const { isMobileLayout } = useIsMobileLayout()

  const [sectionInViewRef, sectionInView] = useInView({
    threshold: [0.25],
    ...(isMobileLayout ? { rootMargin: '0px 0px 200px 0px' } : {})
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

  const contentSlideIn = useSpring({
    y: contentInView ? '0%' : '20%',
    opacity: contentInView ? 1 : 0,
    config: {
      mass: 1,
      tension: 60,
      friction: 23
    }
  })

  const handleFreeTrailClick = useCallback(() => {
    sendGAEvent('index', 'click', 'btn_trynow')
    const urlParams = new URLSearchParams()
    urlParams.set('from', URL_PARAM_FROM.NOISE_ERASER_WEB)
    window.location.href = `${ACCOUNT_URL}/login?${urlParams.toString()}`
  }, [])

  return (
    <section className="landing-filter-demo-web">
      <div
        className="landing-filter-demo-web__container"
        ref={sectionInViewRef}
      >
        <a.div style={titleSlideIn} className="landing-filter-demo-web__title">
          <h2>
            <Trans i18nKey="landing.filter_demo_web.title">
              <br />
            </Trans>
          </h2>
          <p>
            <Trans i18nKey="landing.filter_demo_web.desc">
              <br />
            </Trans>
          </p>
        </a.div>
        <a.div
          style={contentSlideIn}
          ref={contentInViewRef}
          className="landing-filter-demo-web__content"
        >
          <VoiceFilterPlayer
            {...{
              noise_link: noise,
              denoise_link: denoise,
              denoise_spectrum: [],
              noise_spectrum: [],
              duration: '36',
              is_premium_feature_available: true
            }}
          />
          <Button
            {...{
              type: 'primary',
              onClick: handleFreeTrailClick
            }}
          >
            <span>{t('common.free_trail.title')}</span>
          </Button>
        </a.div>
      </div>
    </section>
  )
}

export default FilterDemo
