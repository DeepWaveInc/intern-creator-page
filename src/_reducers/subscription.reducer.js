import { subscriptionConstants } from '../_constants'

export function subscription(state = null, action) {
  switch (action.type) {
    case subscriptionConstants.UPDATE:
      return action.data
    case subscriptionConstants.CLEAR:
      return null
    default:
      return state
  }
}
