import Trans from '../../../../../../../component/trans'
import { ReactComponent as AdornLeft } from '../../../../../../../assets/image/landing/award/ear_of_rice_left.svg'
import { ReactComponent as AdornRight } from '../../../../../../../assets/image/landing/award/ear_of_rice_right.svg'
import './Award.scss'

const Award = ({ link, title }) => {
  const handleOnClick = () => {
    window.open(link, '_blank', 'noopener=yes,noreferrer=yes')
  }

  return (
    <div className="landing-awards__award" {...{ onClick: handleOnClick }}>
      <AdornLeft className="landing-awards__award__adorn--left" />
      <div className="landing-awards__award__content">
        <p>
          <Trans i18nKey={title}>
            <br />
          </Trans>
        </p>
      </div>
      <AdornRight className="landing-awards__award__adorn--right" />
    </div>
  )
}

export default Award
