import { PRODUCTION_MODE, TESTING_MODE } from './common.constants'

export const API_HULLABALLOO_URL = PRODUCTION_MODE
  ? 'https://hullaballoo.api.dwave.cc'
  : TESTING_MODE
  ? 'https://hullaballoo-test.api.dwave.cc'
  : '/hullaballoo-api'

export const API_ACCOUNT_URL = PRODUCTION_MODE
  ? // ? 'https://accounts.dwave.cc'
    'https://accounts.api.dwave.cc'
  : TESTING_MODE
  ? // ? 'https://accounts-test.dwave.cc'
    'https://accounts-test.api.dwave.cc'
  : '/accounts-api'

export const API_RESPONSE_STATUS = {
  SUCCESS: 'success',
  ERROR: 'error'
}

export const EMBED_VIDEO_CREDIT = {
  HSU_MABEL: {
    title: '@hsu.mabel',
    url: 'https://www.instagram.com/hsu.mabel'
  }
}
export const API_FFMPEG_URL = PRODUCTION_MODE
  ? 'https://ffmpeg.api.dwave.cc'
  : TESTING_MODE
  ? 'https://ffmpeg-test.api.dwave.cc'
  : 'http://localhost:3000'
