import './FreeUploadLimitation.scss'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container } from '../../component'
import { useTranslation } from 'react-i18next'
import { Normal as Button } from '../../../button'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { userActions } from '../../../../_actions'
import { ReactComponent as ErrorSvg } from '../../../../assets/image/icons/studio/studio_status_failed.svg'
import { UPLOAD_STATUS, UPLOAD_ERROR_CODE } from '../../../../_constants'
import clsx from 'clsx'

const Content = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const uploadFiles = useSelector((state) => state.upload, shallowEqual)
  const { free_upload_limitation_modal_close } = userActions
  const errorFiles = useMemo(() => {
    return uploadFiles.filter(
      (file) =>
        file.status === UPLOAD_STATUS.ERROR &&
        file.error === UPLOAD_ERROR_CODE.ANALYSIS_FILE_DURATION_EXCEED_LIMIT
    )
  }, [uploadFiles])

  const handleOnClick = useCallback(() => {
    setTimeout(() => {
      navigate('/compare')
    }, 0)
    dispatch(free_upload_limitation_modal_close())
  }, [dispatch, free_upload_limitation_modal_close, navigate])

  return (
    <div className="hullaballoo-modal__free-upload-limitation__container">
      <span>{t('modal.free_upload_limitation.title')}</span>
      <div className="hullaballoo-modal__free-upload-limitation__content">
        <span>{t('modal.free_upload_limitation.desc')}</span>
        {errorFiles.length > 0 && (
          <ul>
            {errorFiles
              .sort((a, b) => b.createTime - a.createTime)
              .map((file) => (
                <li key={file.id}>
                  <ErrorSvg />
                  <span>{file.filename}</span>
                </li>
              ))}
          </ul>
        )}
      </div>
      <Button type="primary" onClick={handleOnClick}>
        {t('common.view_compare_of_subscription')}
      </Button>
    </div>
  )
}

const FreeUploadLimitation = ({ isOpen }) => {
  const dispatch = useDispatch()
  const { free_upload_limitation_modal_close } = userActions
  const [innerOpen, setInnerOpen] = useState(isOpen)

  const handleSetOpen = useCallback(() => {
    setInnerOpen(isOpen)
  }, [isOpen])

  const handleToggle = () => {
    dispatch(free_upload_limitation_modal_close())
    setInnerOpen((value) => !value)
  }

  useEffect(() => {
    handleSetOpen()
  }, [handleSetOpen])

  return (
    <Container
      {...{
        isOpen: innerOpen,
        contentNode: <Content />,
        className: clsx('hullaballoo-modal__free-upload-limitation'),
        isShowCloseIcon: true,
        onCloseIconClick: handleToggle,
        toggle: handleToggle
      }}
    />
  )
}

export default FreeUploadLimitation
