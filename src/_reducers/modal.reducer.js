import { userConstants } from '../_constants'

export function modal(state = {}, action) {
  switch (action.type) {
    case userConstants.MODAL_SHOWN:
      return {
        modal: true
      }
    case userConstants.MODAL_CLOSE:
      return {
        modal: false
      }
    case userConstants.QR_CODE_SHOWN:
      return {
        qr_code_modal: true
      }
    case userConstants.QR_CODE_CLOSE:
      return {
        qr_code_modal: false
      }

    case userConstants.FREE_UPLOAD_LIMITATION_MODAL_INIT: {
      return {
        free_upload_limitation_modal: null
      }
    }

    case userConstants.FREE_UPLOAD_LIMITATION_MODAL_CLOSE: {
      return {
        free_upload_limitation_modal: false
      }
    }

    case userConstants.FREE_UPLOAD_LIMITATION_MODAL_SHOWN: {
      return {
        free_upload_limitation_modal: true
      }
    }
    case userConstants.UPLOAD_MODAL_SHOWN:
      return {
        upload_modal: true,
        success_filename: action.success_file,
        failure_filename: action.failure_file,
        filename: action.file,
        coin: action.coin
      }
    case userConstants.UPLOAD_MODAL_CLOSE:
      return {
        upload_modal: false
      }

    default:
      return state
  }
}
