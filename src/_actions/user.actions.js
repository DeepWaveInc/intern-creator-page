import {
  userConstants,
  subscriptionConstants,
  userMetaConstants,
  errorMessageTw,
  errorMessageEn,
  API_HULLABALLOO_URL,
  API_ACCOUNT_URL,
  DEV_MODE,
  uploadConstants
} from '../_constants'
import { alertActions } from './'
import { axios } from '../_services'
import i18n from 'i18next'
import Cookies from 'universal-cookie'
import getBlobDuration from 'get-blob-duration'
const FileType = require('file-type/browser')
const mime = [
  'audio/mpeg',
  'audio/wav',
  'audio/x-wav',
  'audio/x-m4a',
  'audio/wave',
  'audio/x-pn-wav',
  'audio/vnd.wave',
  'video/mp4',
  'video/quicktime'
]

const cookies = new Cookies()
const language = function () {
  if (i18n.language === 'zh-TW') {
    return errorMessageTw
  } else {
    return errorMessageEn
  }
}

export const userActions = {
  upload,
  save_current,
  modal_close,
  remove_current,
  check_type,
  upload_modal_close,
  async_analysis,
  logout,
  modal_qr_code_close,
  modal_qr_code_shown,
  free_upload_limitation_modal_close,
  free_upload_limitation_modal_init,
  free_upload_limitation_modal_shown
}

function upload(file) {
  return (dispatch) => {
    const formData = new FormData()
    for (var i = 0; i < file.length; i++) {
      formData.append('audio_file', file[i])
    }
    dispatch(request({ file }))
    axios
      .post(`${API_HULLABALLOO_URL}/api/files`, formData)
      .then((response) => {
        const failure_file = response.data.result.failure_file
        const success_file = response.data.result.success_file
        const file = response.data.result.filename
        const coin = response.data.result.total_coin

        dispatch({
          type: userConstants.UPLOAD_MODAL_SHOWN,
          success_file,
          failure_file,
          file,
          coin
        })
      })
      .catch((error) => {
        const errcode = error.response.data.error.code
        const errstatus = error.response.data.status
        dispatch(alertActions.error(language()[errcode]))
        dispatch(failure(errstatus))
      })
  }

  function request(file) {
    return { type: userConstants.UPLOAD_REQUEST, file }
  }

  function failure(error) {
    return { type: userConstants.UPLOAD_FAILURE, error }
  }
}

function upload_modal_close() {
  return (dispatch) => {
    dispatch({ type: userConstants.UPLOAD_MODAL_CLOSE })
    dispatch({ type: userConstants.UPLOAD_FAILURE })
  }
}

function async_analysis(filename) {
  return (dispatch) => {
    dispatch(request({ filename }))
    dispatch({ type: userConstants.UPLOAD_MODAL_CLOSE })
    let file_data = {
      filename: filename
    }

    axios
      .post(`${API_HULLABALLOO_URL}/api/async-analysis`, file_data)
      .then((response) => {
        dispatch(success(filename))
        dispatch(alertActions.success(language().startAnalyze))
      })
      .catch((error) => {
        const errcode = error.response.data.error.code
        const errstatus = error.response.data.status
        dispatch(alertActions.error(language()[errcode]))
        dispatch(failure(errstatus))
      })
  }
  function request(filename) {
    return { type: userConstants.ANALYSIS_REQUEST, filename }
  }
  function success(filename) {
    return { type: userConstants.ANALYSIS_SUCCESS, filename }
  }
  function failure(error) {
    return { type: userConstants.ANALYSIS_FAILURE, error }
  }
}

function save_current(file, filename) {
  return (dispatch) => {
    dispatch(request({ file, filename }))
  }
  function request({ file, filename }) {
    return { type: userConstants.CURRENT_FILE, file, filename }
  }
}

function remove_current() {
  return (dispatch) => {
    dispatch({ type: userConstants.REMOVE_FILE })
  }
}

function modal_close(navigate) {
  return (dispatch) => {
    dispatch({ type: userConstants.MODAL_CLOSE })
    navigate(0)
  }
}

function free_upload_limitation_modal_init() {
  return (dispatch) => {
    dispatch({ type: userConstants.FREE_UPLOAD_LIMITATION_MODAL_INIT })
  }
}

function free_upload_limitation_modal_shown() {
  return (dispatch) => {
    dispatch({ type: userConstants.FREE_UPLOAD_LIMITATION_MODAL_SHOWN })
  }
}

function free_upload_limitation_modal_close() {
  return (dispatch) => {
    dispatch({ type: userConstants.FREE_UPLOAD_LIMITATION_MODAL_CLOSE })
  }
}

function modal_qr_code_shown(dispatch) {
  dispatch({
    type: userConstants.QR_CODE_SHOWN
  })
}

function modal_qr_code_close(dispatch) {
  dispatch({ type: userConstants.QR_CODE_CLOSE })
}

function check_type(files) {
  return (dispatch) => {
    let filename = []
    let file = []

    if (files.length >= 6) {
      errorClose(language().limitError)
    } else {
      for (let i = 0; i < files.length; i++) {
        //check type, duration
        ;(async () => {
          const blob = new Blob([files[i]])
          const type_object = await FileType.fromBlob(blob)
          if (
            type_object === undefined ||
            mime.find((arr) => arr === type_object.mime) === undefined
          ) {
            errorClose(language().formatError)
          }
        })()
        ;(async () => {
          const blob = new Blob([files[i]])
          const duration = await getBlobDuration(blob)
          if (duration > 1800) {
            errorClose(language().longError)
          }
        })()

        if (files[i].size / 1000000 > 1024) {
          errorClose(language().sizeError)
        } else {
          file.push(files[i])
          filename.push(files[i].name)
        }
      }

      dispatch({ type: userConstants.CURRENT_FILE, file, filename })
    }
    function errorClose(error) {
      dispatch({ type: userConstants.REMOVE_FILE })
      dispatch(alertActions.error(error))
    }
  }
}

async function logout(dispatch, navigate) {
  await axios.post(`${API_ACCOUNT_URL}/api/auth/logout`).catch((error) => {})
  if (cookies.get('user')) {
    cookies.remove('user', !DEV_MODE ? { domain: '.dwave.cc' } : undefined)
  }
  dispatch({ type: userConstants.LOGOUT })
  dispatch({ type: userMetaConstants.CLEAR })
  dispatch({ type: subscriptionConstants.CLEAR })
  dispatch({ type: uploadConstants.CLEAR })
  // navigate(0)
}
