import React, { useState, useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSpring, a } from '@react-spring/web'
import { useIsMobileLayout, useInView } from '../../../../../hooks'
import { Autoplay, Controller } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import StepsContainer from './component/StepsContainer'
import Trans from '../../../../../component/trans'
import Images from './media'
import Phone from '../../common/Phone'
import 'swiper/css'
import './Steps.scss'

const STEPS_COUNT = 3
const DEFAULT_TIMER = 3000

const Steps = () => {
  const { i18n } = useTranslation()
  const [currentStep, setCurrentStep] = useState(0)
  const [controlledSwiper, setControlledSwiper] = useState()
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

  const circleSlideIn = useSpring({
    x: sectionInView ? '0%' : '-35%',
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

  const isZhTW = i18n.language === 'zh-TW'

  const onMouseOver = useCallback(
    (id) => {
      controlledSwiper?.slideTo(id + 1)
    },
    [controlledSwiper]
  )

  const onSlideChange = useCallback(({ realIndex }) => {
    setCurrentStep(realIndex)
  }, [])

  const carouselItems = useMemo(
    () =>
      Array.from(Array(STEPS_COUNT), (_, index) => (
        <SwiperSlide key={index}>
          <div className="landing-steps__slider-wrapper">
            <img
              key={index}
              src={Images.src[isZhTW ? 'tw' : 'en'][index]}
              srcSet={Images.srcSet[isZhTW ? 'tw' : 'en'][index]}
              alt={`carouse_${index + 1}`}
            />
          </div>
        </SwiperSlide>
      )),
    [isZhTW]
  )

  const STEPS = useMemo(
    () =>
      Array.from({ length: STEPS_COUNT }).map((_, index) => ({
        id: index,
        title: `landing.steps.items.${index}.title`,
        description: `landing.steps.items.${index}.desc`
      })),
    []
  )

  return (
    <section className="landing-steps">
      <a.div className="landing-steps__circle" style={circleSlideIn} />
      <div className="landing-steps__container" ref={sectionInViewRef}>
        <a.div style={titleSlideIn} className="landing-steps__title">
          <h2>
            <Trans i18nKey="landing.steps.title">
              <br />
            </Trans>
          </h2>
          <p>
            <Trans i18nKey="landing.steps.desc">
              <br />
            </Trans>
          </p>
        </a.div>
        <a.div
          ref={contentInViewRef}
          style={contentSlideIn}
          className="landing-steps__content"
        >
          <StepsContainer {...{ steps: STEPS, currentStep, onMouseOver }} />
          <Phone>
            <Swiper
              {...{
                onSlideChange,
                modules: [Autoplay, Controller],
                onSwiper: setControlledSwiper,
                loop: true,
                autoplay: {
                  delay: DEFAULT_TIMER,
                  disableOnInteraction: true
                }
              }}
            >
              {carouselItems}
            </Swiper>
          </Phone>
        </a.div>
      </div>
    </section>
  )
}

export default Steps
