import React from 'react'
import PropTypes from 'prop-types'
import { Container } from '../../component'
import { useTranslation } from 'react-i18next'
import { Normal as Button } from '../../../button'
import Trans from '../../../trans'
import './TrackDetailIntroBegin.scss'

const Title = () => (
  <Trans i18nKey="modal.track_detail.intro.begin.title">
    <br />
  </Trans>
)

const TrackDetailIntroBegin = ({ onSkipClick, onBeginClick, ...props }) => {
  const { t } = useTranslation()
  return (
    <Container
      {...{
        titleNode: <Title />,
        className: 'hullaballoo-modal__track-detail-intro',
        actionsNode: [
          <Button
            outline
            type="primary"
            size="lg"
            key="skip_intro"
            onClick={onSkipClick}
          >
            <span>{t('common.skip_intro')}</span>
          </Button>,
          <Button type="primary" size="lg" key="begin" onClick={onBeginClick}>
            <span>{t('common.begin')}</span>
          </Button>
        ],
        ...props
      }}
    />
  )
}

TrackDetailIntroBegin.propTypes = {
  onSkipClick: PropTypes.func,
  onBeginClick: PropTypes.func
}

export default TrackDetailIntroBegin
