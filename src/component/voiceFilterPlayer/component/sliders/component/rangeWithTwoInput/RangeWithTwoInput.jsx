import { useState, useEffect, useCallback } from 'react'
import clsx from 'clsx'
import { Range, Number } from '../../../../../../component/input'
import { ReactComponent as PureNoiseIcon } from '../../../../../../assets/image/voiceFilterPlayer/pureNoise.svg'
import { ReactComponent as PureVoiceIcon } from '../../../../../../assets/image/voiceFilterPlayer/pureVoice.svg'
import './RangeWithTwoInput.scss'
import { usePopper } from 'react-popper'
import { useIsMobileLayout } from '../../../../../../hooks'
import { PLACEMENT } from '../../../../../../_constants'

const RangeWithTwoInput = ({
  className,
  mainValue,
  mainLabel,
  mainOnChange,
  subValue,
  subLabel,
  subOnChange,
  placement = PLACEMENT['TOP-START'],
  min,
  max,
  step,
  loading,
  disabled
}) => {
  const { isMobileLayout } = useIsMobileLayout()
  const [mainReferenceElement, setMainReferenceElement] = useState(null)
  const [subReferenceElement, setSubReferenceElement] = useState(null)

  const [mainPopperElement, setMainPopperElement] = useState(null)
  const [subPopperElement, setSubPopperElement] = useState(null)

  const [mainArrowElement, setMainArrowElement] = useState(null)
  const [subArrowElement, setSubArrowElement] = useState(null)

  const {
    styles: mainTooltipStyles,
    mainAttributes,
    update: mainPopperUpdate
  } = usePopper(mainReferenceElement, mainPopperElement, {
    placement,
    modifiers: [
      { name: 'arrow', options: { element: mainArrowElement } },
      {
        name: 'offset',
        options: {
          offset: [0, 12]
        }
      },
      {
        name: 'preventOverflow',
        options: {
          rootBoundary: 'document',
          boundary: document.getElementsByClassName('studio-page')[0],
          padding: 18
        }
      }
    ]
  })

  const {
    styles: subTooltipStyles,
    subAttributes,
    update: subPopperUpdate
  } = usePopper(subReferenceElement, subPopperElement, {
    placement,
    modifiers: [
      { name: 'arrow', options: { element: subArrowElement } },
      {
        name: 'offset',
        options: {
          offset: [0, 12]
        }
      },
      {
        name: 'preventOverflow',
        options: {
          rootBoundary: 'document',
          boundary: document.getElementsByClassName('studio-page')[0],
          padding: 18
        }
      }
    ]
  })

  const handleSetTooltipEvent = useCallback(() => {
    const showEvents = isMobileLayout ? ['touchstart'] : ['mouseenter', 'focus']
    const hideEvents = isMobileLayout ? ['touchend'] : ['mouseleave', 'blur']

    function mainShow() {
      mainPopperElement?.setAttribute('data-show', '')
      typeof mainPopperUpdate === 'function' && mainPopperUpdate()
    }

    function mainHide() {
      mainPopperElement?.removeAttribute('data-show')
      typeof mainPopperUpdate === 'function' && mainPopperUpdate()
    }

    function subShow() {
      subPopperElement?.setAttribute('data-show', '')
      typeof subPopperUpdate === 'function' && subPopperUpdate()
    }

    function subHide() {
      subPopperElement?.removeAttribute('data-show')
      typeof subPopperUpdate === 'function' && subPopperUpdate()
    }

    showEvents.forEach((event) => {
      mainReferenceElement?.addEventListener(event, mainShow)
      subReferenceElement?.addEventListener(event, subShow)
    })

    hideEvents.forEach((event) => {
      mainReferenceElement?.addEventListener(event, mainHide)
      subReferenceElement?.addEventListener(event, subHide)
    })
  }, [
    isMobileLayout,
    mainPopperElement,
    mainPopperUpdate,
    subPopperElement,
    subPopperUpdate,
    mainReferenceElement,
    subReferenceElement
  ])

  useEffect(() => {
    handleSetTooltipEvent()
  }, [handleSetTooltipEvent])

  return (
    <div
      className={clsx(
        'eraser-voice-filter-player__range-with-two-input',
        className,
        {
          loading
        }
      )}
    >
      <div className="eraser-voice-filter-player__range-with-two-input__number-wrapper">
        <PureNoiseIcon ref={setSubReferenceElement} />
        <div
          className="eraser-voice-filter-player__range-with-two-input__tooltip"
          ref={setSubPopperElement}
          style={subTooltipStyles.popper}
          {...subAttributes?.popper}
        >
          {subLabel}
          <div ref={setSubArrowElement} style={subTooltipStyles.arrow}></div>
        </div>
        <Number
          {...{
            value: subValue || 0,
            onChange: subOnChange,
            min,
            max,
            step,
            disabled,
            className:
              'eraser-voice-filter-player__range-with-two-input__number center'
          }}
        />
        <span className="eraser-voice-filter-player__range-with-two-input__percentage">
          %
        </span>
      </div>
      <Range
        {...{
          value: mainValue || 0,
          onChange: mainOnChange,
          min,
          max,
          step,
          disabled,
          className: 'eraser-voice-filter-player__range-with-two-input__range'
        }}
      />
      <div className="eraser-voice-filter-player__range-with-two-input__number-wrapper">
        <PureVoiceIcon ref={setMainReferenceElement} />
        <div
          className="eraser-voice-filter-player__range-with-two-input__tooltip"
          ref={setMainPopperElement}
          style={mainTooltipStyles.popper}
          {...mainAttributes?.popper}
        >
          {mainLabel}
          <div ref={setMainArrowElement} style={mainTooltipStyles.arrow}></div>
        </div>
        <Number
          {...{
            value: mainValue || 0,
            onChange: mainOnChange,
            min,
            max,
            step,
            disabled,
            className:
              'eraser-voice-filter-player__range-with-two-input__number center'
          }}
        />
        <span className="eraser-voice-filter-player__range-with-two-input__percentage">
          %
        </span>
      </div>
    </div>
  )
}

export default RangeWithTwoInput
