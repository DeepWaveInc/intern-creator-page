import React from 'react'
import Trans from '../../../../../component/trans'
import { useSpring, a } from '@react-spring/web'
import { useIsMobileLayout, useInView } from '../../../../../hooks'
import { ReactComponent as Image } from '../../../../../assets/image/landing/professional-effects/image.svg'
import './ProfessionalEffects.scss'

const ProfessionalEffects = () => {
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
    <section className="landing-professional-effects">
      <div
        className="landing-professional-effects__container"
        ref={sectionInViewRef}
      >
        <a.div
          style={titleSlideIn}
          className="landing-professional-effects__title"
        >
          <h2>
            <Trans i18nKey="landing.professional_effects.title">
              <br />
            </Trans>
          </h2>
          <p>
            <Trans i18nKey="landing.professional_effects.desc">
              <br />
            </Trans>
          </p>
        </a.div>
        <a.div
          style={contentSlideIn}
          className="landing-professional-effects__content"
        >
          <Image />
        </a.div>
      </div>
    </section>
  )
}

export default ProfessionalEffects
