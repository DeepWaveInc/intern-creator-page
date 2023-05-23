import React, { useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { ACCOUNT_URL, URL_PARAM_FROM } from '../../../../../../_constants'
import { Normal as Button } from '../../../../../button'
import { ReactComponent as ErrorImg } from '../../../../../../assets/image/icons/error.svg'
import './Error.scss'

const LOGIN_ACTION = [411, 412, 413, 414, 419, 420, 421]
const TOP_UP_ACTION = [522, 622]

const Error = ({ title, onClick, code }) => {
  const { t } = useTranslation()

  const handleOnClick = useCallback(() => {
    const urlParams = new URLSearchParams()
    switch (true) {
      case LOGIN_ACTION.includes(code):
        urlParams.set('from', URL_PARAM_FROM.NOISE_ERASER_WEB)
        window.location.href = `${ACCOUNT_URL}/login?${urlParams.toString()}`
        break
      case TOP_UP_ACTION.includes(code):
        window.open(`${ACCOUNT_URL}/cart`, '_blank', 'noopener noreferrer')
        break
      default:
        onClick()
        break
    }
  }, [code, onClick])

  const buttonText = useMemo(() => {
    switch (true) {
      case LOGIN_ACTION.includes(code):
        return t('common.login_again')
      case TOP_UP_ACTION.includes(code):
        return t('common.go_top_up')
      default:
        return t('common.file_re_select')
    }
  }, [code, t])

  return (
    <div className="hullaballoo-modal__upload__error">
      <ErrorImg className="hullaballoo-modal__upload__error__img" />
      <span>{title || `Error Code: ${code}`}</span>
      <Button type="primary" onClick={handleOnClick}>
        <span>{buttonText}</span>
      </Button>
    </div>
  )
}

Error.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
  code: PropTypes.number
}

export default Error
