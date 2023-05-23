import React from 'react'
import Trans from '../../../../../component/trans'
import { useSpring, a } from '@react-spring/web'
import { useIsMobileLayout, useInView } from '../../../../../hooks'
import './VideoDemo.scss'

const VIDEO = {
  src: 'https://www.youtube.com/embed/e9zENcqkY28',
  credit: {
    author: '@hsu.mabel',
    link: 'https://www.instagram.com/hsu.mabel/'
  }
}

const VideoDemo = () => {
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
    <section className="landing-video-demo">
      <div className="landing-video-demo__container" ref={sectionInViewRef}>
        <a.div style={titleSlideIn} className="landing-video-demo__title">
          <h2>
            <Trans i18nKey="landing.video_demo.title">
              <br />
            </Trans>
          </h2>
          <p>
            <Trans i18nKey="landing.video_demo.desc">
              <br />
            </Trans>
          </p>
        </a.div>
        <a.div style={contentSlideIn} className="landing-video-demo__content">
          <div className="landing-video-demo__content__video">
            <iframe
              src={VIDEO.src}
              title={VIDEO.credit.author}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p>
            Credit:{' '}
            <a
              href={VIDEO.credit.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {VIDEO.credit.author}
            </a>
          </p>
        </a.div>
      </div>
    </section>
  )
}

export default VideoDemo
