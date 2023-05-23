import React, { useMemo, useRef, useEffect } from 'react'
import { Normal as Button } from '../../../button'
import { useTranslation } from 'react-i18next'

import { ReactComponent as Premium } from '../../../../assets/image/voiceFilterPlayer/premium.svg'
import { ReactComponent as Original } from '../../../../assets/image/voiceFilterPlayer/original.svg'
import { ReactComponent as Human } from '../../../../assets/image/voiceFilterPlayer/human.svg'
import { ReactComponent as Clear } from '../../../../assets/image/voiceFilterPlayer/clear.svg'
import { ReactComponent as Nature } from '../../../../assets/image/voiceFilterPlayer/nature.svg'
import { ReactComponent as Noise } from '../../../../assets/image/voiceFilterPlayer/noise.svg'
import { ReactComponent as Custom } from '../../../../assets/image/voiceFilterPlayer/custom.svg'

import {
  ERASER_VOICE_FILTER_CUSTOM_LOCAL_STORAGE_KEY,
  ERASER_VOICE_FILTER_CUSTOM_ID,
  ERASER_VOICE_FILTER_ORIGINAL_ID
} from '../../../../_constants'
import clsx from 'clsx'
import './Filters.scss'

const Filters = ({
  onClick,
  active,
  is_premium_feature_available,
  introInstance
}) => {
  const { t } = useTranslation()
  const containerRef = useRef(null)
  const activeRef = useRef(null)

  const voiceFilterLocalStorage = localStorage.getItem(
    ERASER_VOICE_FILTER_CUSTOM_LOCAL_STORAGE_KEY
  )
    ? JSON.parse(
        localStorage.getItem(ERASER_VOICE_FILTER_CUSTOM_LOCAL_STORAGE_KEY)
      )
    : undefined

  const FILTERS_DATA = useMemo(
    () => [
      {
        name: 'voice_filter_player.origin',
        icon: Original,
        premium: false,
        id: ERASER_VOICE_FILTER_ORIGINAL_ID,
        values: [100, 100],
        disabled: false
      },
      {
        name: 'voice_filter_player.clear',
        icon: Clear,
        premium: false,
        id: 2,
        values: [80, 20],
        disabled: false
      },
      {
        name: 'voice_filter_player.nature',
        icon: Nature,
        premium: true,
        id: 3,
        values: [60, 40],
        disabled: !is_premium_feature_available
      },
      {
        name: 'voice_filter_player.human',
        icon: Human,
        premium: true,
        id: 1,
        values: [100, 0],
        disabled: !is_premium_feature_available
      },
      {
        name: 'voice_filter_player.noise',
        icon: Noise,
        premium: true,
        id: 4,
        values: [0, 100],
        disabled: !is_premium_feature_available
      },
      {
        name: 'voice_filter_player.custom',
        icon: Custom,
        premium: true,
        id: ERASER_VOICE_FILTER_CUSTOM_ID,
        values: voiceFilterLocalStorage || [50, 50],
        disabled: !is_premium_feature_available
      }
    ],
    [is_premium_feature_available, voiceFilterLocalStorage]
  )

  const handleScrollTo = (element) => {
    const container = containerRef.current
    const containerRect = container.getBoundingClientRect()
    const elementRect = element.getBoundingClientRect()
    const containerCenter = containerRect.width / 2
    const elementCenter = elementRect.width / 2
    const elementOffset = elementRect.left - containerRect.left
    const elementCenterOffset = elementOffset + elementCenter
    const scrollLeft = elementCenterOffset - containerCenter

    container.scrollBy({
      left: scrollLeft,
      behavior: 'smooth'
    })
  }

  const handleClick = ({ id, values }) => {
    onClick({ id, values })
  }

  useEffect(() => {
    const element = activeRef.current
    handleScrollTo(element)
  }, [active])

  return (
    <div
      className="eraser-voice-filter-player__filters"
      ref={(el) => {
        containerRef.current = el
        if (introInstance?.adjustmentActionsContainerRef) {
          const { adjustmentActionsContainerRef } = introInstance
          adjustmentActionsContainerRef.current = el
        }
      }}
    >
      {FILTERS_DATA.map((filter, index) => {
        const { name, icon: Icon, premium, id, values } = filter
        return (
          <Button
            key={index}
            onClick={() => {
              handleClick({ id, values })
            }}
            ref={(el) => {
              if (active.id === id) {
                activeRef.current = el
              }

              if (introInstance?.adjustmentOriginalActionRef) {
                if (id === ERASER_VOICE_FILTER_ORIGINAL_ID) {
                  const { adjustmentOriginalActionRef } = introInstance
                  adjustmentOriginalActionRef.current = el
                }
              }

              if (introInstance?.adjustmentCustomActionRef) {
                if (id === ERASER_VOICE_FILTER_CUSTOM_ID) {
                  const { adjustmentCustomActionRef } = introInstance
                  adjustmentCustomActionRef.current = el
                }
              }
            }}
            className={clsx('eraser-voice-filter-player__filters__item', {
              active: active.id === id
            })}
            disabled={filter.disabled}
          >
            <Icon className="eraser-voice-filter-player__filters__adorn" />
            <span>{t(name)}</span>
            {premium && (
              <Premium className="eraser-voice-filter-player__filters__premium" />
            )}
          </Button>
        )
      })}
    </div>
  )
}

export default Filters
