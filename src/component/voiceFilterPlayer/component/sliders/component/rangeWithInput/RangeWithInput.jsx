import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import { Range, Number } from '../../../../../../component/input'
import './RangeWithInput.scss'

const RangeWithInput = ({
  className,
  label,
  value,
  onChange,
  min,
  max,
  step,
  loading,
  disabled
}) => {
  const { i18n } = useTranslation()
  const lang = useMemo(() => i18n.language, [i18n.language])

  return (
    <div
      className={clsx(
        'eraser-voice-filter-player__range-with-input',
        className,
        lang !== 'zh-TW' && 'en',
        {
          loading
        }
      )}
    >
      <span className="eraser-voice-filter-player__range-with-input__label">
        {label}
      </span>
      <Range
        {...{
          value: value || 0,
          onChange,
          min,
          max,
          step,
          disabled,
          className: 'eraser-voice-filter-player__range-with-input__range'
        }}
      />
      <Number
        {...{
          value: value || 0,
          onChange,
          min,
          max,
          step,
          disabled,
          className:
            'eraser-voice-filter-player__range-with-input__number center'
        }}
      />
      <span className="eraser-voice-filter-player__range-with-input__percentage">
        %
      </span>
    </div>
  )
}

export default RangeWithInput
