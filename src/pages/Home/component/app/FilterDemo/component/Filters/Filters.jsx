import { useMemo, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import './Filters.scss'

import { ReactComponent as Premium } from '../../../../../../../assets/image/voiceFilterPlayer/premium.svg'
import { ReactComponent as Original } from '../../../../../../../assets/image/voiceFilterPlayer/original.svg'
import { ReactComponent as Human } from '../../../../../../../assets/image/voiceFilterPlayer/human.svg'
import { ReactComponent as Clear } from '../../../../../../../assets/image/voiceFilterPlayer/clear.svg'
import { ReactComponent as Nature } from '../../../../../../../assets/image/voiceFilterPlayer/nature.svg'
import { ReactComponent as Noise } from '../../../../../../../assets/image/voiceFilterPlayer/noise.svg'
import { ReactComponent as Custom } from '../../../../../../../assets/image/voiceFilterPlayer/custom.svg'
import clsx from 'clsx'

import {
  ERASER_VOICE_FILTER_CUSTOM_LOCAL_STORAGE_KEY,
  ERASER_VOICE_FILTER_CUSTOM_ID
} from '../../../../../../../_constants'

const Filters = ({ active, setActive }) => {
  const { t, i18n } = useTranslation()
  const isZhTW = i18n.language === 'zh-TW'
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
        id: 0,
        values: [100, 100]
      },
      {
        name: 'voice_filter_player.clear',
        icon: Clear,
        premium: false,
        id: 2,
        values: [80, 20]
      },
      {
        name: 'voice_filter_player.nature',
        icon: Nature,
        premium: true,
        id: 3,
        values: [60, 40]
      },
      {
        name: 'voice_filter_player.human',
        icon: Human,
        premium: true,
        id: 1,
        values: [100, 0]
      },
      {
        name: 'voice_filter_player.noise',
        icon: Noise,
        premium: true,
        id: 4,
        values: [0, 100]
      },
      {
        name: 'voice_filter_player.custom',
        icon: Custom,
        premium: true,
        id: ERASER_VOICE_FILTER_CUSTOM_ID,
        values: voiceFilterLocalStorage || [100, 100]
      }
    ],
    [voiceFilterLocalStorage]
  )

  const handleScrollTo = (element) => {
    if (containerRef.current && element) {
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
  }

  const handleClick = ({ id, values }) => {
    setActive({ id, values })
  }

  useEffect(() => {
    const element = activeRef?.current
    handleScrollTo(element)
  }, [active])

  return (
    <div
      className={clsx('landing-filter-demo-app__filters', isZhTW ? 'tw' : 'en')}
      ref={(el) => {
        containerRef.current = el
      }}
    >
      {FILTERS_DATA.map((filter, index) => {
        const { name, icon: Icon, premium, id, values } = filter
        return (
          <div
            className={clsx('landing-filter-demo-app__filters__filter', {
              active: active.id === id
            })}
            key={index}
            onClick={() => {
              handleClick({ id, values })
            }}
            ref={(el) => {
              active.id === id && (activeRef.current = el)
            }}
          >
            <div>
              <Icon className="landing-filter-demo-app__filters__filter__icon" />
              {premium && (
                <Premium className="landing-filter-demo-app__filters__filter__premium" />
              )}
            </div>
            <span>{t(name)}</span>
          </div>
        )
      })}
    </div>
  )
}

export default Filters
