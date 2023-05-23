import './Video.scss'
import ReactPlayer from 'react-player'
import { ReactComponent as Play } from '../../../../../../../assets/image/landing/filer-demo-app/play.svg'
import { ReactComponent as Pause } from '../../../../../../../assets/image/landing/filer-demo-app/pause.svg'
import VideoSrc from '../../../../../../../assets/video/ne_web_sample.mp4'
import clsx from 'clsx'

const Video = ({
  isPlaying,
  onClick,
  percentage,
  handleSeeking,
  videoRef,
  setPlaying,
  setMediaLoaded,
  handleNoiseStop,
  handleDenoiseStop,
  denoiseControllerRef,
  noiseControllerRef
}) => {
  return (
    <div className="landing-filter-demo-app__video">
      <div
        className="landing-filter-demo-app__video__container"
        onClick={onClick}
      >
        <ReactPlayer
          ref={videoRef}
          playing={isPlaying}
          width="100%"
          height="auto"
          autoPlay={false}
          onReady={() => setMediaLoaded((media) => ({ ...media, video: true }))}
          onEnded={() => {
            handleNoiseStop()
            handleDenoiseStop()
            denoiseControllerRef.current.abort()
            noiseControllerRef.current.abort()
            denoiseControllerRef.current = new AbortController()
            noiseControllerRef.current = new AbortController()
            setPlaying(false)
          }}
          loop={false}
          muted
          playsinline={true}
          controls={false}
          url={VideoSrc}
        />
        {isPlaying ? (
          <Pause className={clsx('landing-filter-demo-app__video__pause')} />
        ) : (
          <Play
            className={clsx('landing-filter-demo-app__video__play', {
              active: !isPlaying
            })}
          />
        )}
      </div>
      <div className="landing-filter-demo-app__video__control">
        <div className="landing-filter-demo-app__video__control__static" />
        <div
          className="landing-filter-demo-app__video__control__progress"
          {...{
            style: {
              width: `calc(${percentage}%)`
            }
          }}
        />
        <div
          className="landing-filter-demo-app__video__control__current"
          {...{
            style: {
              left: `calc(${percentage}%)`
            }
          }}
        />
        <input
          type="range"
          max="100"
          min="1"
          step="1"
          value={percentage}
          onChange={handleSeeking}
        />
      </div>
    </div>
  )
}
export default Video
