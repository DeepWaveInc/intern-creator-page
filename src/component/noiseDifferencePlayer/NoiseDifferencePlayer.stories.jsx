import React, { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import NoiseDifferencePlayer from './NoiseDifferencePlayer'
import peru1 from '../../assets/audio/peru/Noisy.mp3'
import peru2 from '../../assets/audio/peru/Enhanced.mp3'
import airport1 from '../../assets/audio/airport/Noisy.mp3'
import airport2 from '../../assets/audio/airport/Enhanced.mp3'
import typhoon1 from '../../assets/audio/typhoon/Noisy.mp3'
import typhoon2 from '../../assets/audio/typhoon/Enhanced.mp3'
import interview1 from '../../assets/audio/namewee/Noisy.mp3'
import interview2 from '../../assets/audio/namewee/Enhanced.mp3'
import police1 from '../../assets/audio/police/Noisy.mp3'
import police2 from '../../assets/audio/police/Enhanced.mp3'

export default {
  title: 'component/NoiseDifferencePlayer',
  component: NoiseDifferencePlayer
}

const Template = (args) => {
  const { t } = useTranslation()
  const tracks = useMemo(
    () => [
      {
        id: 1,
        name: t('home.demo.track_1'),
        noisy: peru1,
        enhanced: peru2,
        long: '00:12'
      },
      {
        id: 2,
        name: t('home.demo.track_2'),
        noisy: airport1,
        enhanced: airport2,
        long: '00:16'
      },
      {
        id: 3,
        name: t('home.demo.track_3'),
        noisy: typhoon1,
        enhanced: typhoon2,
        long: '00:53'
      },
      {
        id: 4,
        name: t('home.demo.track_4'),
        noisy: interview1,
        enhanced: interview2,
        long: '00:52'
      },
      {
        id: 5,
        name: t('home.demo.track_5'),
        noisy: police1,
        enhanced: police2,
        long: '00:58'
      }
    ],
    [t]
  )
  const [activeTrackId, setActiveTrackId] = useState(1)
  const handleSetActiveTrack = (id) => setActiveTrackId(id)
  return (
    <NoiseDifferencePlayer
      {...{ ...args, tracks, activeTrackId, handleSetActiveTrack }}
    />
  )
}

export const Default = Template.bind({})

Default.args = {
  tracks: [],
  activeTrackId: 1,
  showDefaultList: true,
  handleSetActiveTrack: () => {},
  className: '',
  switchOnLabel: '',
  switchOffLabel: '',
  switchOnCallback: () => {},
  switchOffCallback: () => {},
  progressType: 'wave'
}
