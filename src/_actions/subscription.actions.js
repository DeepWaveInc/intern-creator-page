import { subscriptionConstants } from '../_constants'

export const subscriptionActions = {
  update,
  clear
}

function update(data) {
  return { type: subscriptionConstants.UPDATE, data }
}

function clear() {
  return { type: subscriptionConstants.CLEAR }
}
