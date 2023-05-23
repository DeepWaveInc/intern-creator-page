import { useSpring, a } from '@react-spring/web'
import { useIsMobileLayout, useInView } from '../../../../../hooks'

const useAnimation = () => {
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

  const contentSlideIn = useSpring({
    y: sectionInView ? '0%' : '20%',
    opacity: sectionInView ? 1 : 0,
    config: {
      mass: 1,
      tension: 60,
      friction: 23
    }
  })

  return {
    sectionInViewRef,
    titleSlideIn,
    contentSlideIn,
    a
  }
}

export default useAnimation
