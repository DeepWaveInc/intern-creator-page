import { animated } from '@react-spring/web'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import './QRCode.scss'
import QRCodeImg from '../../../../assets/image/qr-code.jpg'
import QRCodeImg2x from '../../../../assets/image/qr-code@2x.jpg'
import { userActions } from '../../../../_actions'
import { ReactComponent as ZoomInSvg } from '../../../../assets/image/icons/zoom_in.svg'

const QRCode = ({ styles }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const handleOnClick = () => {
    const modal_open = userActions.modal_qr_code_shown
    modal_open(dispatch)
  }

  return (
    <animated.div style={styles} className="navigation__qr-code">
      <p>{t('scan.qr_code.title')}</p>
      <img
        src={QRCodeImg}
        srcSet={`${QRCodeImg} 1x, ${QRCodeImg2x} 2x`}
        alt="noise_eraser"
      />
      <div onClick={handleOnClick}>
        <ZoomInSvg />
        <span>{t('common.zoom_in')}</span>
      </div>
    </animated.div>
  )
}
export default QRCode
