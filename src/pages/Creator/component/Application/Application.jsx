import { useTranslation } from 'react-i18next'
import Trans from '../../../../component/trans'
import './Application.scss'
import { Normal as Button } from '../../../../component/button'
<<<<<<< HEAD
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

  
=======
import React, { useRef } from 'react'

const Application = () => {
  const { t } = useTranslation()
  const inputRefs = useRef([])

  const handleLabelClick = (index) => {
    inputRefs.current[index].focus()
  }
>>>>>>> 7a97546e24c68be24297850a88145243e1f761ac

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
<<<<<<< HEAD
          <form
          onSubmit={handleSubmit (onSubmit)} 
          action="" 
          className="creator-page__application__form__content" 
          >
            <div className="creator-page__application__form__block">
              <div className="creator-page__application__form__part">
                <label for="contact_name" >{t('creator.form.contact_name.label')}</label>
=======
          <form action="" className="creator-page__application__form__content">
            <div className="creator-page__application__form__block">
              <div className="creator-page__application__form__part">
                <label onClick={() => handleLabelClick(0)}>
                  {t('creator.form.contact_name.label')}
                </label>
>>>>>>> 7a97546e24c68be24297850a88145243e1f761ac
                <input
                  type="text"
                  name=""
                  placeholder={t('creator.form.input.placeholder')}
<<<<<<< HEAD
                  id="contact_name"
                  {...register("contact_name", { required: true })}
                  
                />
                <div className="creator-page__application__form__error">
                {errors.contact_name && <p>This field is required</p>}
                </div>
              </div>

              <div className="creator-page__application__form__part">
                <label for="name_of_channel_or_team">{t('creator.form.name_of_channel_or_team.label')}</label>
=======
                  ref={(ref) => (inputRefs.current[0] = ref)}
                />
                <div className="input-error"></div>
              </div>

              <div className="creator-page__application__form__part">
                <label onClick={() => handleLabelClick(1)}>
                  {t('creator.form.name_of_channel_or_team.label')}
                </label>
>>>>>>> 7a97546e24c68be24297850a88145243e1f761ac
                <input
                  type="text"
                  name=""
                  placeholder={t('creator.form.input.placeholder')}
                  id="name_of_channel_or_team"
                  {...register("name_of_channel_or_team", { required: true })}
                />
                <div className="creator-page__application__form__error">
                {errors.name_of_channel_or_team && <p>This field is required</p>}
                </div>
              </div>
              
            </div>

            <div className="creator-page__application__form__block">
              <div className="creator-page__application__form__part">
<<<<<<< HEAD
                <label for="channel_url">{t('creator.form.channel_url.label')}</label>
=======
                <label onClick={() => handleLabelClick(2)}>
                  {t('creator.form.channel_url.label')}
                </label>
>>>>>>> 7a97546e24c68be24297850a88145243e1f761ac
                <input
                  type="text"
                  name=""
                  placeholder={t('creator.form.input.placeholder')}
                  id="channel_url"
                  {...register("channel_url", { required: true })}
                />
<<<<<<< HEAD
                <div className="creator-page__application__form__error">
                {errors.channel_url && <p>This field is required</p>}
                </div>
              </div>
              

              <div className="creator-page__application__form__part">
                <label for="email">{t('creator.form.email.label')}</label>
=======
              </div>

              <div className="creator-page__application__form__part">
                <label onClick={() => handleLabelClick(3)}>
                  {t('creator.form.email.label')}
                </label>
>>>>>>> 7a97546e24c68be24297850a88145243e1f761ac
                <input
                  type="text"
                  name=""
                  placeholder={t('creator.form.input.placeholder')}
                  id="email"
                  {...register("email", { required: true })}
                />
                <div className="creator-page__application__form__error">
                {errors.email && <p>This field is required</p>}
                </div>
              </div>
            </div>

            <div className="creator-page__application__form__block">
              <div className="creator-page__application__form__part">
<<<<<<< HEAD
                <label >{t('creator.form.country.label')}</label>
                <select name="" {...register("country", { required: true })}>
                  <option selected value disabled>
=======
                <label>{t('creator.form.country.label')}</label>
                <select name="">
                  <option value disabled>
>>>>>>> 7a97546e24c68be24297850a88145243e1f761ac
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
                  <option value disabled>
                    {t('creator.form.selector.placeholder')}
                  </option>
                </select>
              </div>
            </div>

            <div className="creator-page__application__form__block">
              <div className="creator-page__application__form__part">
                <label>{t('creator.form.type.label')}</label>
                <select name="">
                  <option value disabled>
                    {t('creator.form.selector.placeholder')}
                  </option>
                </select>
              </div>
            </div>

            <div className="creator-page__application__form__block">
              <div className="creator-page__application__form__part">
<<<<<<< HEAD
                <label for="reason" >{t('creator.form.reason.label')}</label>
=======
                <label onClick={() => handleLabelClick(4)}>
                  {t('creator.form.reason.label')}
                </label>
>>>>>>> 7a97546e24c68be24297850a88145243e1f761ac
                <textarea
                  name=""
                  placeholder={t('creator.form.input.placeholder')}
                  id="reason"
                  {...register("reason", { required: true })}
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
                      name=""
                      value=""
                      id="check_experience"
                    />
                    <label for="check_experience" className="creator-page__application__form__check-label">
                      {t('creator.form.plan.option.experience')}
                    </label>
                  </div>
                  <div className="creator-page__application__form__check-part">
                    <input
                      className="creator-page__application__form__checkbox"
                      type="checkbox"
                      name=""
                      value=""
                      id="check_purchase"
                    />
                    <label for="check_purchase" className="creator-page__application__form__check-label">
                      {t('creator.form.plan.option.purchase')}
                    </label>
                  </div>
                </div>
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
        <div className="creator-page__application__circle" />
      </div>
    </section>
  )
}

export default Application
