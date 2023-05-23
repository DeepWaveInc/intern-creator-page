import { listUpdateConstants } from '../_constants'

export const listUpdateActions = {
  update,
  clear
}

function update(value) {
  return { type: listUpdateConstants.UPDATE, value }
}

function clear() {
  return { type: listUpdateConstants.CLEAR }
}
