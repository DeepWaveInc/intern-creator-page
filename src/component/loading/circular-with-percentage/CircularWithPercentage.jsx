import './CircularWithPercentage.scss'

const CircularWithPercentage = ({
  size = 20,
  percentage = 0,
  borderWidth = 6
}) => {
  return (
    <div
      className="hullaballoo-loading-circular-with-percentage"
      style={{
        '--size': `${size}px`,
        '--border-width': `${borderWidth}px`,
        '--percentage': percentage
      }}
    >
      <div className="hullaballoo-loading-circular-with-percentage__inner" />
    </div>
  )
}

export default CircularWithPercentage
