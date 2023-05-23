import ReactGA from 'react-ga'
import { GA_KEY, TESTING_MODE, DEBUG_MODE } from '../../_constants'

ReactGA.initialize(GA_KEY, { debug: DEBUG_MODE, testMode: TESTING_MODE })

export const sendPageView = (path, name) => ReactGA.pageview(path, [], name)

export const sendGAEvent = (category, action, label) =>
  ReactGA.event({
    category,
    action,
    label
  })
