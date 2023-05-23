import './Audio.scss'
import Sliders from '../Sliders'
import Filters from '../Filters'
import clsx from 'clsx'
// import useHeight from '../../../../../../../hooks/useHeight'
// import { ERASER_VOICE_FILTER_CUSTOM_ID } from '../../../../../../../_constants'

const Audio = ({ loading, activeFilter, setActiveFilter }) => {
  // const [sizingRef, contentHeight] = useHeight({
  //   on: activeFilter.id === ERASER_VOICE_FILTER_CUSTOM_ID,
  //   reset: true
  // })

  return (
    <div
      className={clsx('landing-filter-demo-app__audio', {
        loading
      })}
    >
      <div className="landing-filter-demo-app__audio__container">
        <Sliders
          {...{
            active: activeFilter,
            setActive: setActiveFilter
            // ref: sizingRef,
            // height: contentHeight
          }}
        />
        <Filters
          {...{
            active: activeFilter,
            setActive: setActiveFilter
          }}
        />
      </div>
    </div>
  )
}

export default Audio
