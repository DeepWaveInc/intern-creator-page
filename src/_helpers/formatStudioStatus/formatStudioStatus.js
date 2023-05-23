import { STUDIO_STATUS } from '../../_constants'

const formatStudioStatus = (status) => {
  return STUDIO_STATUS[status] ?? 'processing'
}

export default formatStudioStatus
