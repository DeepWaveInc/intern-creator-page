import { useTranslation } from 'react-i18next'
import Trans from '../../../../component/trans'
import { ReactComponent as Background } from '../../../../assets/image/landing/head/background.svg'
import { ReactComponent as Dialogbox } from '../../../../assets/image/creator/head/dialogbox.svg'
import { ReactComponent as DialogboxMobile } from '../../../../assets/image/creator/head/dialogboxmobile.svg'
import YoutuberPhoto from '../../../../assets/image/creator/head/youtuber.png'
import YoutuberPhoto_2x from '../../../../assets/image/creator/head/youtuber@2x.png'
import YoutuberPad from '../../../../assets/image/creator/head/youtuberpad.png'
import YoutuberPad_2x from '../../../../assets/image/creator/head/youtuberpad@2x.png'
import YoutuberMobile from '../../../../assets/image/creator/head/youtubermobile.png'
import YoutuberMobile_2x from '../../../../assets/image/creator/head/youtubermobile@2x.png'
import { Normal as Button } from '../../../../component/button'
import { useState, useEffect } from 'react'
import './Head.scss'

const Head = () => {
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
    <section className="creator-head">
      <div className="creator-head__circle" />
      <Background className="creator-head__background" />
      <div className="creator-head__container">
        <picture className="creator-head__youtuber">
          <source
            media="(min-width: 1280px)"
            srcSet={`${YoutuberPhoto} 1x,${YoutuberPhoto_2x} 2x`}
          />
          <source
            media="(min-width: 960px) and (max-width: 1280px)"
            srcSet={`${YoutuberPad} 1x,${YoutuberPad_2x} 2x`}
          />
          <source
            media="(max-width: 960px)"
            srcSet={`${YoutuberMobile} 1x,${YoutuberMobile_2x} 2x`}
          />

          <img src={YoutuberPhoto} alt="YoutuberPhoto" />

          <h3>{t('creator.head.title')}</h3>
        </picture>
        <div className="creator-head__dialog">
          {windowWidth <= 960 ? (
            <DialogboxMobile className="creator-head__dialogBox" />
          ) : (
            <Dialogbox className="creator-head__dialogBox" />
          )}

          <div className="creator-head__context">
            <div className="creator-head__context_head">
              <h3>{t('creator.head.subtitle')}</h3>
              <Button
                {...{
                  type: 'primary'
                }}
              >
                <span>{t('creator.head.action')}</span>
              </Button>
            </div>
            <p>
              <Trans i18nKey="creator.head.description_1">
                <br />
              </Trans>
              {/* TODO: 使用 css 來調整段落之間的行距，盡量不使用 br tag 來分段 */}
              <br />
            </p>
            <p>
              <Trans i18nKey="creator.head.description_2">
                <br />
              </Trans>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Head
