import { useTranslation } from 'react-i18next'
import Trans from '../../../../component/trans'
import { ReactComponent as MoneyIcon } from '../../../../assets/image/creator/plan/moneyicon.svg'
import { ReactComponent as BulbIcon } from '../../../../assets/image/creator/plan/bulbicon.svg'
import { ReactComponent as BlueArc } from '../../../../assets/image/creator/plan/bluearc.svg'
import { ReactComponent as YellowArc } from '../../../../assets/image/creator/plan/yellowarc.svg'
import { ReactComponent as YellowTriangle } from '../../../../assets/image/creator/plan/yellowtriangle.svg'
import './Plan.scss'

const Plan = () => {
  const { t } = useTranslation()
  return (
    <section className="creator-page__plan">
      <div className="creator-page__plan__container">
        <div className="creator-page__plan__creator-plan">
          <div className="creator-page__plan__creator-plan__context">
            <span className="creator-page__plan__creator-plan__title">
              {t('creator.plan.title')}
            </span>
            <div className="creator-page__plan__creator-plan__bar" />
            <p className="creator-page__plan__creator-plan__text">
              <Trans i18nKey="creator.plan.description">
                <br />
              </Trans>
            </p>
          </div>
        </div>

        <div className="creator-page__plan__creator-promote">
          <BlueArc className="creator-page__plan__creator-promote__blue-arc" />
          <div className="creator-page__plan__creator-promote__context">
            <span className="creator-page__plan__creator-promote__title">
              {t('creator.plan.creator_promote.title')}
            </span>
            <div className="creator-page__plan__creator-promote__bar" />
            <p className="creator-page__plan__creator-promote__text">
              {t('creator.plan.creator_promote.description')}
            </p>
          </div>
          <MoneyIcon className="creator-page__plan__creator-promote__icon" />
        </div>

        <div className="creator-page__plan__creator-experience">
          <YellowArc className="creator-page__plan__creator-experience__yellow-arc" />
          <YellowTriangle className="creator-page__plan__creator-experience__yellow-triangle" />
          <div className="creator-page__plan__creator-experience__context">
            <span className="creator-page__plan__creator-experience__title">
              {t('creator.plan.creator_experience.title')}
            </span>
            <div className="creator-page__plan__creator-experience__bar"></div>
            <p className="creator-page__plan__creator-experience__text">
              {t('creator.plan.creator_experience.description_1')}
            </p>
            <p className="creator-page__plan__creator-experience__text2">
              {t('creator.plan.creator_experience.description_2')}
            </p>
          </div>
          <BulbIcon className="creator-page__plan__creator-experience__icon" />
        </div>
      </div>
    </section>
  )
}

export default Plan
