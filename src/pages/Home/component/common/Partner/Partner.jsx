import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSpring, useTrail, a } from '@react-spring/web'
import { useIsMobileLayout, useInView } from '../../../../../hooks'

import { ReactComponent as MOISTColorSvg } from '../../../../../assets/image/landing/partner/moist_color.svg'
import { ReactComponent as MOISTGraySvg } from '../../../../../assets/image/landing/partner/moist_gray.svg'

import { ReactComponent as EBCColorSvg } from '../../../../../assets/image/landing/partner/ebc_color.svg'
import { ReactComponent as EBCGraySvg } from '../../../../../assets/image/landing/partner/ebc_gray.svg'

import { ReactComponent as IIIColorSvg } from '../../../../../assets/image/landing/partner/iii_color.svg'
import { ReactComponent as IIIGraySvg } from '../../../../../assets/image/landing/partner/iii_gray.svg'

import { ReactComponent as AWSColorSvg } from '../../../../../assets/image/landing/partner/aws_color.svg'
import { ReactComponent as AWSGraySvg } from '../../../../../assets/image/landing/partner/aws_gray.svg'

import { ReactComponent as UIColorSvg } from '../../../../../assets/image/landing/partner/ui_color.svg'
import { ReactComponent as UIGraySvg } from '../../../../../assets/image/landing/partner/ui_gray.svg'

import { ReactComponent as METAEDUColorSvg } from '../../../../../assets/image/landing/partner/metaedu_color.svg'
import { ReactComponent as METAEDUGraySvg } from '../../../../../assets/image/landing/partner/metaedu_gray.svg'

import { ReactComponent as GoProColorSvg } from '../../../../../assets/image/landing/partner/gopro_color.svg'
import { ReactComponent as GoProGraySvg } from '../../../../../assets/image/landing/partner/gopro_gray.svg'

import { ReactComponent as GoogleColorSvg } from '../../../../../assets/image/landing/partner/google_color.svg'
import { ReactComponent as GoogleGraySvg } from '../../../../../assets/image/landing/partner/google_gray.svg'

import { ReactComponent as TitaColorSvg } from '../../../../../assets/image/landing/partner/tita_color.svg'
import { ReactComponent as TitaGraySvg } from '../../../../../assets/image/landing/partner/tita_gray.svg'

import './Partner.scss'

import {
  NSTC_LINK,
  EBC_LINK,
  III_LINK,
  AWS_LINK,
  UDN_GROUP_LINK,
  METAEDU_LINK,
  GO_PRO_LINK,
  GOOGLE_LINK,
  TITA_LINK
} from '../../../../../_constants'

const CLIENTS = [
  {
    color: MOISTColorSvg,
    gray: MOISTGraySvg,
    name: 'moist',
    href: NSTC_LINK
  },
  {
    color: EBCColorSvg,
    gray: EBCGraySvg,
    name: 'ebc',
    href: EBC_LINK
  },
  {
    color: IIIColorSvg,
    gray: IIIGraySvg,
    name: 'iii',
    href: III_LINK
  },
  {
    color: AWSColorSvg,
    gray: AWSGraySvg,
    name: 'aws',
    href: AWS_LINK
  },
  {
    color: UIColorSvg,
    gray: UIGraySvg,
    name: 'ui',
    href: UDN_GROUP_LINK
  },
  {
    color: METAEDUColorSvg,
    gray: METAEDUGraySvg,
    name: 'metaedu',
    href: METAEDU_LINK
  },
  {
    color: GoProColorSvg,
    gray: GoProGraySvg,
    name: 'gopro',
    href: GO_PRO_LINK
  },
  {
    color: GoogleColorSvg,
    gray: GoogleGraySvg,
    name: 'google',
    href: GOOGLE_LINK
  },
  {
    color: TitaColorSvg,
    gray: TitaGraySvg,
    name: 'tita',
    href: TITA_LINK
  }
]

const Partner = () => {
  const { t } = useTranslation()
  const { isMobileLayout } = useIsMobileLayout()
  const [sectionInViewRef, sectionInView] = useInView({
    threshold: [0.25],
    ...(isMobileLayout ? { rootMargin: '0px 0px 200px 0px' } : {})
  })

  const titleSlideIn = useSpring({
    y: sectionInView ? '0%' : '20%',
    opacity: sectionInView ? 1 : 0,
    config: {
      mass: 1,
      tension: 60,
      friction: 23
    }
  })

  const trail = useTrail(CLIENTS.length, {
    config: {
      mass: 5,
      tension: 2000,
      friction: 200
    },
    opacity: sectionInView ? 1 : 0,
    y: sectionInView ? '0%' : '20%'
  })

  const handleOnClick = useCallback((href) => {
    window.open(href, '_blank', 'noopener=yes,noreferrer=yes')
  }, [])

  return (
    <section className="landing-partner">
      <div className="landing-partner__container" ref={sectionInViewRef}>
        <a.h2 style={titleSlideIn}>{t('landing.partner.title')}</a.h2>
        <ul>
          {trail.map(({ ...style }, index) => {
            const client = CLIENTS[index]
            return (
              <a.li
                key={index}
                style={style}
                className={client.name}
                onClick={() => handleOnClick(client.href)}
              >
                <client.color />
                <client.gray />
              </a.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default Partner
