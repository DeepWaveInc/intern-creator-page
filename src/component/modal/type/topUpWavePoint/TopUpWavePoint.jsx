import React from 'react'
import { Container } from '../../component'
import { useTranslation } from 'react-i18next'
import { Normal as Button } from '../../../button'
import { ReactComponent as TopUpWavePointImg } from '../../../../assets/image/icons/error.svg'
import './TopUpWavePoint.scss'

const TopUpWavePoint = (props) => {
  const { t } = useTranslation()
  return (
    <Container
      {...{
        beforeTitleNode: <TopUpWavePointImg />,
        titleNode: t('modal.top_up_wave_point.title'),
        className: 'hullaballoo-modal__top-up-wave-point',
        actionsNode: [
          <Button type="primary" size="lg" key="go_top_up">
            <span>{t('common.go_top_up')}</span>
          </Button>
        ],
        ...props
      }}
    />
  )
}

export default TopUpWavePoint
