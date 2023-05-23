import React from 'react'
import { useTranslation } from 'react-i18next'
import Trans from '../../../../../component/trans'
import { useSpring, useTrail, a } from '@react-spring/web'
import { useIsMobileLayout, useInView } from '../../../../../hooks'
import IMAGES from './media'
import clsx from 'clsx'
import './Creator.scss'

const Creator = () => {
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

  const trail = useTrail(IMAGES.length, {
    config: {
      mass: 5,
      tension: 2000,
      friction: 200
    },
    opacity: contentInView ? 1 : 0,
    y: contentInView ? '0%' : '20%',
    delay: 200
  })

  const handleOnClick = (link) => {
    window.open(link, '_blank', 'noopener noreferrer')
  }

  return (
    <section className="landing-creator">
      <div className="landing-creator__container" ref={sectionInViewRef}>
        <a.div style={titleSlideIn} className="landing-creator__title">
          <h2>
            <Trans i18nKey="landing.creator.title">
              <br />
            </Trans>
          </h2>
          <p>
            <Trans i18nKey="landing.creator.desc">
              <br />
            </Trans>
          </p>
        </a.div>
        <ul className="landing-creator__content" ref={contentInViewRef}>
          {trail.map(({ ...style }, index) => {
            const item = IMAGES[index]
            return (
              <a.li
                key={index}
                style={style}
                className={clsx('landing-creator__item', {
                  disabled: !item.link
                })}
                onClick={() => {
                  item.link && handleOnClick(item.link)
                }}
              >
                <img
                  src={item.src}
                  srcSet={item.srcSet}
                  alt={t(`landing.creator.items.${index}.title`)}
                />
                <div>
                  <p>{t(`landing.creator.items.${index}.title`)}</p>
                </div>
              </a.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default Creator
