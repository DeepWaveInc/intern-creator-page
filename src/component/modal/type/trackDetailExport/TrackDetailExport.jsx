import React from 'react'
import PropTypes from 'prop-types'
import { Container } from '../../component'
import { useTranslation } from 'react-i18next'
import { Normal as Button } from '../../../button'
import Trans from '../../../trans'
import { Wave } from '../../../loading'
import './TrackDetailExport.scss'

const Title = ({ finished }) => (
  <Trans i18nKey={!finished ? 'modal.track_detail.export.title' : 'Finished'}>
    <br />
  </Trans>
)

const TrackDetailExport = (props) => {
  const { t } = useTranslation()
  const { finished } = props

  return (
    <Container
      {...{
        beforeTitleNode: (
          <Wave className="hullaballoo-modal__track-detail-export__wave" />
        ),
        titleNode: <Title {...{ finished }} />,
        className: 'hullaballoo-modal__track-detail-export',
        isShowCloseIcon: false,
        actionsNode: [
          <Button type="primary" size="lg" key="actions" disabled={!finished}>
            <span>
              {!finished
                ? t('common.processing_please_wait')
                : t('common.download_files')}
            </span>
          </Button>
        ],
        ...props
      }}
    />
  )
}

TrackDetailExport.propTypes = {
  finished: PropTypes.bool
}

export default TrackDetailExport
