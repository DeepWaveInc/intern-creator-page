import React from 'react'
import { ReactComponent as QuoteLeft } from '../../../../../../../assets/image/landing/feedback/quote_left.svg'
import { ReactComponent as QuoteRight } from '../../../../../../../assets/image/landing/feedback/quote_right.svg'
import { useTranslation } from 'react-i18next'
import Trans from '../../../../../../../component/trans'
import './Comment.scss'

const Comment = ({ image, image2x, name, content }) => {
  const { t } = useTranslation()
  return (
    <div className="landing-feedback__comment">
      <div className="landing-feedback__comment__avatar">
        <img src={image} srcSet={`${image} 1x, ${image2x} 2x`} alt={t(name)} />
      </div>
      <div className="landing-feedback__comment__container">
        <h3>{t(name)}</h3>
        <div className="landing-feedback__comment__content">
          <QuoteLeft />
          <p>
            <Trans i18nKey={content}>
              <br />
            </Trans>
          </p>
          <QuoteRight />
        </div>
      </div>
    </div>
  )
}

export default Comment
