import { useTranslation } from 'react-i18next'
import Trans from '../../../../component/trans'
import './Application.scss'
import { Normal as Button } from '../../../../component/button'

import { useForm } from "react-hook-form";

const Application = () => {
  const { t } = useTranslation();
  
  
  const {
    register,
    handleSubmit,
    
    
    formState: { errors }
  } = useForm();

    const onSubmit = (data) => {

      console.log(data);
    };
  

  

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
          <form
          onSubmit={handleSubmit (onSubmit)} 
          action="" 
          className="creator-page__application__form__content" 
          >
            <div className="creator-page__application__form__block">
              <div className="creator-page__application__form__part">
                <label for="contact_name" >{t('creator.form.contact_name.label')}</label>
                <input
                  type="text"
                  name=""
                  placeholder={t('creator.form.input.placeholder')}
                  id="contact_name"
                  {...register("contact_name", { required: true })}
                  className={errors.contact_name ? 'error' : ''}
                  
                />
                <div className="creator-page__application__form__error">
                {errors.contact_name && <p>This field is required</p>}
                </div>
              </div>

              <div className="creator-page__application__form__part">
                <label for="name_of_channel_or_team">{t('creator.form.name_of_channel_or_team.label')}</label>
                <input
                  type="text"
                  name=""
                  placeholder={t('creator.form.input.placeholder')}
                  id="name_of_channel_or_team"
                  {...register("name_of_channel_or_team", { required: true })}
                  className={errors.name_of_channel_or_team ? 'error' : ''}
                />
                <div className="creator-page__application__form__error">
                {errors.name_of_channel_or_team && <p>This field is required</p>}
                </div>
              </div>
              
            </div>

            <div className="creator-page__application__form__block">
              <div className="creator-page__application__form__part">
                <label for="channel_url">{t('creator.form.channel_url.label')}</label>
                <input
                  type="text"
                  name=""
                  placeholder={t('creator.form.input.placeholder')}
                  id="channel_url"
                  {...register("channel_url", { required: true })}
                  className={errors.channel_url ? 'error' : ''}
                />
                <div className="creator-page__application__form__error">
                {errors.channel_url && <p>This field is required</p>}
                </div>
              </div>
              

              <div className="creator-page__application__form__part">
                <label for="email">{t('creator.form.email.label')}</label>
                <input
                  type="text"
                  name=""
                  placeholder={t('creator.form.input.placeholder')}
                  id="email"
                  {...register("email", { required: true })}
                  className={errors.email ? 'error' : ''}
                />
                <div className="creator-page__application__form__error">
                {errors.email && <p>This field is required</p>}
                </div>
              </div>
            </div>

            <div className="creator-page__application__form__block">
              <div className="creator-page__application__form__part">
                <label >{t('creator.form.country.label')}</label>
                <select
                    name=""
                    id="country"
                    {...register('country', { required: true })}
                    className={errors.country ? 'error' : ''}
                  >
                  <option selected value disabled  >
                    {t('creator.form.selector.placeholder')}
                  </option>
                </select>
                <div className="creator-page__application__form__error">
                {errors.country && <p>This field is required</p>}
                </div>
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
                <label for="reason" >{t('creator.form.reason.label')}</label>
                <textarea
                  name=""
                  placeholder={t('creator.form.input.placeholder')}
                  id="reason"
                  {...register("reason", { required: true })}
                  className={errors.reason ? 'error' : ''}
                ></textarea>
                <div className="creator-page__application__form__error">
                {errors.reason && <p>This field is required</p>}
                </div>
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
                      name="experience"
                      id="check_experience"
                      {...register('experience', { required: true })}
                    />
                    <label for="check_experience" className="creator-page__application__form__check-label">
                      {t('creator.form.plan.option.experience')}
                    </label>
                  </div>
                  <div className="creator-page__application__form__check-part">
                  <input
                      className="creator-page__application__form__checkbox"
                      type="checkbox"
                      name="purchase"
                      id="check_purchase"
                      {...register('purchase', { required: true })}
                    />
                    <label for="check_purchase" className="creator-page__application__form__check-label">
                      {t('creator.form.plan.option.purchase')}
                    </label>
                  </div>
                </div>
                {errors.experience && errors.purchase ? (
                  <div className="creator-page__application__form__error">
                    <p>This field is required</p>
                  </div>
                ) : null}
              </div>

              <div className="creator-page__application__form__part">
                <div className="creator-page__application__form__button-part">
                  <Button type="submit"
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
        
      </div>
      <div className="creator-page__application__circle" />
    </section>
  )
}

export default Application
