import React from 'react'
import PropTypes from 'prop-types'
import { Container } from '../../component'
import { useTranslation } from 'react-i18next'
import Trans from '../../component/trans'
import { Normal as Button } from '../../../button'
import './ConfirmSetting.scss'

const Title = () => (
  <Trans i18nKey="modal.track_detail.confirm_setting.title">
    <br />
  </Trans>
)

const ConfirmSetting = ({ count = 5, onOkClick, onCancelClick, ...props }) => {
  const { t } = useTranslation()

  return (
    <Container
      {...{
        titleNode: <Title />,
        contentNode: t('modal.track_detail.confirm_setting.content', {
          count
        }),
        className: 'hullaballoo-modal__confirm-setting',
        actionsNode: [
          <Button
            outline
            type="primary"
            size="lg"
            key="not_now"
            onClick={onCancelClick}
          >
            <span>{t('common.not_now')}</span>
          </Button>,
          <Button
            type="primary"
            size="lg"
            key="that_is_right"
            onClick={onOkClick}
          >
            <span>{t('common.that_is_right')}</span>
          </Button>
        ],
        ...props
      }}
    />
  )
}

ConfirmSetting.propTypes = {
  count: PropTypes.number,
  onOkClick: PropTypes.func,
  onCancelClick: PropTypes.func
}

export default ConfirmSetting
