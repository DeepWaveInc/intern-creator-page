import { userConstants } from '../_constants'

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.UPLOAD_REQUEST:
      return {
        uploading: true
      }
    case userConstants.UPLOAD_SUCCESS:
      return {
        uploaded: true
      }
    case userConstants.UPLOAD_FAILURE:
      return {}
    case userConstants.ANALYSIS_REQUEST:
      return {
        analyzing: true
      }
    case userConstants.ANALYSIS_SUCCESS:
      return {
        analyzed: true
      }
    case userConstants.ANALYSIS_FAILURE:
      return {}

    case userConstants.CURRENT_FILE:
      return {
        file: action.file,
        filename: action.filename
      }

    case userConstants.REMOVE_FILE:
      return {}

    default:
      return state
  }
}
