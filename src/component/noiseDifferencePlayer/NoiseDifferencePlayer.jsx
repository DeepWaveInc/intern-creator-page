import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import List from './component/list'
import Player from './component/player'
import Switch from './component/switch'
import Animation from './component/animation'
import Control from './component/control'
import clsx from 'clsx'
import { DEFAULT_TRACK } from './asset/constant'
import './NoiseDifferencePlayer.scss'

const NoiseDifferencePlayer = (props) => {
  const { t } = useTranslation()
  const {
    tracks,
    activeTrackId = DEFAULT_TRACK,
    showDefaultList = true,
    handleSetActiveTrack = () => {},
    className,
    switchOnLabel,
    switchOffLabel,
    switchOnCallback,
    switchOffCallback,
    isPlayAllTracks
  } = props
  const [isPlayAreaLoading, setPlayAreaLoading] = useState(false)
  const [isDenoised, setIsDenoised] = useState(false)
  const [isPlaying, setPlaying] = useState(false)

  const currentTrack = useMemo(
    () => tracks.find((item) => item.id === activeTrackId),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeTrackId, t, tracks]
  )

  const switchTrigger = (value) => {
    if (value) {
      if (typeof switchOnCallback === 'function') switchOnCallback(currentTrack)
    } else {
      if (typeof switchOffCallback === 'function')
        switchOffCallback(currentTrack)
    }
    setIsDenoised(value)
  }

  return (
    <div className={clsx('noise-difference-player', className)}>
      {showDefaultList && (
        <List
          {...{
            tracks,
            activeTrackId,
            handleSetActiveTrack
          }}
        />
      )}
      <Player
        {...{
          showLoading: isPlayAreaLoading
        }}
      >
        <Switch
          {...{
            switchOnLabel,
            switchOffLabel,
            switchTrigger,
            isDenoised
          }}
        />
        <Animation
          {...{
            isDenoised,
            isPlaying,
            activeTrackId,
            showDefaultList
          }}
        />
        <Control
          {...{
            isPlaying,
            setPlaying,
            isDenoised,
            currentTrack,
            isPlayAllTracks,
            setPlayAreaLoading
          }}
        />
      </Player>
    </div>
  )
}

NoiseDifferencePlayer.propTypes = {
  tracks: PropTypes.array.isRequired,
  activeTrackId: PropTypes.number,
  showDefaultList: PropTypes.bool,
  handleSetActiveTrack: PropTypes.func,
  className: PropTypes.string,
  switchOnLabel: PropTypes.string,
  switchOffLabel: PropTypes.string,
  switchOnCallback: PropTypes.func,
  switchOffCallback: PropTypes.func,
  playCallback: PropTypes.func,
  progressType: PropTypes.oneOf(['bar', 'wave']),
  isPlayAllTrack: PropTypes.bool
}

export default NoiseDifferencePlayer
