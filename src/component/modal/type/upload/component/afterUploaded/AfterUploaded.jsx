import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Normal as Button } from '../../../../../button'
import clsx from 'clsx'
// import { Checkbox } from '../../../../../input'
import './AfterUploaded.scss'

const AfterUploaded = ({
  data,
  onCancel,
  onSubmit,
  isSubmitting,
  handleClickCancelSubmitCallback,
  handleClickSubmitCallback
}) => {
  const { t } = useTranslation()
  const HEADERS = [
    t('upload.table.filename'),
    t('upload.table.duration'),
    t('upload.table.wp_cost')
  ]
  const { success_file, total_coin } = data
  const actions = useMemo(
    () => [
      {
        label: t('common.cancel'),
        loading: false,
        onClick: () => {
          typeof handleClickCancelSubmitCallback === 'function' &&
            handleClickCancelSubmitCallback()
          onCancel()
        },
        outline: true,
        disabled: isSubmitting,
        className: 'ga_btn_cancel'
      },
      {
        label: t('common.start_analyzing'),
        loading: isSubmitting,
        onClick: () => {
          typeof handleClickSubmitCallback === 'function' &&
            handleClickSubmitCallback()
          onSubmit()
        },
        outline: false,
        disabled: false,
        className: 'ga_btn_startAnalyze'
      }
    ],
    [t, isSubmitting, handleClickCancelSubmitCallback, onCancel, handleClickSubmitCallback, onSubmit]
  )

  return (
    <div className="hullaballoo-modal__upload__after-uploaded">
      <div className="hullaballoo-modal__upload__after-uploaded__details">
        <div className="hullaballoo-modal__upload__after-uploaded__table">
          <ul className="hullaballoo-modal__upload__after-uploaded__header">
            {HEADERS.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <ul className="hullaballoo-modal__upload__after-uploaded__body">
            {success_file.map((item, index) => (
              <li key={index}>
                <span>{item.filename}</span>
                <span>{`${item.duration} ${t('common.seconds')}`}</span>
                <span>
                  {t('common.wave_point_with_variable', { count: item.coin })}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="hullaballoo-modal__upload__after-uploaded__info">
          <span className="hullaballoo-modal__upload__after-uploaded__info--total">
            {t('upload.uploaded.wp_total', { point: total_coin })}
          </span>
          {/* <div className="hullaballoo-modal__upload__after-uploaded__info--saving">
            <Checkbox checked label={t('upload.keep_files.title')} />
            <span className="hullaballoo-modal__upload__after-uploaded__info--saving__desc">
              {t('upload.keep_files.description')}
            </span>
          </div> */}
        </div>
      </div>
      <div
        className={clsx(
          'hullaballoo-modal__upload__after-uploaded__actions',
          `hullaballoo-modal__upload__after-uploaded__actions--count_${actions.length}`
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
              loading: item.loading,
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

AfterUploaded.propTypes = {
  data: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleClickCancelSubmitCallback: PropTypes.func,
  handleClickSubmitCallback: PropTypes.func,
  isSubmitting: PropTypes.bool
}

export default AfterUploaded
