import './Period.scss'
import { durationToMinSec } from '../../../../../../_helpers'

const Period = ({ duration, currentTime }) => {
  return (
    <div className="eraser-voice-filter-player__period">
      <span>{durationToMinSec(currentTime)}</span>
      <span>{durationToMinSec(duration)}</span>
    </div>
  )
}

export default Period
