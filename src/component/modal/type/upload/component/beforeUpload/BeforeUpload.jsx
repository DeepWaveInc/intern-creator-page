import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { useSelector, shallowEqual } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { ReactComponent as UploadImg } from '../../../../../../assets/image/icons/upload_icon.svg'
import { ReactComponent as AddImg } from '../../../../../../assets/image/icons/add_icon.svg'
import { Normal as Button } from '../../../../../button'
import Trans from '../../../../../trans'
import { LIMIT_TIME } from '../../../../../../_constants'
import './BeforeUpload.scss'

const Less = () => <span>{`<`}</span>

const BeforeUpload = ({
  onButtonClick,
  handleReset,
  checkIsFilesValid,
  handleSelectFilesCallback
}) => {
  const subscription = useSelector((state) => state.subscription, shallowEqual)
  const { t } = useTranslation()

  const handleOnDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleOnDragIn = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleOnDragOut = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleOnDrop = (e) => {
    handleReset()
    e.preventDefault()
    e.stopPropagation()
    typeof handleSelectFilesCallback === 'function' &&
      handleSelectFilesCallback()
    const files = e.dataTransfer.files
    checkIsFilesValid(files)
  }

  return (
    <div
      className="hullaballoo-modal__upload__before-upload"
      onDragEnter={handleOnDragIn}
      onDragLeave={handleOnDragOut}
      onDragOver={handleOnDrag}
      onDrop={handleOnDrop}
    >
      <UploadImg className="hullaballoo-modal__upload__before-upload__img" />
      <Button
        type="blank"
        className="ga_btn_files"
        onClick={() => {
          onButtonClick()
          typeof handleSelectFilesCallback === 'function' &&
            handleSelectFilesCallback()
        }}
      >
        <AddImg className="hullaballoo-modal__upload__before-upload__add-icon" />
        <span>{t('common.browser_files')}</span>
      </Button>
      <h4>{t('modal.drag_file')}</h4>
      <span>
        <Trans
          i18nKey="modal.drag_file.info"
          values={{
            limit_time:
              subscription?.level > 0
                ? `${LIMIT_TIME.PREMIUM} ${t('common.hours')}`
                : `${LIMIT_TIME.FREE} ${t('common.minutes')}`
          }}
        >
          <br />
          <Less />
        </Trans>
      </span>
    </div>
  )
}

BeforeUpload.propTypes = {
  onButtonClick: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  checkIsFilesValid: PropTypes.func.isRequired,
  handleSelectFilesCallback: PropTypes.func
}

export default memo(BeforeUpload)
