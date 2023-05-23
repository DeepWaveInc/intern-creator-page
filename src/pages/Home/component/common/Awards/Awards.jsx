import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { a, useTrail } from '@react-spring/web'
import { useInView, useIsMobileLayout } from '../../../../../hooks'
import { PAD_MD_MEDIA } from '../../../../../_constants'
import Award from './component/Award'
import './Awards.scss'

const Awards = () => {
  const { t } = useTranslation()
  const AWARDS = useMemo(
    () => [
      {
        title: 'award.title_6',
        link: 'https://www.metaedu.org.tw/zh-hant/2021-taiwan-edtech-50-result/'
      },
      {
        title: 'award.title_5',
        link: 'https://beststartup.asia/16-top-taiwan-music-companies-and-startups-of-2021/'
      },
      {
        title: 'award.title_4',
        link: 'https://futurology.life/73-most-innovative-taiwan-based-artificial-intelligence-companies/'
      },
      {
        title: 'award.title_2',
        link: 'https://www.bnext.com.tw/article/68815/innovation-award-fca2022'
      },
      {
        title: 'award.title_1',
        link: 'https://www.roccocbac.com/news/204/%E7%AC%AC%E5%9B%9B%E5%B1%86%E5%93%81%E7%89%8C%E9%87%91%E8%88%B6%E7%8D%8E%E5%9C%8B%E5%85%A7%E7%B5%84%E6%B1%BA%E9%81%B8%E5%90%8D%E5%96%AE%E5%85%AC%E5%B8%83%EF%BC%81%EF%BC%81'
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t]
  )
  const { isMobileLayout } = useIsMobileLayout(PAD_MD_MEDIA)

  const [awardsInViewRef, awardsInView] = useInView({
    threshold: [0.25],
    ...(isMobileLayout ? { rootMargin: '0px 0px 550px 0px' } : {})
  })

  const trail = useTrail(AWARDS.length, {
    config: {
      mass: 5,
      tension: 2000,
      friction: 200
    },
    opacity: awardsInView ? 1 : 0,
    y: awardsInView ? '0%' : '20%'
  })

  return (
    <section className="landing-awards">
      <div className="landing-awards__container">
        <ul ref={awardsInViewRef}>
          {trail.map(({ ...style }, index) => {
            const { title, link } = AWARDS[index]
            return (
              <a.li key={index} style={style}>
                <Award {...{ title, link }} />
              </a.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default Awards
