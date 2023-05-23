import {
  userConstants,
  API_ACCOUNT_URL,
  ACCOUNT_URL,
  DEV_MODE
} from '../_constants'
import Cookies from 'universal-cookie'

import { store } from '../_helpers'

const axios = require('axios')
axios.defaults.withCredentials = true
const cookies = new Cookies()

axios.interceptors.request.use(
  async function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response?.data?.error?.code) {
      switch (error.response.data.error?.code) {
        case 411:
        case 413:
          {
            const refreshTokeUrl = `${API_ACCOUNT_URL}/api/auth/refresh-token`
            const remoteRefreshTokenUrl = `${ACCOUNT_URL}/api/auth/refresh-token`
            if (error.config.url !== remoteRefreshTokenUrl) {
              const originalRequest = error.config

              return axios
                .post(refreshTokeUrl)
                .then((response) => {
                  return axios(originalRequest)
                })
                .catch((error) => {
                  return Promise.reject(error)
                })
            }
          }
          break

        case 412:
        case 414:
        case 419:
        case 420:
        case 421:
          store.dispatch({ type: userConstants.MODAL_SHOWN })
          if (cookies.get('user')) {
            cookies.remove(
              'user',
              !DEV_MODE ? { domain: '.dwave.cc' } : undefined
            )
          }

          break
        default:
          break
      }
    } else {
      if (
        error?.code === 'ECONNABORTED' &&
        error.message &&
        error.message.indexOf('timeout') !== -1
      ) {
        alert('網路連線逾時，請點「確認」鍵後繼續使用。')
      } else {
        console.log(error)
      }
      // } else {
      //   store.dispatch({ type: userConstants.MODAL_SHOWN })
      //   if (cookies.get('user')) {
      //     cookies.remove('user')
      //   }
      // }
    }

    return Promise.reject(error)
  }
)

export { axios }
