import { useTranslation } from 'react-i18next'
import Phone_BG_TW from '../../../../../../../assets/image/landing/filer-demo-app/phone_bg_tw.jpg'
import Phone_BG_TW_2x from '../../../../../../../assets/image/landing/filer-demo-app/phone_bg_tw@2x.jpg'
import Phone_BG_EN from '../../../../../../../assets/image/landing/filer-demo-app/phone_bg_en.jpg'
import Phone_BG_EN_2x from '../../../../../../../assets/image/landing/filer-demo-app/phone_bg_en@2x.jpg'

import './Background.scss'

const Background = () => {
  const { i18n } = useTranslation()
  const isZhTW = i18n.language === 'zh-TW'

  return (
    <div className="landing-filter-demo-app__background">
      <img
        src={isZhTW ? Phone_BG_TW : Phone_BG_EN}
        srcSet={`${isZhTW ? Phone_BG_TW : Phone_BG_EN} 1x, ${
          isZhTW ? Phone_BG_TW_2x : Phone_BG_EN_2x
        } 2x`}
        alt={''}
      />
    </div>
  )
}

export default Background
