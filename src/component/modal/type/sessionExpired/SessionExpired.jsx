import React from 'react'
import { useDispatch, shallowEqual, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Modal } from 'reactstrap'
import { userActions } from '../../../../_actions'
import { Normal as Button } from '../../../button'
import { ReactComponent as Login } from '../../../../assets/image/login.svg'
import './SessionExpired.scss'

const SessionExpired = ({ isOpen }) => {
  const navigate = useNavigate()
  const { modal } = useSelector((state) => state.modal, shallowEqual)
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const handleCloseModal = () => {
    const modal_close = userActions.modal_close
    dispatch(modal_close(navigate))
  }

  return (
    <Modal
      isOpen={isOpen ?? modal}
      toggle={handleCloseModal}
      className="hullaballoo-modal__session-expired"
      modalClassName="hullaballoo-modal__outer-container"
    >
      <Login className="hullaballoo-modal__session-expired__img" />
      <div className="hullaballoo-modal__session-expired__title">
        <h3>{t('hint.session_expired')}</h3>
      </div>
      <Button type="primary" onClick={handleCloseModal}>
        <span>{t('common.login_again')}</span>
      </Button>
    </Modal>
  )
}

export default SessionExpired
