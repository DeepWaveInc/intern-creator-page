export const PRODUCTION_MODE =
  process.env.REACT_APP_ENVIRONMENT === 'production'

export const DEV_MODE = process.env.REACT_APP_ENVIRONMENT === 'development'

export const TESTING_MODE = process.env.REACT_APP_ENVIRONMENT === 'testing'

export const DEBUG_MODE = process.env.REACT_APP_ENVIRONMENT !== 'production'

export const URL_PARAM_FROM = {
  NOISE_ERASER_WEB: 'noise_eraser_web'
}

export const NOISE_ERASER_PRODUCT_URL =
  process.env.REACT_APP_ENVIRONMENT === 'production'
    ? 'https://eraserapp.dwave.cc'
    : 'https://eraserapp-test.dwave.cc'

export const HULLABALLOO_URL = PRODUCTION_MODE
  ? 'https://hullaballoo.dwave.cc'
  : 'https://hullaballoo-test.dwave.cc'

export const ERASER_URL = PRODUCTION_MODE
  ? 'https://eraser.dwave.cc'
  : 'https://eraser-test.dwave.cc'

export const ACCOUNT_URL =
  process.env.REACT_APP_ENVIRONMENT === 'production'
    ? 'https://accounts.dwave.cc'
    : 'https://accounts-test.dwave.cc'

export const ANALYZED_HISTORY_URL = `${ACCOUNT_URL}/member?page=analyzed`

export const GTM_KEY = PRODUCTION_MODE ? 'GTM-54SSM4W' : 'GTM-KZN9995'

export const GA_KEY = PRODUCTION_MODE ? 'UA-119384541-3' : 'UA-218215370-1'

export const DWAVE_OFFICIAL_URL = 'https://dwave.cc'

export const FACEBOOK_LINK = 'https://www.facebook.com/DWaveTW/'

export const MEDIUM_LINK = 'https://deepwave.medium.com/'

export const LINKEDIN_LINK = 'https://www.linkedin.com/company/dwavetw/'

export const SOVIA_URL = 'https://sovia.dwave.cc/'

export const CREATOR_GROUP = 'https://www.facebook.com/groups/162466519396305'

export const DEEPWAVE_CONTACT = 'mailto:service@dwave.cc'

export const PLAY_BUTTON_TYPE = {
  PLAY: 'play',
  PAUSE: 'pause'
}

export const PAGINATION_COMPONENT_CONFIG = {
  DEFAULT_CURRENT: 1,
  DEFAULT_PAGE_SIZE: 10
}

export const NOTIFY_COMPONENT_CONFIG = {
  AUTO_HIDE_PERIOD: 5000,
  TYPE_SUCCESS: 'success',
  TYPE_INFO: 'info',
  TYPE_WARNING: 'warning',
  TYPE_ERROR: 'error'
}

export const NOTIFY_STATUS_CODE = {
  UPDATE_LISTS: 200
}

export const HAVE_ENOUGH_DATA = 4

export const ANALYSIS_HISTORY_SERVICE = 'hullaballoo'
export const LIST_STATUS_FINISHED = 'Finished'
export const LIST_STATUS_EXPIRED = 'expired'
export const LIST_STATUS_ERROR = 'error'
export const LIST_STATUS_PROCESSING = 'processing'
export const LIST_STATUS_SUCCESS = 'success'
export const LIST_STATUS_PENDING_TO_SEND_EMAIL = 'Pending to send mail'
export const LIST_STATUS_SENDING_MAIL = 'Sending mail'
export const LIST_STATUS_RETRYING_TO_SEND_MAIL = 'Retrying to send mail'
export const LIST_STATUS_SENDING_MAIL_FAILED = 'Sending mail failed'

export const STUDIO_STATUS = {
  'Upload successful': 'processing',
  'Upload failed': 'error',
  'Pending to analyze': 'processing',
  Analyzing: 'processing',
  'Analysis successful': 'processing',
  'Retrying to analyze': 'processing',
  'Retrying to analyze (Retry times: 0)': 'processing',
  'Retrying to analyze (Retry times: 1)': 'processing',
  'Retrying to analyze (Retry times: 2)': 'processing',
  'Retrying to analyze (Retry times: 3)': 'processing',
  'Retrying to analyze (Retry times: 4)': 'processing',
  'Analysis failed': 'error',
  'Pending to send mail': 'success',
  'Sending mail': 'success',
  'Retrying to send mail': 'success',
  Failed: 'error',
  expired: 'expired',
  'Sending mail failed': 'success',
  Finished: 'success',
  Processing: 'processing'
}

