import { useMemo, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import Trans from '../../../../../component/trans'
import { useDispatch } from 'react-redux'
import { useSpring, a } from '@react-spring/web'
import { useIsMobileLayout, useInView } from '../../../../../hooks'
import { Controller } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import Comment from './component/comment'
import { Normal as Button } from '../../../../../component/button'
import { userActions } from '../../../../../_actions'
import { APP_STORE_LINK } from '../../../../../_constants'

import { ReactComponent as Arrow } from '../../../../../assets/image/landing/feedback/arrow.svg'
import Comment1 from '../../../../../assets/image/landing/feedback/comment1.jpg'
import Comment1_2x from '../../../../../assets/image/landing/feedback/comment1_2x.jpg'
import Comment2 from '../../../../../assets/image/landing/feedback/comment2.jpg'
import Comment2_2x from '../../../../../assets/image/landing/feedback/comment2_2x.jpg'
import Comment3 from '../../../../../assets/image/landing/feedback/comment3.jpg'
import Comment3_2x from '../../../../../assets/image/landing/feedback/comment3_2x.jpg'
import Comment4 from '../../../../../assets/image/landing/feedback/comment4.jpg'
import Comment4_2x from '../../../../../assets/image/landing/feedback/comment4_2x.jpg'
import Comment5 from '../../../../../assets/image/landing/feedback/comment5.jpg'
import Comment5_2x from '../../../../../assets/image/landing/feedback/comment5_2x.jpg'

import './Feedback.scss'

const INITIAL_SLIDE = 1
const SPACE_BETWEEN = 30

const Feedback = () => {
  const { t } = useTranslation()
  const { modal_qr_code_shown } = userActions
  const dispatch = useDispatch()
  const { isMobileLayout } = useIsMobileLayout()
  const [controlledSwiper, setControlledSwiper] = useState()
  const [sectionInViewRef, sectionInView] = useInView({
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

  const [contentInViewRef, contentInView] = useInView({
    threshold: [0]
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

  const commentsData = useMemo(
    () => [
      {
        name: 'landing.feedback.comment_1.name',
        image: Comment1,
        image2x: Comment1_2x,
        content: 'landing.feedback.comment_1.content'
      },
      {
        name: 'landing.feedback.comment_2.name',
        image: Comment2,
        image2x: Comment2_2x,
        content: 'landing.feedback.comment_2.content'
      },
      {
        name: 'landing.feedback.comment_3.name',
        image: Comment3,
        image2x: Comment3_2x,
        content: 'landing.feedback.comment_3.content'
      },
      {
        name: 'landing.feedback.comment_4.name',
        image: Comment4,
        image2x: Comment4_2x,
        content: 'landing.feedback.comment_4.content'
      },
      {
        name: 'landing.feedback.comment_5.name',
        image: Comment5,
        image2x: Comment5_2x,
        content: 'landing.feedback.comment_5.content'
      }
    ],
    []
  )

  const carouselItems = useMemo(
    () =>
      commentsData.map((comment, index) => (
        <SwiperSlide key={index}>
          <Comment {...{ ...comment }} />
        </SwiperSlide>
      )),
    [commentsData]
  )

  const handleUseItNow = useCallback(() => {
    if (isMobileLayout) {
      window.open(APP_STORE_LINK, '_blank', 'noopener,noreferrer')
    } else {
      modal_qr_code_shown(dispatch)
    }
  }, [dispatch, modal_qr_code_shown, isMobileLayout])

  return (
    <section className="landing-feedback">
      <div className="landing-feedback__container" ref={sectionInViewRef}>
        <a.div style={titleSlideIn} className="landing-feedback__title">
          <h2>
            <Trans i18nKey="landing.feedback.title">
              <br />
            </Trans>
          </h2>
          <p>
            <Trans i18nKey="landing.feedback.desc">
              <br />
            </Trans>
          </p>
        </a.div>
        <div className="landing-feedback__content">
          <a.div
            className="landing-feedback__content__slider"
            ref={contentInViewRef}
            style={contentSlideIn}
          >
            <Swiper
              {...{
                centeredSlides: true,
                spaceBetween: SPACE_BETWEEN,
                slidesPerView: 'auto',
                initialSlide: INITIAL_SLIDE,
                loop: true,
                modules: [Controller],
                onSwiper: setControlledSwiper
              }}
            >
              {carouselItems}
            </Swiper>
          </a.div>
          <div className="landing-feedback__navigation">
            <Arrow
              onClick={() => {
                controlledSwiper?.slidePrev()
              }}
            />
            <Arrow
              onClick={() => {
                controlledSwiper?.slideNext()
              }}
            />
          </div>
        </div>
        <Button
          {...{
            type: 'primary',
            onClick: handleUseItNow
          }}
        >
          <span>{t('common.use_now.title')}</span>
        </Button>
      </div>
    </section>
  )
}

export default Feedback
