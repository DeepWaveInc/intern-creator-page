/* eslint-disable react/jsx-pascal-case */
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import Trans from '../../../../../component/trans'
import useAnimations from './useAnimation'
import { a } from '@react-spring/web'
import { useIsMobileLayout } from '../../../../../hooks'
import { ReactComponent as Crown } from '../../../../../assets/image/landing/pricing/crown.svg'
import { ReactComponent as Triangle } from '../../../../../assets/image/landing/pricing/triangle.svg'
import { ReactComponent as FreeTrailIcon_0 } from '../../../../../assets/image/landing/pricing/compare_free_trail_0.svg'
import { ReactComponent as FreeTrailIcon_1 } from '../../../../../assets/image/landing/pricing/compare_free_trail_1.svg'
import { ReactComponent as FreeTrailIcon_2 } from '../../../../../assets/image/landing/pricing/compare_free_trail_2.svg'
import { ReactComponent as FreeTrailIcon_3 } from '../../../../../assets/image/landing/pricing/compare_free_trail_3.svg'
import { ReactComponent as FreeTrailIcon_5 } from '../../../../../assets/image/landing/pricing/compare_free_trail_5.svg'
import { ReactComponent as ProfessionalIcon_0 } from '../../../../../assets/image/landing/pricing/compare_professional_0.svg'
import { ReactComponent as ProfessionalIcon_1 } from '../../../../../assets/image/landing/pricing/compare_professional_1.svg'
import { ReactComponent as ProfessionalIcon_2 } from '../../../../../assets/image/landing/pricing/compare_professional_2.svg'
import { ReactComponent as ProfessionalIcon_4 } from '../../../../../assets/image/landing/pricing/compare_professional_4.svg'
import { ReactComponent as ProfessionalIcon_5 } from '../../../../../assets/image/landing/pricing/compare_professional_5.svg'
import clsx from 'clsx'
import './Pricing.scss'

const TYPES = {
  CATEGORY: 'category',
  FREE_TRAIL: 'free-trail',
  PROFESSIONAL: 'professional'
}

const COMPARE_CATEGORIES_LENGTH = 7

const Pricing = () => {
  const { t } = useTranslation()

  const { isMobileLayout } = useIsMobileLayout()
  const {
    circleInViewRef,
    circleSlideIn,
    titleInViewRef,
    titleSlideIn,
    contentInViewRef,
    contentSlideIn
  } = useAnimations()

  const data = useMemo(
    () => [
      {
        header: '',
        type: TYPES.CATEGORY,
        child: Array.from(Array(COMPARE_CATEGORIES_LENGTH), (_, index) => (
          <Trans i18nKey={`compare.category_${index}`}>
            {isMobileLayout ? <br /> : <i></i>}
          </Trans>
        ))
      },
      {
        header: t('compare.header.free'),
        type: TYPES.FREE_TRAIL,
        child: [
          <div key="compare.content.free_0">
            {isMobileLayout && <FreeTrailIcon_0 />}
            <span>
              {t(
                isMobileLayout
                  ? 'compare.content.free_0.m'
                  : 'compare.content.free_0'
              )}
            </span>
          </div>,
          <div key="compare.content.free_1">
            {isMobileLayout && <FreeTrailIcon_1 />}
            <span>
              {t(
                isMobileLayout
                  ? 'compare.content.free_1.m'
                  : 'compare.content.free_1'
              )}
            </span>
          </div>,
          <div key="compare.content.free_2">
            {isMobileLayout && <FreeTrailIcon_2 />}
            <span>
              {t(
                isMobileLayout
                  ? 'compare.content.free_2.m'
                  : 'compare.content.free_2'
              )}
            </span>
          </div>,
          <div key="compare.content.free_3">
            {isMobileLayout && <FreeTrailIcon_3 />}
            <span>
              {t(
                isMobileLayout
                  ? 'compare.content.free_3.m'
                  : 'compare.content.free_3'
              )}
            </span>
          </div>,
          <div key="compare.content.free_4">
            {isMobileLayout && <FreeTrailIcon_1 />}
            <span>
              {t(
                isMobileLayout
                  ? 'compare.content.free_4.m'
                  : 'compare.content.free_4'
              )}
            </span>
          </div>,
          <div key="compare.content.free_5">
            {isMobileLayout && <FreeTrailIcon_5 />}
            <span>
              {t(
                isMobileLayout
                  ? 'compare.content.free_5.m'
                  : 'compare.content.free_5'
              )}
            </span>
          </div>,
          <div key="compare.content.free_6">{t('compare.content.free_6')}</div>
        ]
      },
      {
        header: t('compare.header.premium'),
        type: TYPES.PROFESSIONAL,
        child: [
          <div key="compare.content.premium_0">
            {isMobileLayout && <ProfessionalIcon_0 />}
            <span>{t('compare.content.premium_0')}</span>
          </div>,
          <div key="compare.content.premium_1">
            {isMobileLayout && <ProfessionalIcon_1 />}
            <span>{t('compare.content.premium_1')}</span>
          </div>,
          <div key="compare.content.premium_2">
            {isMobileLayout && <ProfessionalIcon_2 />}
            <span>{t('compare.content.premium_2')}</span>
          </div>,
          <div key="compare.content.premium_3">
            {isMobileLayout && <ProfessionalIcon_2 />}
            <span>{t('compare.content.premium_3')}</span>
          </div>,
          <div key="compare.content.premium_4">
            {isMobileLayout && <ProfessionalIcon_4 />}
            <span>{t('compare.content.premium_4')}</span>
          </div>,
          <div key="compare.content.premium_5">
            {isMobileLayout && <ProfessionalIcon_5 />}
            <span>{t('compare.content.premium_5')}</span>
          </div>,
          <div key="compare.content.premium_6">
            <Trans i18nKey="compare.content.premium_6">
              <br />
            </Trans>
          </div>
        ]
      }
    ],
    [t, isMobileLayout]
  )

  return (
    <section className="landing-pricing">
      <a.div
        className="landing-pricing__circle"
        ref={circleInViewRef}
        style={circleSlideIn}
      />
      <div className="landing-pricing__container">
        <a.div
          className="landing-pricing__compare-title"
          ref={titleInViewRef}
          style={titleSlideIn}
        >
          <h2>
            <Trans i18nKey="lading.pricing.title">
              <br />
            </Trans>
          </h2>
          <p>{t('lading.pricing.description')}</p>
        </a.div>
        <a.div
          className="landing-pricing__compare-container"
          ref={contentInViewRef}
          style={contentSlideIn}
        >
          {data.map((item, index) => {
            const { header, child = [], type = TYPES.CATEGORY } = item
            return (
              <div
                className={clsx(
                  'landing-pricing__compare-container__item-wrapper',
                  type
                )}
                key={index}
              >
                <div className="landing-pricing__compare-container__item-head">
                  <div>
                    {type === TYPES.PROFESSIONAL && <Crown />}
                    <h3>{header}</h3>
                  </div>
                  {type !== TYPES.CATEGORY && <Triangle />}
                </div>
                {child.map((content, index) => (
                  <div
                    className="landing-pricing__compare-container__content-wrapper"
                    key={index}
                  >
                    {content}
                  </div>
                ))}
              </div>
            )
          })}
        </a.div>
      </div>
    </section>
  )
}

export default Pricing
