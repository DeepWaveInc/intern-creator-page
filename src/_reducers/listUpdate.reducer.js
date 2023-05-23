import { listUpdateConstants } from '../_constants'

export function listUpdate(state = false, action) {
  switch (action.type) {
    case listUpdateConstants.UPDATE:
      return action.value
    case listUpdateConstants.CLEAR:
      return false
    default:
      return state
  }
}
