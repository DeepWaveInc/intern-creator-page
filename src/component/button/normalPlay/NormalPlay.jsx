import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { PLAY_BUTTON_TYPE } from '../../../_constants'
import clsx from 'clsx'
import './NormalPlay.scss'

const NormalPlay = forwardRef(
  (
    {
      loading,
      outline,
      className,
      size,
      type,
      status = PLAY_BUTTON_TYPE.PLAY,
      ...remaining
    },
    ref
  ) => {
    const { t } = useTranslation()

    return (
      <button
        {...{
          type,
          ref,
          loading: loading?.toString(),
          outline: outline?.toString(),
          className: clsx(
            'hullaballoo-button__normal-play',
            size ? `hullaballoo-button__normal-play--${size}` : '',
            className
          ),
          ...remaining
        }}
      >
        <i className={clsx('hullaballoo-button__normal-play__icon', status)} />
        <span>
          {status === PLAY_BUTTON_TYPE.PLAY
            ? t('common.play')
            : t('common.pause')}
        </span>
      </button>
    )
  }
)

NormalPlay.propTypes = {
  type: PropTypes.oneOf(['primary', 'secondary', 'blank']),
  size: PropTypes.oneOf(['lg', 'md']),
  loading: PropTypes.bool,
  outline: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  status: PropTypes.oneOf(['play', 'pause'])
}

export default NormalPlay
