import './StepsContainer.scss'
import { useTranslation } from 'react-i18next'
import Trans from '../../../../../../../component/trans'
import clsx from 'clsx'

const StepItem = ({ id, title, description, index, active, onMouseOver }) => {
  const { t } = useTranslation()
  return (
    <div
      className="landing-steps__steps-container__item"
      key={id}
      onMouseOver={() => {
        onMouseOver(id)
      }}
    >
      <i
        className={clsx('landing-steps__steps-container__item__dot', {
          active
        })}
      />
      <p>{`Step ${index + 1}`}</p>
      <h3>
        <Trans i18nKey={title}>
          <br />
        </Trans>
      </h3>
      <span>{t(description)}</span>
    </div>
  )
}

const StepsContainer = ({ steps = [], currentStep = 0, onMouseOver }) => {
  return (
    <div className="landing-steps__steps-container">
      {steps.map(({ id, title, subtitle, description }, index) => (
        <StepItem
          key={id}
          {...{
            id,
            title,
            description,
            active: currentStep >= index,
            index,
            onMouseOver
          }}
        />
      ))}
    </div>
  )
}

export default StepsContainer
