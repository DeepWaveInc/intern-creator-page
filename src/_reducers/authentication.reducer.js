import { userConstants, DEV_MODE } from '../_constants'
import base64DecodeUnicode from '../_helpers/base64DecodeUnicode'
import Cookies from 'universal-cookie'
const cookies = new Cookies()

function checkUser() {
  const user = cookies.get('user')
  let result = ''
  try {
    if (user) {
      const decode = base64DecodeUnicode(user)
      decode && (result = decode)
    }
  } catch (error) {
    console.log(error)
    cookies.remove('user', !DEV_MODE ? { domain: '.dwave.cc' } : undefined)
  }
  return result
}

const initialState = {
  ...(checkUser() ? { loggedIn: true, user: checkUser() } : {})
}

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGOUT:
      return {}
    default:
      return state
  }
}
