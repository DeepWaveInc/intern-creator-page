import { dayjs } from '../../_helpers'
import { DEFAULT_DATE_FORMAT, TAIWAN_TIMEZONE_OFFSET } from '../../_constants'

const localToServerTimeOffset = (time, format = DEFAULT_DATE_FORMAT) => {
  return dayjs(time).utcOffset(TAIWAN_TIMEZONE_OFFSET).format(format)
}

export default localToServerTimeOffset
