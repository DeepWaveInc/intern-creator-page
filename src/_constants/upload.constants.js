export const uploadConstants = {
  INSERT_FILES: 'UPLOAD_INSERT_FILES',
  REMOVE_FILES: 'UPLOAD_REMOVE_FILES',
  UPDATE_STATUS: 'UPLOAD_UPDATE_STATUS',
  UPDATE_CANCELABLE: 'UPLOAD_UPDATE_CANCELABLE',
  CLEAR: 'UPLOAD_CLEAR'
}

export const UPLOAD_STATUS = {
  IDLE: -1,
  UPLOADING: 0,
  COMPLETE: 1,
  ERROR: 2
}

export const UPLOAD_MEDIA_TYPES = {
  VIDEO: 'video',
  AUDIO: 'audio'
}

export const UPLOAD_ERROR_TYPE = {
  SIZE: 'size',
  TYPE: 'type',
  DURATION: 'duration'
}
