import { notifyConstants } from '../_constants'

export function notify(state = {}, action) {
  switch (action.type) {
    case notifyConstants.UPDATE:
      return {
        type: 'notify-update',
        detail: action.detail
      }
    case notifyConstants.CLEAR:
      return {}
    default:
      return state
  }
}
