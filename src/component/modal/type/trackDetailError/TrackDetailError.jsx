import React from 'react'
import { Container } from '../../component'
import { useTranslation } from 'react-i18next'
import Trans from '../../../trans'
import { Normal as Button } from '../../../button'
import { ReactComponent as ErrorIcon } from '../../../../assets/image/icons/studio/studio_track_detail_error.svg'
import './TrackDetailError.scss'

const Title = () => (
  <Trans i18nKey="modal.track_detail.error.title">
    <br />
  </Trans>
)

const TrackDetailError = (props) => {
  const { t } = useTranslation()
  const { errorCode = 404 } = props

  return (
    <Container
      {...{
        beforeTitleNode: <ErrorIcon />,
        titleNode: <Title />,
        contentNode: t('modal.track_detail.error.content', { errorCode }),
        className: 'hullaballoo-modal__track-detail-error',
        actionsNode: [
          <Button type="primary" size="lg" key="ok_with_sigh">
            <span>{t('common.ok_with_sigh')}</span>
          </Button>
        ],
        ...props
      }}
    />
  )
}

TrackDetailError.propTypes = {}

export default TrackDetailError
