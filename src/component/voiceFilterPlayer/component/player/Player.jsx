import { useMemo, forwardRef } from 'react'
import { Play } from '../../../button'
import { useTranslation } from 'react-i18next'
import Period from './component/period'
import Wave from './component/wave'
import clsx from 'clsx'
import './Player.scss'

const Player = forwardRef(
  ({ type, onClick, bufferData, duration, percentage, handleSeek }, ref) => {
    const { t, i18n } = useTranslation()
    const lang = useMemo(() => i18n.language, [i18n.language])
    return (
      <div className="eraser-voice-filter-player__player">
        <Play
          {...{
            ref,
            type,
            onClick,
            className: 'eraser-voice-filter-player__player__play'
          }}
        />
        <div className="eraser-voice-filter-player__spectrums">
          <div className="eraser-voice-filter-player__spectrum">
            <div
              className={clsx(
                'eraser-voice-filter-player__spectrum__name',
                lang !== 'zh-TW' && 'en'
              )}
            >
              {t('common.human_voice')}
            </div>
            <div className="eraser-voice-filter-player__spectrum__content">
              <Wave
                {...{
                  bufferData: bufferData.denoise,
                  percentage,
                  handleSeek
                }}
              />
            </div>
          </div>
          <div className="eraser-voice-filter-player__spectrum">
            <div
              className={clsx(
                'eraser-voice-filter-player__spectrum__name',
                lang !== 'zh-TW' && 'en'
              )}
            >
              {t('common.background_noise')}
            </div>
            <div className="eraser-voice-filter-player__spectrum__content">
              <Wave
                {...{
                  bufferData: bufferData.noise,
                  percentage,
                  handleSeek
                }}
              />
              <Period
                {...{
                  currentTime: Math.ceil(percentage * duration) / 100,
                  duration
                }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
)

export default Player
