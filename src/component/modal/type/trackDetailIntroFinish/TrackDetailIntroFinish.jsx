import React from 'react'
import PropTypes from 'prop-types'
import { Container } from '../../component'
import { useTranslation } from 'react-i18next'
import { Normal as Button } from '../../../button'
import Trans from '../../../trans'
import './TrackDetailIntroFinish.scss'

const Title = () => (
  <Trans i18nKey="modal.track_detail.intro.finish.title">
    <br />
  </Trans>
)

const TrackDetailIntroFinish = ({ onOKClick, ...props }) => {
  const { t } = useTranslation()

  return (
    <Container
      {...{
        titleNode: <Title />,
        className:
          'hullaballoo-modal__track-detail-intro hullaballoo-modal__track-detail-intro__finish',
        actionsNode: [
          <Button type="primary" size="lg" key="ok" onClick={onOKClick}>
            <span>{t('common.ok')}</span>
          </Button>
        ],
        ...props
      }}
    />
  )
}

TrackDetailIntroFinish.propTypes = {
  onOKClick: PropTypes.func
}

export default TrackDetailIntroFinish
