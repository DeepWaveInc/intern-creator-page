import React from 'react'
import PhoneImage from '../../../../../assets/image/landing/phone/phone_container.png'
import PhoneImage2x from '../../../../../assets/image/landing/phone/phone_container_2x.png'
import { ReactComponent as Adorn } from '../../../../../assets/image/landing/phone/notch.svg'
import './Phone.scss'

const Phone = ({ children }) => {
  return (
    <div className="phone-container">
      <div className="phone-container__background">
        <img
          src={PhoneImage}
          srcSet={`${PhoneImage} 1x, ${PhoneImage2x} 2x`}
          alt="phone_background"
        />
      </div>
      <div className="phone-container__content">{children}</div>
      <Adorn className="phone-container__adorn" />
    </div>
  )
}

export default Phone
