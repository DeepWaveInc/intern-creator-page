import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Normal as Button } from '../../../../../button'
import { useSelector, shallowEqual } from 'react-redux'
import { ReactComponent as ValidSvg } from '../../../../../../assets/image/icons/studio/studio_valid.svg'
import { ReactComponent as InvalidSvg } from '../../../../../../assets/image/icons/studio/studio_invalid.svg'
import { UPLOAD_ERROR_TYPE, LIMIT_TIME } from '../../../../../../_constants'
import clsx from 'clsx'
import './FileSelected.scss'

const FileSelected = ({
  files = [],
  invalidFiles,
  handleOnClear,
  handleUpload,
  handleUploadClickCallback
}) => {
  const { t } = useTranslation()
  const subscription = useSelector((state) => state.subscription, shallowEqual)
  const actions = useMemo(
    () => [
      { label: t('common.clear'), onClick: handleOnClear, outline: true },
      {
        label: t('common.upload_file'),
        onClick: (e) => {
          typeof handleUploadClickCallback === 'function' &&
            handleUploadClickCallback()
          handleUpload()
        },
        outline: false,
        className: 'ga_btn_confirm_upload',
        disabled: !files.length
      }
    ],
    [handleOnClear, handleUpload, handleUploadClickCallback, t, files]
  )

  return (
    <div className="hullaballoo-modal__upload__file-selected">
      <div className="hullaballoo-modal__upload__file-selected__wrapper">
        <div className="hullaballoo-modal__upload__file-selected__content">
          {files.length > 0 && (
            <div className="hullaballoo-modal__upload__file-selected__container">
              <span>{t('common.supported_files')}</span>
              <ul className="hullaballoo-modal__upload__file-selected__valid">
                {files.map((file, index) => (
                  <li key={index}>
                    <ValidSvg />
                    <span>{file.filename}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!!Object.keys(invalidFiles).reduce((acc, cur) => {
            return acc + invalidFiles[cur].length
          }, 0) && (
            <div className="hullaballoo-modal__upload__file-selected__container">
              <span>{t('common.unsupported_files')}</span>
              <ul className="hullaballoo-modal__upload__file-selected__invalid">
                {Object.keys(invalidFiles).map((item) => {
                  if (invalidFiles[item].length) {
                    return (
                      <li
                        className="hullaballoo-modal__upload__file-selected__invalid__container"
                        key={item}
                      >
                        <span>
                          {item === UPLOAD_ERROR_TYPE.SIZE
                            ? t('upload.error.size')
                            : item === UPLOAD_ERROR_TYPE.DURATION
                            ? t('upload.error.duration', {
                                limit_time:
                                  subscription?.level > 0
                                    ? `${LIMIT_TIME.PREMIUM} ${t(
                                        'common.hours'
                                      )}`
                                    : `${LIMIT_TIME.FREE} ${t(
                                        'common.minutes'
                                      )}`
                              })
                            : t('upload.error.format')}
                        </span>
                        <ul>
                          {invalidFiles[item].map((filename, index) => (
                            <li key={index}>
                              <InvalidSvg />
                              <span>{filename}</span>
                            </li>
                          ))}
                        </ul>
                      </li>
                    )
                  } else {
                    return null
                  }
                })}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div
        className={clsx(
          `hullaballoo-modal__upload__file-selected__actions`,
          `hullaballoo-modal__upload__file-selected__actions--count_${actions.length}`
        )}
      >
        {actions.map((item, index) => (
          <Button
            {...{
              type: 'primary',
              key: index,
              onClick: item.onClick,
              outline: item.outline,
              disabled: item.disabled,
              ...(item.className ? { className: item.className } : {})
            }}
          >
            <span>{item.label}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}
export default FileSelected
