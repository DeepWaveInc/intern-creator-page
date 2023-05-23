import { dayjs } from '../../_helpers'
import { DEFAULT_DATE_FORMAT, TAIWAN_TIMEZONE_OFFSET } from '../../_constants'

const serverToLocalTimeOffset = (time, format = DEFAULT_DATE_FORMAT) => {
  const serverTimeOffset = dayjs()
    .utcOffset(TAIWAN_TIMEZONE_OFFSET)
    .format(format)
  const localTime = dayjs().format(format)
  const diffTime = dayjs(localTime).diff(dayjs(serverTimeOffset), 'minute')

  return dayjs(time).add(diffTime, 'minute').format(format)
}

export default serverToLocalTimeOffset
