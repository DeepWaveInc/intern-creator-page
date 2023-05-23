import React, { useCallback, useMemo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userActions } from '../../_actions'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { generateRandomString, sendGAEvent } from '../../_helpers'
import { ACCOUNT_URL, URL_PARAM_FROM, APP_STORE_LINK } from '../../_constants'
import PCNav from './component/PCNav'
import MobileNav from './component/MobileNav'
import QRCode from './component/QRCode'
import Cookies from 'universal-cookie'
import clsx from 'clsx'
import { ReactComponent as EarthIcon } from '../../assets/image/icons/earth.svg'
import QRCodeModal from '../modal/type/qrCode'
import './Navigation.scss'

const MOBILE_SIZE = 960

const Navigation = ({ setActive, active, user, hamburgerRef }) => {
  const navigate = useNavigate()
  const [isMobileLayout, setMobileLayout] = useState(false)
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()
  const { logout } = userActions
  const cookies = useMemo(() => new Cookies(), [])

  const handleChangeLanguage = useCallback(
    (lng) => {
      i18n.changeLanguage(lng)
      cookies.set('lang', lng)
    },
    [cookies, i18n]
  )

  const handleLogout = useCallback(() => {
    sendGAEvent('header', 'click', 'btn_logout')
    logout(dispatch, navigate)
  }, [dispatch, logout, navigate])

  const handleResize = useCallback(() => {
    const isMobileSize = window.innerWidth <= MOBILE_SIZE
    setMobileLayout(isMobileSize)
  }, [])

  const items = useMemo(() => {
    const result = [
      ...(user
        ? [
            {
              name: t('nav.studio'),
              onClick: () => {
                sendGAEvent('header', 'click', 'btn_studio')
                navigate('/studio')
                setActive(false)
              },
              icon: null,
              children: null,
              id: generateRandomString()
            },
            // {
            //   name: t('common.plan_and_price'),
            //   onClick: () => {
            //     sendGAEvent('header', 'click', 'btn_pricing')
            //     window.open(
            //       `${ACCOUNT_URL}/pricing`,
            //       '_blank',
            //       'noopener,noreferrer'
            //     )
            //   },
            //   icon: null,
            //   children: null,
            //   id: generateRandomString()
            // },
            {
              name: t('common.compare_of_subscription'),
              onClick: () => {
                sendGAEvent('header', 'click', 'btn_studio')
                navigate('/compare')
                setActive(false)
              },
              icon: null,
              children: null,
              id: generateRandomString()
            },
            {
              name: user,
              onClick: null,
              icon: null,
              children: [
                {
                  name: t('nav.my_account'),
                  onClick: () => {
                    sendGAEvent('header', 'click', 'btn_account')
                    window.open(
                      `${ACCOUNT_URL}/member`,
                      '_blank',
                      'noopener noreferrer'
                    )
                  },
                  icon: null,
                  children: null,
                  id: generateRandomString()
                },
                {
                  name: t('common.logout'),
                  onClick: handleLogout,
                  icon: null,
                  children: null,
                  id: generateRandomString()
                }
              ],
              id: generateRandomString()
            }
          ]
        : [
            {
              name: t('common.login'),
              onClick: () => {
                const urlParams = new URLSearchParams()
                urlParams.set('from', URL_PARAM_FROM.NOISE_ERASER_WEB)
                window.location.href = `${ACCOUNT_URL}/login?${urlParams.toString()}`
              },
              icon: null,
              children: null,
              id: generateRandomString()
            },
            {
              name: t('common.compare_of_subscription'),
              onClick: () => {
                sendGAEvent('header', 'click', 'btn_studio')
                navigate('/compare')
                setActive(false)
              },
              icon: null,
              children: null,
              id: generateRandomString()
            }
            // {
            //   name: t('common.plan_and_price'),
            //   onClick: () => {
            //     sendGAEvent('header', 'click', 'btn_pricing')
            //     window.open(
            //       `${ACCOUNT_URL}/pricing`,
            //       '_blank',
            //       'noopener,noreferrer'
            //     )
            //   },
            //   icon: null,
            //   children: null,
            //   id: generateRandomString()
            // }
          ])
    ]

    return [
      {
        name: t('nav.mobile.version'),
        onClick: null,
        mobileProps: {
          onClick: () => {
            window.open(APP_STORE_LINK, '_blank', 'noopener,noreferrer')
            setActive(false)
          },
          hideArrow: true,
          hideChildren: true
        },
        children: isMobileLayout ? null : QRCode,
        id: generateRandomString()
      },
      ...result,
      {
        name: t('nav.language'),
        onClick: null,
        prefixIcon: (
          <EarthIcon className="navigation-item__prefix navigation-item__prefix__earth" />
        ),
        children: [
          {
            name: '中文',
            onClick: () => {
              handleChangeLanguage('zh-TW')
              setActive(false)
            },
            id: generateRandomString()
          },
          {
            name: 'English',
            onClick: () => {
              handleChangeLanguage('en')
              setActive(false)
            },
            id: generateRandomString()
          }
        ],
        id: generateRandomString()
      }
    ]
  }, [
    user,
    t,
    handleLogout,
    isMobileLayout,
    navigate,
    handleChangeLanguage,
    setActive
  ])

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

  return (
    <aside className={clsx('hullaballoo-navigation')}>
      {isMobileLayout ? (
        <MobileNav {...{ items, active, setActive, hamburgerRef }} />
      ) : (
        <>
          <PCNav {...{ items }} />
          <QRCodeModal />
        </>
      )}
    </aside>
  )
}

export default Navigation
