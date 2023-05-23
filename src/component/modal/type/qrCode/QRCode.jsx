import './QRCode.scss'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { ReactComponent as CloseIcon } from '../../../../assets/image/icons/close_icon.svg'
import { ReactComponent as AppleStoreIcon } from '../../../../assets/image/icons/apple_store.svg'
import { ReactComponent as GooglePlayIcon } from '../../../../assets/image/icons/google_play.svg'
import QRCodeImg from '../../../../assets/image/qr-code.jpg'
import QRCodeImg2x from '../../../../assets/image/qr-code@2x.jpg'
import { useDispatch, shallowEqual, useSelector } from 'react-redux'
import { Modal } from 'reactstrap'
import { userActions } from '../../../../_actions'
import { APP_LINKS } from '../../../../_constants'

const STORE_TYPE = {
  IOS: 'IOS',
  ANDROID: 'ANDROID'
}

const QRCode = () => {
  const { t } = useTranslation()
  const [{ qr_code_modal }] = useSelector(
    (state) => [state.modal],
    shallowEqual
  )
  const dispatch = useDispatch()

  const handleCloseModal = useCallback(() => {
    const modal_close = userActions.modal_qr_code_close
    modal_close(dispatch)
  }, [dispatch])

  const handleStoreOnClick = useCallback((type) => {
    window.open(APP_LINKS[type], '_blank', 'noopener,noreferrer')
  }, [])

  return (
    <Modal
      isOpen={qr_code_modal}
      toggle={handleCloseModal}
      className="hullaballoo-modal__qr-code"
      modalClassName="hullaballoo-modal__outer-container"
    >
      <div className="hullaballoo-modal__qr-code__container">
        <CloseIcon
          onClick={handleCloseModal}
          className="hullaballoo-modal__qr-code__container__close"
        />
        <h3>{t('modal.qr_code.title')}</h3>
        <img
          src={QRCodeImg}
          srcSet={`${QRCodeImg} 1x, ${QRCodeImg2x} 2x`}
          alt="noise_eraser"
        />
        <div>
          <AppleStoreIcon
            {...{
              onClick: () => handleStoreOnClick(STORE_TYPE.IOS)
            }}
          />
          <GooglePlayIcon
            {...{
              onClick: () => handleStoreOnClick(STORE_TYPE.ANDROID)
            }}
          />
        </div>
      </div>
    </Modal>
  )
}

export default QRCode
