import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Trans from '../../../../../component/trans'
import { useSpring, a } from '@react-spring/web'
import { sendGAEvent } from '../../../../../_helpers'
import { useIsMobileLayout, useInView } from '../../../../../hooks'
import NoiseDifferencePlayer from '../../../../../component/noiseDifferencePlayer'
import peru1 from '../../../../../assets/audio/peru/Noisy.mp3'
import peru2 from '../../../../../assets/audio/peru/Enhanced.mp3'
import airport1 from '../../../../../assets/audio/airport/Noisy.mp3'
import airport2 from '../../../../../assets/audio/airport/Enhanced.mp3'
import typhoon1 from '../../../../../assets/audio/typhoon/Noisy.mp3'
import typhoon2 from '../../../../../assets/audio/typhoon/Enhanced.mp3'
import interview1 from '../../../../../assets/audio/namewee/Noisy.mp3'
import interview2 from '../../../../../assets/audio/namewee/Enhanced.mp3'
import police1 from '../../../../../assets/audio/police/Noisy.mp3'
import police2 from '../../../../../assets/audio/police/Enhanced.mp3'
import './VoiceDemo.scss'

const VoiceDemo = () => {
  const { t } = useTranslation()
  const { isMobileLayout } = useIsMobileLayout()
  const [activeTrackId, setActiveTrackId] = useState(1)

  const tracks = useMemo(
    () => [
      {
        id: 1,
        name: t('home.demo.track_1'),
        noise_link: peru1,
        denoise_link: peru2,
        denoise_spectrum: [],
        noise_spectrum: [],
        long: '00:12'
      },
      {
        id: 2,
        name: t('home.demo.track_2'),
        noise_link: airport1,
        denoise_link: airport2,
        denoise_spectrum: [],
        noise_spectrum: [],
        long: '00:16'
      },
      {
        id: 3,
        name: t('home.demo.track_3'),
        noise_link: typhoon1,
        denoise_link: typhoon2,
        denoise_spectrum: [],
        noise_spectrum: [],
        long: '00:53'
      },
      {
        id: 4,
        name: t('home.demo.track_4'),
        noise_link: interview1,
        denoise_link: interview2,
        denoise_spectrum: [],
        noise_spectrum: [],
        long: '00:52'
      },
      {
        id: 5,
        name: t('home.demo.track_5'),
        noise_link: police1,
        denoise_link: police2,
        denoise_spectrum: [],
        noise_spectrum: [],
        long: '00:58'
      }
    ],
    [t]
  )

  const handleSetActiveTrack = (id) => {
    setActiveTrackId(id)
  }

  const switchOnCallback = (data) => {
    const { id } = data
    sendGAEvent('index', 'click', `play_denoise_${id}`)
  }

  const switchOffCallback = (data) => {
    const { id } = data
    sendGAEvent('index', 'click', `play_noise_${id}`)
  }

  const playCallback = (data) => {
    const { id } = data
    sendGAEvent('index', 'click', `play_${id}`)
  }

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

  return (
    <section className="landing-voice-demo">
      <div className="landing-voice-demo__container" ref={sectionInViewRef}>
        <a.div style={titleSlideIn} className="landing-voice-demo__title">
          <h2>
            <Trans i18nKey="landing.voice_demo.title">
              <br />
            </Trans>
          </h2>
          <p>
            <Trans i18nKey="landing.voice_demo.desc">
              <br />
            </Trans>
          </p>
        </a.div>
        <a.div
          className="landing-voice-demo__content"
          ref={contentInViewRef}
          style={contentSlideIn}
        >
          <NoiseDifferencePlayer
            {...{
              tracks,
              activeTrackId,
              handleSetActiveTrack,
              switchOnCallback,
              switchOffCallback,
              playCallback,
              isPlayAllTracks: false,
              className: 'landing-voice-demo__player'
            }}
          />
        </a.div>
      </div>
    </section>
  )
}

export default VoiceDemo
