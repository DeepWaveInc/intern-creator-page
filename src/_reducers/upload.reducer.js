import { uploadConstants } from '../_constants'

export function upload(state = [], action) {
  switch (action.type) {
    case uploadConstants.INSERT_FILES: {
      return [...state, ...action.files]
    }

    case uploadConstants.REMOVE_FILES: {
      const ids = action.ids
      const newFiles = state.filter((file) => !ids.includes(file.id))
      return newFiles
    }

    case uploadConstants.UPDATE_CANCELABLE: {
      const { id, cancelable } = action
      const newFiles = state.map((file) => {
        if (file.id === id) {
          return { ...file, is_cancelable: cancelable }
        } else {
          return file
        }
      })
      return newFiles
    }

    case uploadConstants.UPDATE_STATUS: {
      const { id, status, error } = action
      const newFiles = state.map((file) => {
        if (file.id === id) {
          return { ...file, status, ...(error ? { error } : {}) }
        } else {
          return file
        }
      })

      return newFiles
    }

    case uploadConstants.CLEAR: {
      return []
    }

    default: {
      return state
    }
  }
}
