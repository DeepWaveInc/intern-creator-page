import { useTranslation } from 'react-i18next'
import { Normal as Button } from '../../../../component/button'
import { ReactComponent as IconPodcast } from '../../../../assets/image/creator/creatorlist/podcast.svg'
import { ReactComponent as IconYoutube } from '../../../../assets/image/creator/creatorlist/youtube.svg'
import './CreatorList.scss'
import IMAGES from './media'

const ImageList = ({ images }) => {
  return (
    <ul className="creator-page__creator-list__image">
      {images.map((image, index) => (
        <li className="creator-page__creator-list__image__item" key={index}>
          <a
            href={image.link}
            className="creator-page__creator-list__image__item__container"
          >
            <img src={image.src} srcSet={image.srcset} alt={image.link} />
            <div
              className={`creator-page__creator-list__image__item__overlay ${
                image.type === 'podcast'
                  ? 'creator-page__creator-list__image__item__overlay--yellow'
                  : 'creator-page__creator-list__image__item__overlay--blue'
              }`}
            >
              {image.type === 'podcast' ? (
                <IconPodcast className="creator-page__creator-list__image__item__overlay__icon" />
              ) : (
                <IconYoutube className="creator-page__creator-list__image__item__overlay__icon" />
              )}
              <span className="creator-page__creator-list__image__item__overlay__text">
                {image.name}
              </span>
            </div>
          </a>
        </li>
      ))}
    </ul>
  )
}

const CreatorList = () => {
  const { t } = useTranslation()
  return (
    <section className="creator-page__creator-list">
      <div className="creator-page__creator-list__container">
        <h1>{t('creator.list.title')}</h1>
        <ImageList images={IMAGES} />
        <Button
          {...{
            type: 'primary'
          }}
        >
          <span>{t('creator.list.action')}</span>
        </Button>
      </div>
    </section>
  )
}

export default CreatorList
