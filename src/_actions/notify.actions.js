import { notifyConstants } from '../_constants'

export const notifyActions = {
  update,
  clear
}

function update(detail) {
  return { type: notifyConstants.UPDATE, detail }
}

function clear() {
  return { type: notifyConstants.CLEAR }
}
