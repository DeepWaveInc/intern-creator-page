import { userMetaConstants } from '../_constants'

export const userMetaActions = {
  update,
  clear
}

function update(meta) {
  return { type: userMetaConstants.UPDATE, meta }
}

function clear() {
  return { type: userMetaConstants.CLEAR }
}
