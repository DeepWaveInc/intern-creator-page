import React from 'react'
import Trans from '../../../../../component/trans'
import { useSpring, a } from '@react-spring/web'
import { useIsMobileLayout, useInView } from '../../../../../hooks'
import { ReactComponent as Image } from '../../../../../assets/image/landing/operational-app/image.svg'
import { ReactComponent as ImageSM } from '../../../../../assets/image/landing/operational-app/image_sm.svg'
import './Operational.scss'

const OperationalApp = () => {
  const { isMobileLayout } = useIsMobileLayout()
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

  const contentSlideIn = useSpring({
    y: sectionInView ? '0%' : '20%',
    opacity: sectionInView ? 1 : 0,
    config: {
      mass: 1,
      tension: 60,
      friction: 23
    }
  })

  return (
    <section className="landing-operational-app">
      <div
        className="landing-operational-app__container"
        ref={sectionInViewRef}
      >
        <a.div style={titleSlideIn} className="landing-operational-app__title">
          <h2>
            <Trans i18nKey="landing.operational_app.title">
              <br />
            </Trans>
          </h2>
          <p>
            <Trans i18nKey="landing.operational_app.desc">
              <br />
            </Trans>
          </p>
        </a.div>
        <a.div
          style={contentSlideIn}
          className="landing-operational-app__content"
        >
          {isMobileLayout ? <ImageSM /> : <Image />}
        </a.div>
      </div>
    </section>
  )
}

export default OperationalApp
