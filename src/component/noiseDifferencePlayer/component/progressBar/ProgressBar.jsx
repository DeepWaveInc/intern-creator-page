import React, { memo } from 'react'
import './ProgressBar.scss'

const ProgressBar = ({ percentage, handleManuallyUpdateTime, className }) => {
  const handleOnChange = (e) => {
    handleManuallyUpdateTime(e.target.value / 100)
  }

  return (
    <div className="progressBar">
      <div
        className="progressBar__track"
        style={{ maxWidth: `${percentage}%` }}
      />
      <input
        type="range"
        max="100"
        min="0"
        step="0.01"
        value={percentage}
        onChange={handleOnChange}
      />
    </div>
  )
}
export default memo(ProgressBar)
