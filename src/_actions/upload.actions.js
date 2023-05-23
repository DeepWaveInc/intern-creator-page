import { uploadConstants } from '../_constants'

function insertFiles(files) {
  return { type: uploadConstants.INSERT_FILES, files }
}

function removeFiles(ids) {
  return { type: uploadConstants.REMOVE_FILES, ids }
}

function updateCancelable(id, cancelable) {
  return { type: uploadConstants.UPDATE_CANCELABLE, id, cancelable }
}

function updateStatus(id, status, error) {
  return {
    type: uploadConstants.UPDATE_STATUS,
    id,
    status,
    ...(error ? { error } : {})
  }
}

function clear() {
  return { type: uploadConstants.CLEAR }
}

export const uploadActions = {
  insertFiles,
  removeFiles,
  updateStatus,
  updateCancelable,
  clear
}
