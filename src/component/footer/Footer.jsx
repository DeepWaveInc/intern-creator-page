import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ReactComponent as FacebookIcon } from '../../assets/image/icons/facebook.svg'
import { ReactComponent as MediumIcon } from '../../assets/image/icons/medium.svg'
import { ReactComponent as LinkedinIcon } from '../../assets/image/icons/linkedin.svg'
import { ReactComponent as AppleStoreIcon } from '../../assets/image/icons/apple_store_white.svg'
import { ReactComponent as GooglePlayIcon } from '../../assets/image/icons/google_play_white.svg'
import { sendGAEvent } from '../../_helpers'
import clsx from 'clsx'
import {
  FACEBOOK_LINK,
  MEDIUM_LINK,
  LINKEDIN_LINK,
  APP_LINKS,
  SOVIA_URL,
  NOISE_ERASER_PRODUCT_URL,
  DEEPWAVE_CONTACT,
  DWAVE_OFFICIAL_URL
} from '../../_constants'
import './Footer.scss'

const Footer = ({ className }) => {
  const { t, i18n } = useTranslation()

  const isZhTW = i18n.language === 'zh-TW'

  const items = useMemo(
    () => [
      {
        id: 0,
        title: 'footer.deep_wave',
        children: [
          {
            name: 'footer.about',
            href: `${DWAVE_OFFICIAL_URL}${isZhTW ? '/' : '/en/'}about`,
            outLink: true,
            icon: null,
            onClick: () => {
              sendGAEvent('footer', 'click', 'btn_about')
            }
          },
          {
            name: 'footer.technologies',
            href: `${DWAVE_OFFICIAL_URL}${isZhTW ? '/' : '/en/'}solutions`,
            outLink: true,
            icon: null,
            onClick: null
          },
          {
            name: 'footer.career',
            href: `${DWAVE_OFFICIAL_URL}${isZhTW ? '/' : '/en/'}jobs`,
            outLink: true,
            icon: null,
            onClick: null
          },
          {
            name: 'footer.news',
            href: `${DWAVE_OFFICIAL_URL}${isZhTW ? '/' : '/en/'}news`,
            outLink: true,
            icon: null,
            onClick: null
          }
        ]
      },
      {
        id: 1,
        title: 'footer.products',
        children: [
          {
            name: 'common.sovia',
            href: SOVIA_URL,
            outLink: true,
            icon: null,
            onClick: null
          },
          {
            name: 'common.noise_eraser',
            href: `${NOISE_ERASER_PRODUCT_URL}${isZhTW ? '' : '/en'}`,
            outLink: true,
            icon: null,
            onClick: null
          }
        ]
      },
      {
        id: 2,
        title: 'footer.service',
        children: [
          {
            name: 'footer.faq',
            href: `${DWAVE_OFFICIAL_URL}${isZhTW ? '/' : '/en/'}faq`,
            outLink: true,
            icon: null,
            onClick: () => {
              sendGAEvent('footer', 'click', 'btn_FAQ')
            }
          },
          {
            name: 'footer.privacy',
            href: `${DWAVE_OFFICIAL_URL}${isZhTW ? '/' : '/en/'}privacy-policy`,
            outLink: true,
            icon: null,
            onClick: null
          },
          {
            name: 'footer.terms',
            href: `${DWAVE_OFFICIAL_URL}${isZhTW ? '/' : '/en/'}terms`,
            outLink: true,
            icon: null,
            onClick: null
          },
          {
            name: 'footer.contact',
            href: DEEPWAVE_CONTACT,
            outLink: true,
            icon: null,
            onClick: null
          }
        ]
      },
      {
        id: 3,
        title: 'common.social_media',
        children: [
          {
            name: 'common.facebook',
            href: FACEBOOK_LINK,
            outLink: true,
            icon: FacebookIcon,
            onClick: null
          },
          {
            name: 'common.medium',
            href: MEDIUM_LINK,
            outLink: true,
            icon: MediumIcon,
            onClick: null
          },
          {
            name: 'common.linkedin',
            href: LINKEDIN_LINK,
            outLink: true,
            icon: LinkedinIcon,
            onClick: null
          }
        ]
      }
    ],
    [isZhTW]
  )

  const handleOnClick = (link) => {
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  return (
    <footer className={clsx(className)}>
      <div className="footer__container">
        {items.map((item) => (
          <section key={item.id}>
            <div className={clsx('footer__item__title')}>{t(item.title)}</div>
            <ul className="footer__item__container">
              {item.children.map((child, index) => (
                <li key={index}>
                  {child.outLink ? (
                    <a
                      href={child.href}
                      rel="noopener noreferrer"
                      target="_blank"
                      onClick={child.onClick}
                    >
                      {child.icon && <child.icon />}
                      <span>{t(child.name)}</span>
                    </a>
                  ) : (
                    <Link to={child.href} onClick={child.onClick}>
                      {child.icon && <child.icon />}
                      <span>{t(child.name)}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
        <div className="footer__store">
          <AppleStoreIcon
            {...{
              onClick: () => {
                handleOnClick(APP_LINKS.IOS)
              }
            }}
          />
          <GooglePlayIcon
            {...{
              onClick: () => {
                handleOnClick(APP_LINKS.ANDROID)
              }
            }}
          />
        </div>
      </div>
      <div className="footer__copyright">{t('footer.copyright')}</div>
    </footer>
  )
}

export default Footer