export const GOOGLE_OPTIMIZE_EXPERIMENT_ID = DEV_MODE
  ? 'dtjm481mQL26RKRA9my1kw'
  : TESTING_MODE
  ? 'CTq50OiqQ4uL0XideY2z-w'
  : '3WB09tT1TRqF8gIAyi3JKQ'

export const GOOGLE_OPTIMIZE_VARIANT = {
  A_CASE: '0',
  B_CASE: '1',
  C_CASE: '2'
}

export const HULLABALLOO_STUDIO_ADJUSTMENT_CUSTOM_LOCAL_STORAGE_KEY = 'h_s_a_c'
export const HULLABALLOO_STUDIO_ADJUSTMENT_CUSTOM_ID = 5

export const ERASER_VOICE_FILTER_CUSTOM_LOCAL_STORAGE_KEY = 'e_s_a_c'
export const ERASER_VOICE_FILTER_CUSTOM_ID = 5
export const ERASER_VOICE_FILTER_ORIGINAL_ID = 0

export const PLACEMENT = {
  AUTO: 'auto',
  'AUTO-START': 'auto-start',
  'AUTO-END': 'auto-end',
  TOP: 'top',
  'TOP-START': 'top-start',
  'TOP-END': 'top-end',
  BOTTOM: 'bottom',
  'BOTTOM-START': 'bottom-start',
  'BOTTOM-END': 'bottom-end',
  RIGHT: 'right',
  'RIGHT-START': 'right-start',
  'RIGHT-END': 'right-end',
  LEFT: 'left',
  'LEFT-START': 'left-start',
  'LEFT-END': 'left-end'
}

export const APP_STORE_LINK = 'https://supr.link/7s3JO'

export const SHORT_URL_DOMAIN = PRODUCTION_MODE
  ? 'https://s.dwave.cc'
  : DEV_MODE
  ? 'https://localhost:8083'
  : 'https://s-test.dwave.cc'

export const SPECTRUM_RANGE = 1024

export const PAGE_LIFECYCLE = {
  ACTIVE: 'active',
  PASSIVE: 'passive',
  HIDDEN: 'hidden'
}

export const ERROR_CODE = {
  REFRESH_TOKEN: [411, 413]
}

export const ERROR_RETRY_COUNT = 5
export const FILTERS_COLUMN =
  'id,created_at,duration,filename,status,expires,denoise_link,denoise_spectrum,noise_link,noise_spectrum'

export const TAIWAN_TIMEZONE_OFFSET = 8
export const DEFAULT_DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
export const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD'

export const LOCAL_STORAGE_KEY = {
  ANNOUNCEMENT_DISPLAY: 'H_A_D'
}

export const APP_LINKS = {
  IOS: 'https://apps.apple.com/us/app/noise-eraser/id1604569278',
  ANDROID: 'https://play.google.com/store/apps/details?id=com.dwave.noiseraser'
}

export const PC_LG_MEDIA = 1920
export const PC_MD_MEDIA = 1440
export const PC_SM_MEDIA = 1280
export const PAD_LG_MEDIA = 1024
export const PAD_MD_MEDIA = 960
export const PAD_SM_MEDIA = 768
export const PHONE_LG_MEDIA = 600
export const PHONE_MD_MEDIA = 480
export const PHONE_SM_MEDIA = 400
export const PHONE_XS_MEDIA = 375
export const PHONE_XX_MEDIA = 320

export const NSTC_LINK = 'https://www.nstc.gov.tw/' // 國家科學技術委員會, 科技部
export const EBC_LINK = 'https://news.ebc.net.tw' // 東森新聞
export const III_LINK = 'https://www.iii.org.tw' // 財團法人資訊工業策進會
export const AWS_LINK = 'https://aws.amazon.com' // Amazon
export const UDN_GROUP_LINK = 'https://www.udngroup.com' // 聯合創新加速器
export const METAEDU_LINK = 'https://www.metaedu.org.tw' // METAEDU
export const GO_PRO_LINK = 'https://gopro.com' // GoPro
export const GOOGLE_LINK = 'https://www.google.com' // Google
export const TITA_LINK = 'https://www.taiwanarena.tech' // 台灣科技產業協會

export const UPLOAD_ERROR_CODE = {
  ANALYSIS_FILE_DURATION_EXCEED_LIMIT: 623,
  ANALYSIS_FILE_NOT_FOUND: 607
}

export const UPLOAD_CLIENT_KEY = 'hullaballoo'

export const DEFAULT_ACTIVE_FILTER = {
  id: 0,
  values: [50, 50]
}
