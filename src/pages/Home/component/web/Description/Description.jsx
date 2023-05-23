import React from 'react'
import { useTranslation } from 'react-i18next'
import Trans from '../../../../../component/trans'
import { useSpring, useTrail, a } from '@react-spring/web'
import { useIsMobileLayout, useInView } from '../../../../../hooks'
import { ReactComponent as CopyrightSvg } from '../../../../../assets/image/landing/description/copyright.svg'
import { ReactComponent as NoiseSvg } from '../../../../../assets/image/landing/description/noise.svg'
import { ReactComponent as FanSvg } from '../../../../../assets/image/landing/description/fan.svg'
import { ReactComponent as EchoSvg } from '../../../../../assets/image/landing/description/echo.svg'
import { ReactComponent as EnvSvg } from '../../../../../assets/image/landing/description/env.svg'
import './Description.scss'

const ITEMS = [
  {
    icon: CopyrightSvg,
    title: 'landing.description.items.0.title'
  },
  {
    icon: NoiseSvg,
    title: 'landing.description.items.1.title'
  },
  {
    icon: FanSvg,
    title: 'landing.description.items.2.title'
  },
  {
    icon: EchoSvg,
    title: 'landing.description.items.3.title'
  },
  {
    icon: EnvSvg,
    title: 'landing.description.items.4.title'
  }
]

const Description = () => {
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

  return (
    <section className="landing-description">
      <div className="landing-description__container" ref={sectionInViewRef}>
        <a.div style={titleSlideIn} className="landing-description__title">
          <h2>
            <Trans i18nKey="landing.description.title">
              <br />
            </Trans>
          </h2>
          <p>
            <Trans i18nKey="landing.description.desc">
              <br />
            </Trans>
          </p>
        </a.div>
        <ul className="landing-description__content" ref={contentInViewRef}>
          {trail.map(({ ...style }, index) => {
            const item = ITEMS[index]
            const Icon = item.icon
            return (
              <a.li
                key={index}
                style={style}
                className="landing-description__item"
              >
                <Icon />
                <p>{t(item.title)}</p>
              </a.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default Description
