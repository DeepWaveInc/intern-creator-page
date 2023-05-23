import React from 'react'
import { useTranslation } from 'react-i18next'
import { ReactComponent as SpeakerSVG } from '../../../../../assets/image/landing/actions/speaker.svg'
import { ReactComponent as AppleStore } from '../../../../../assets/image/landing/actions/apple_store.svg'
import { ReactComponent as GooglePlay } from '../../../../../assets/image/landing/actions/google_play.svg'
import './Actions.scss'
import { DISPLAY_TYPES } from '../../../Home'
import { Normal as Button } from '../../../../../component/button'
import {
  APP_LINKS,
  DEEPWAVE_CONTACT,
  CREATOR_GROUP
} from '../../../../../_constants'
import clsx from 'clsx'

const LINKS = {
  group: CREATOR_GROUP,
  contact: DEEPWAVE_CONTACT
}

const Actions = ({ type }) => {
  const { t } = useTranslation()

  const handleOnClick = (link) => {
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  return (
    <section className={clsx('landing-actions', type)}>
      <div className="landing-actions__container">
        <div className="landing-actions__content">
          <SpeakerSVG />
          <p>{t(`landing.actions.${type}.title`)}</p>
        </div>
        <div className="landing-actions__action">
          {type === DISPLAY_TYPES.APP ? (
            <>
              <AppleStore
                {...{
                  onClick: () => handleOnClick(APP_LINKS.IOS)
                }}
              />
              <GooglePlay
                {...{
                  onClick: () => handleOnClick(APP_LINKS.ANDROID)
                }}
              />
            </>
          ) : (
            <>
              <Button
                {...{
                  type: 'primary',
                  onClick: () => handleOnClick(LINKS.group)
                }}
              >
                <span>{t('common.join_creator_group')}</span>
              </Button>
              <Button
                {...{
                  type: 'primary',
                  onClick: () => handleOnClick(LINKS.contact)
                }}
              >
                <span>{t('footer.contact')}</span>
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default Actions
