import React from 'react'
import PropTypes from 'prop-types'
import { Container } from '../../component'
import { useTranslation } from 'react-i18next'
import { Normal as Button } from '../../../button'
import { ReactComponent as EarnedWavePointsIcon } from '../../../../assets/image/icons/earned_wave_points.svg'
import clsx from 'clsx'
import './EarnedWavePoints.scss'

const EarnedWavePoints = ({ onClick, className, points = 30, ...props }) => {
  const { t } = useTranslation()
  return (
    <Container
      {...{
        beforeTitleNode: <EarnedWavePointsIcon />,
        titleNode: t('modal.earned_wave_points.title', { points }),
        className: `${clsx(
          'hullaballoo-modal__earned-wave-points',
          className
        )}`,
        actionsNode: [
          <Button type="primary" size="lg" key="ok" onClick={onClick}>
            <span>{t('common.ok')}</span>
          </Button>
        ],
        ...props
      }}
    />
  )
}

EarnedWavePoints.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  points: PropTypes.number
}

export default EarnedWavePoints
