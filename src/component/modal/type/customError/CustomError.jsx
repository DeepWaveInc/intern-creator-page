import React from 'react'
import PropTypes from 'prop-types'
import { Container } from '../../component'
import { useTranslation } from 'react-i18next'
import { Normal as Button } from '../../../button'
import { ReactComponent as ErrorImg } from '../../../../assets/image/icons/error.svg'
import clsx from 'clsx'
import './CustomError.scss'

const CustomError = (props) => {
  const { t } = useTranslation()
  const { errorCode, onClick, className, title, actionText } = props
  return (
    <Container
      {...{
        beforeTitleNode: <ErrorImg />,
        titleNode: title || t('modal.error.title'),
        contentNode: errorCode ? `Error: ${errorCode}` : null,
        className: `${clsx('hullaballoo-modal__custom-error', className)}`,
        actionsNode: [
          <Button type="primary" size="lg" key="ok_with_sigh" onClick={onClick}>
            <span>{actionText || t('common.ok_with_sigh')}</span>
          </Button>
        ],
        ...props
      }}
    />
  )
}

CustomError.propTypes = {
  errorCode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
  className: PropTypes.string,
  title: PropTypes.string,
  actionText: PropTypes.string
}

export default CustomError
