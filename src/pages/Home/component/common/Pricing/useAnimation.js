import { useSpring } from '@react-spring/web'
import useInView from '../../../../../hooks/useInView'

const useAnimations = () => {
  const [circleInViewRef, circleInView] = useInView({
    threshold: [0]
  })

  const circleSlideIn = useSpring({
    x: circleInView ? '0' : '35%',
    opacity: circleInView ? 1 : 0,
    config: {
      mass: 1,
      tension: 60,
      friction: 23
    }
  })

  const [titleInViewRef, titleInView] = useInView({
    threshold: [0.65]
  })

  const titleSlideIn = useSpring({
    y: titleInView ? '0%' : '20%',
    opacity: titleInView ? 1 : 0,
    config: {
      mass: 1,
      tension: 60,
      friction: 23
    }
  })

  const [contentInViewRef, contentInView] = useInView({
    threshold: [0]
  })

  const contentSlideIn = useSpring({
    y: contentInView ? '0%' : '20%',
    opacity: contentInView ? 1 : 0,
    config: {
      mass: 1,
      tension: 60,
      friction: 23
    }
  })

  return {
    circleInViewRef,
    circleSlideIn,
    titleInViewRef,
    titleSlideIn,
    contentInViewRef,
    contentSlideIn
  }
}

export default useAnimations
