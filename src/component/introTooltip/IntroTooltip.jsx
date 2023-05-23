import React, { useCallback, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Normal as Button } from '../button'
import { createPopper } from '@popperjs/core'
import { PLACEMENT } from '../../_constants'
import './IntroTooltip.scss'

const IntroTooltip = (props) => {
  const tooltipRef = useRef(null)
  const arrowRef = useRef(null)
  const instanceFnRef = useRef(null)
  const {
    className,
    actions = [],
    title,
    targetInstance,
    placement = PLACEMENT.BOTTOM,
    id
  } = props

  const handleInit = useCallback(() => {
    const instance = targetInstance.current || targetInstance
    if (instance && tooltipRef.current) {
      instanceFnRef.current = createPopper(instance, tooltipRef.current, {
        placement,
        modifiers: [
          {
            name: 'arrow',
            options: {
              element: arrowRef.current
            }
          },
          {
            name: 'offset',
            options: {
              offset: ({ placement }) => {
                switch (placement) {
                  case PLACEMENT['LEFT-END']:
                  case PLACEMENT['RIGHT-END']:
                    return [20, 20]
                  case PLACEMENT['LEFT-START']:
                  case PLACEMENT['RIGHT-START']:
                    return [-20, 20]
                  default:
                    return [0, 20]
                }
              }
            }
          },
          {
            name: 'applyArrowHide',
            enabled: true,
            phase: 'write',
            fn({ state }) {
              const { arrow } = state.elements
              if (arrow) {
                if (state.modifiersData.arrow.centerOffset !== 0) {
                  arrow.setAttribute('data-hide', '')
                } else {
                  arrow.removeAttribute('data-hide')
                }
              }
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleResize = useCallback(() => {
    setTimeout(() => {
      instanceFnRef.current?.destroy()
      handleInit()
    }, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  useEffect(() => {
    handleResize()
  }, [handleResize])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    handleInit()
  }, [handleInit])

  return (
    <div
      className={clsx('hullaballoo-intro-tooltip', className)}
      ref={tooltipRef}
    >
      <div className="hullaballoo-intro-tooltip__container">
        <div
          className={clsx('hullaballoo-intro-tooltip__arrow')}
          ref={arrowRef}
        />
        <div className="hullaballoo-intro-tooltip__content">{title}</div>
        <div
          className={clsx(
            'hullaballoo-intro-tooltip__actions',
            `hullaballoo-intro-tooltip__actions--count_${actions.length}`
          )}
        >
          {actions.map((action) => (
            <Button
              type={action.type}
              key={action.key}
              onClick={action.onClick}
            >
              <span>{action.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

IntroTooltip.prototype = {
  className: PropTypes.string,
  actions: PropTypes.arrayOf({
    type: PropTypes.oneOf(['primary', 'secondary', 'blank']).isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    key: PropTypes.string.isRequired
  }),
  title: PropTypes.string.isRequired,
  targetInstance: PropTypes.instanceOf(Element),
  placement: PropTypes.oneOf(Object.values(PLACEMENT))
}

export default IntroTooltip
