import { useState, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import Trans from '../../../../component/trans'

import shutter from '../../../../assets/audio/creator/shutter.mp3'
import shutter_enhanced from '../../../../assets/audio/creator/shutter_enhanced.mp3'
import { ReactComponent as QuotationMarksBlue } from '../../../../assets/image/creator/shutter/quotationmarks.svg'
import { ReactComponent as QuotationMarksYellow } from '../../../../assets/image/creator/shutter/quotationmarks_y.svg'
import { ReactComponent as LaptopMockup } from '../../../../assets/image/creator/shutter/laptopmockup.svg'
import { ReactComponent as IconPodcast } from '../../../../assets/image/creator/shutter/iconpodcast.svg'
import { ReactComponent as IconYoutube } from '../../../../assets/image/creator/shutter/iconyoutube.svg'
import PodcastAvactar_2x from '../../../../assets/image/creator/shutter/podcastavactar@2x.png'
import PodcastAvactar from '../../../../assets/image/creator/shutter/podcastavactar.png'
import YoutubeAvactar_2x from '../../../../assets/image/creator/shutter/youtubeavactar@2x.png'
import YoutubeAvactar from '../../../../assets/image/creator/shutter/youtubeavactar.png'
import ReactPlayer from 'react-player'
import NoiseDifferencePlayer from '../../../../component/noiseDifferencePlayer'
import './Shutter.scss'

const Shutter = () => {
  const { t } = useTranslation()
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const tracks = useMemo(
    () => [
      {
        id: 1,
        name: t('home.demo.track_1'),
        noise_link: shutter,
        denoise_link: shutter_enhanced,
        denoise_spectrum: [],
        noise_spectrum: [],
        long: '00:12'
      }
    ],
    [t]
  )

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <section className="creator-page__shutter">
      <div className="creator-page__shutter__podcast__container">
        <p className="creator-page__shutter__podcast__background ">Podcast</p>
        <div className="creator-page__shutter__podcast">
          <div className="creator-page__shutter__podcast__video">
            <NoiseDifferencePlayer
              {...{
                activeTrackId: 1,
                tracks,
                showDefaultList: false,
                className: 'creator-page__shutter__podcast__video__player'
              }}
            />
            <p className="creator-page__shutter__podcast__video__credit">
              {t('creator.shutter.effect.credit')}{' '}
              <a
                href="https://www.instagram.com/hsu.mabel/"
                target="_blank"
                rel="noopener noreferrer"
              >
                @hsu.mabel
              </a>
            </p>
          </div>
          <div className="creator-page__shutter__podcast__circle">
            <div className="creator-page__shutter__podcast__context">
              <span className="creator-page__shutter__podcast__title">
                {t('creator.podcast.title')}
              </span>
              <div className="creator-page__shutter__podcast__bar" />
              <p className="creator-page__shutter__podcast__text">
                <Trans i18nKey="creator.podcast.description">
                  <br />
                </Trans>
              </p>
              <div className="creator-page__shutter__podcast__blue-circle">
                <img
                  className="creator-page__shutter__podcast__blue-circle__avatar"
                  src={PodcastAvactar}
                  srcSet={`${PodcastAvactar} 1x,${PodcastAvactar_2x} 2x`}
                  alt="PodcastAvactar"
                />
              </div>

              <QuotationMarksBlue className="creator-page__shutter__podcast__markup" />
              <QuotationMarksBlue className="creator-page__shutter__podcast__markdown" />
              <IconPodcast className="creator-page__shutter__podcast__icon" />
            </div>
          </div>
        </div>
      </div>
      <div className="creator-page__shutter__youtube__container">
        <p className="creator-page__shutter__youtube__background">Youtube</p>
        <div className="creator-page__shutter__youtube">
          <div className="creator-page__shutter__youtube__video">
            <ReactPlayer
              className="creator-page__shutter__youtube__video__player"
              url="https://www.youtube.com/watch?v=e9zENcqkY28"
              width="100%"
              height="100%"
            />
            <p className="creator-page__shutter__youtube__video__credit">
              {t('creator.shutter.effect.credit')}{' '}
              <a
                href="https://www.instagram.com/hsu.mabel/"
                target="_blank"
                rel="noopener noreferrer"
              >
                @hsu.mabel
              </a>
            </p>
          </div>

          <div className="creator-page__shutter__youtube__circle">
            <div className="creator-page__shutter__youtube__context">
              <span className="creator-page__shutter__youtube__title">
                {t('creator.youtube.title')}
              </span>
              <div className="creator-page__shutter__youtube__bar" />
              <p className="creator-page__shutter__youtube__text">
                <Trans i18nKey="creator.youtube.description">
                  <br />
                </Trans>
              </p>
              <div className="creator-page__shutter__youtube__yellow-circle">
                <img
                  className="creator-page__shutter__youtube__yellow-circle__avatar"
                  src={YoutubeAvactar}
                  srcSet={`${YoutubeAvactar} 1x,${YoutubeAvactar_2x} 2x`}
                  alt="YoutubeAvactar"
                />
              </div>
              <QuotationMarksYellow className="creator-page__shutter__youtube__markup" />
              <QuotationMarksYellow className="creator-page__shutter__youtube__markdown" />
              <IconYoutube className="creator-page__shutter__youtube__icon" />
            </div>
          </div>
        </div>
      </div>
      <div className="creator-page__shutter__effect__container">
        <h1>{t('creator.shutter.effect.title')}</h1>
        <p>{t('creator.shutter.effect.description')}</p>

        <div className="creator-page__shutter__effect__laptop-container">
          {windowWidth <= 960 ? (
            ''
          ) : (
            <LaptopMockup className="creator-page__shutter__effect__laptop" />
          )}

          <div className="creator-page__shutter__effect__video-container">
            <ReactPlayer
              className="creator-page__shutter__effect__video"
              url="https://www.youtube.com/watch?v=e9zENcqkY28"
              width="100%"
              height="100%"
            />
          </div>
        </div>
        <p className="creator-page__shutter__effect__video-container--credit">
          {t('creator.shutter.effect.credit')}{' '}
          <a
            href="https://www.instagram.com/hsu.mabel/"
            target="_blank"
            rel="noopener noreferrer"
          >
            @hsu.mabel
          </a>
        </p>
      </div>

      <div className="creator-page__shutter__circle" />
    </section>
  )
}

export default Shutter
