import { useTranslation } from 'react-i18next'
import Trans from '../../../../component/trans'

import { ReactComponent as QuotationMarksBlue } from '../../../../assets/image/creator/shutter/quotationmarks.svg'
import { ReactComponent as QuotationMarksYellow } from '../../../../assets/image/creator/shutter/quotationmarks_y.svg'
import { ReactComponent as LaptopMockup } from '../../../../assets/image/creator/shutter/laptopmockup.svg'
import { ReactComponent as IconPodcast } from '../../../../assets/image/creator/shutter/iconpodcast.svg'
import { ReactComponent as IconYoutube } from '../../../../assets/image/creator/shutter/iconyoutube.svg'
import ReactPlayer from 'react-player'
import { useState, useEffect } from 'react'
import './Shutter.scss'

const Shutter = () => {
  const { t } = useTranslation()
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

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
            <ReactPlayer
              className="creator-page__shutter__effect__video"
              url="https://www.youtube.com/watch?v=e9zENcqkY28"
              width="100%"
              height="100%"
            />
          </div>
          <div className="creator-page__shutter__podcast__circle">
            <div className="creator-page__shutter__podcast__context">
              <span className="creator-page__shutter__podcast__title">
                {t('creator.podcast.title')}
              </span>
              <div className="creator-page__shutter__podcast__bar" />
              <p className="creator-page__shutter__podcast__text">
                {t('creator.podcast.description')}
              </p>

              <p className="creator-page__shutter__podcast__name">
                <Trans i18nKey="creator.podcast.author">
                  <br />
                </Trans>
              </p>
              <div className="creator-page__shutter__podcast__blue-circle" />

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
              className="creator-page__shutter__effect__video"
              url="https://www.youtube.com/watch?v=e9zENcqkY28"
              width="100%"
              height="100%"
            />
          </div>

          <div className="creator-page__shutter__youtube__circle">
            <div className="creator-page__shutter__youtube__context">
              <span className="creator-page__shutter__youtube__title">
                {t('creator.youtube.title')}
              </span>
              <div className="creator-page__shutter__youtube__bar" />
              <p className="creator-page__shutter__youtube__text">
                {t('creator.youtube.description')}
              </p>
              <div className="creator-page__shutter__youtube__yellow-circle" />
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
