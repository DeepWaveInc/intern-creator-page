import { useTranslation } from 'react-i18next'
import Trans from '../../../../component/trans'
import './Application.scss'
import { Normal as Button } from '../../../../component/button'

const Application = () => {
  const { t } = useTranslation();

  return (
    <section className="creator-page__application">
      <div className="creator-page__application__container">
        <div className="creator-page__application__text">
          <h1>{t('creator.application.title')}</h1>
          <h3>{t('creator.application.subtitle')}</h3>
          <p>
            <Trans i18nKey="creator.application.description">
              <br />
            </Trans>
          </p>
        </div>
        <div className="creator-page__application__form">
          <form action="" className="creator-page__application__form__content" >
            <div className="creator-page__application__form__block">
              <div className="creator-page__application__form__part">
                <label>{t('creator.form.contact_name.label')}</label>
                <input
                  type="text"
                  name=""
                  placeholder={t('creator.form.input.placeholder')}
                  
                />
                <div className="input-error">
                  {"xxxxxxxxxxx"}
                </div>
              </div>

              <div className="creator-page__application__form__part">
                <label>{t('creator.form.name_of_channel_or_team.label')}</label>
                <input
                  type="text"
                  name=""
                  placeholder={t('creator.form.input.placeholder')}
                />
              </div>
            </div>

            <div className="creator-page__application__form__block">
              <di className="creator-page__application__form__part">
                <label>{t('creator.form.channel_url.label')}</label>
                <input
                  type="text"
                  name=""
                  placeholder={t('creator.form.input.placeholder')}
                />
              </di>

              <div className="creator-page__application__form__part">
                <label>{t('creator.form.email.label')}</label>
                <input
                  type="text"
                  name=""
                  placeholder={t('creator.form.input.placeholder')}
                />
              </div>
            </div>

            <div className="creator-page__application__form__block">
              <div className="creator-page__application__form__part">
                <label>{t('creator.form.country.label')}</label>
                <select name="">
                  <option selected value disabled>
                    {t('creator.form.selector.placeholder')}
                  </option>
                </select>
              </div>

              <div className="creator-page__application__form__part">
                <label>{t('creator.form.language.label')}</label>
                <select name="">
                  <option selected value disabled>
                    {t('creator.form.selector.placeholder')}
                  </option>
                </select>
              </div>
            </div>

            <div className="creator-page__application__form__block">
              <div className="creator-page__application__form__part">
                <label>{t('creator.form.type.label')}</label>
                <select name="">
                  <option selected value disabled>
                    {t('creator.form.selector.placeholder')}
                  </option>
                </select>
              </div>
            </div>

            <div className="creator-page__application__form__block">
              <div className="creator-page__application__form__part">
                <label>{t('creator.form.reason.label')}</label>
                <textarea
                  name=""
                  placeholder={t('creator.form.input.placeholder')}
                ></textarea>
              </div>
            </div>

            <div className="creator-page__application__form__block2">
              <div className="creator-page__application__form__part">
                <label>{t('creator.form.plan.label')}</label>
                <div className="creator-page__application__form__check">
                  <div className="creator-page__application__form__check-part">
                    <input
                      className="creator-page__application__form__checkbox"
                      type="checkbox"
                      name=""
                      value=""
                    />
                    <label className="creator-page__application__form__check-label">
                      {t('creator.form.plan.option.experience')}
                    </label>
                  </div>
                  <div className="creator-page__application__form__check-part">
                    <input
                      className="creator-page__application__form__checkbox"
                      type="checkbox"
                      name=""
                      value=""
                    />
                    <label className="creator-page__application__form__check-label">
                      {t('creator.form.plan.option.purchase')}
                    </label>
                  </div>
                </div>
              </div>

              <div className="creator-page__application__form__part">
                <div className="creator-page__application__form__button-part">
                  <Button
                    className="creator-page__application__form__apply-button"
                    {...{
                      type: 'primary'
                    }}
                  >
                    <span>{t('creator.form.submit')}</span>
                  </Button>
                </div>
              </div>
            </div>
            <p className="creator-page__application__form__button-text">
              {t('creator.form.info')}
            </p>
          </form>
        </div>
        <div className="creator-page__application__circle" />
      </div>
    </section>
  )
}

export default Application
