import { axios } from '../../_services'
import { API_ACCOUNT_URL, ACCOUNT_URL } from '../../_constants'

const getRefreshTokenAndRetry = (
  error,
  refErrorCode,
  targetErrorCode,
  successCallback,
  errorCallback
) => {
  if (refErrorCode === targetErrorCode) {
    const refreshTokeUrl = `${API_ACCOUNT_URL}/api/auth/refresh-token`
    const remoteRefreshTokenUrl = `${ACCOUNT_URL}/api/auth/refresh-token`

    if (error.config.url !== remoteRefreshTokenUrl) {
      return axios
        .post(refreshTokeUrl)
        .then(() => {
          typeof successCallback === 'function' && successCallback()
        })
        .catch((error) => {
          return Promise.reject(error)
        })
    }
  } else {
    typeof errorCallback === 'function' && errorCallback()
  }
}

export default getRefreshTokenAndRetry
