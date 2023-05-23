import React from 'react'
import PropTypes from 'prop-types'
import { Container } from '../../component'
import { useTranslation } from 'react-i18next'
import { Normal as Button } from '../../../button'
import { ReactComponent as RemoveTrackIcon } from '../../../../assets/image/icons/studio/studio_remove_track.svg'
import './RemoveTrack.scss'

const RemoveTrack = ({
  content = null,
  onOkClick,
  onCancelClick,
  isLoading,
  ...props
}) => {
  const { t } = useTranslation()

  return (
    <Container
      {...{
        beforeTitleNode: <RemoveTrackIcon />,
        titleNode: t('common.remove.short'),
        contentNode: content,
        className: 'hullaballoo-modal__remove-track',
        isShowCloseIcon: !isLoading,
        actionsNode: [
          <Button
            outline
            type="primary"
            size="lg"
            key="that_is_right"
            onClick={onOkClick}
            loading={isLoading}
          >
            <span>{t('common.that_is_right')}</span>
          </Button>,
          <Button
            type="primary"
            size="lg"
            key="not_now"
            onClick={onCancelClick}
            disabled={isLoading}
          >
            <span>{t('common.not_now')}</span>
          </Button>
        ],
        ...props
      }}
    />
  )
}

RemoveTrack.propTypes = {
  onOkClick: PropTypes.func,
  onCancelClick: PropTypes.func,
  isLoading: PropTypes.bool
}

export default RemoveTrack
