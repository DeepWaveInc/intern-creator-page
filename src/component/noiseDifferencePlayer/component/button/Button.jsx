import React, { memo } from 'react'
import { BUTTON_TYPE } from '../../asset/constant'
import './Button.scss'

const Button = ({ type = BUTTON_TYPE.PLAY, onClick }) => {
  return <button className="button" type={type} onClick={onClick} />
}

export default memo(Button)
