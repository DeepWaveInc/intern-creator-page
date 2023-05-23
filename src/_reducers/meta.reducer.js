import { userMetaConstants } from '../_constants'

const initialState = null

export function meta(state = initialState, action) {
  switch (action.type) {
    case userMetaConstants.UPDATE:
      return {
        ...state,
        ...action.meta
      }
    case userMetaConstants.CLEAR:
      return null
    default:
      return state
  }
}
