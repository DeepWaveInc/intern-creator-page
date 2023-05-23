import React from 'react'
import Loading from '../loading'
import './Player.scss'

const Player = ({ children, showLoading }) => {
  return (
    <div className="player">
      {showLoading && <Loading />}
      {children}
    </div>
  )
}

export default Player
