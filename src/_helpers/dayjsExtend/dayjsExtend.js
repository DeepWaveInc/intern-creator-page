import 'dayjs/locale/zh-tw'
import 'dayjs/locale/en'
import utc from 'dayjs/plugin/utc'
import minMax from 'dayjs/plugin/minMax'
import timezone from 'dayjs/plugin/timezone'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'

dayjs.extend(utc)
dayjs.extend(minMax)
dayjs.extend(timezone)
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
dayjs.extend(relativeTime)

export default dayjs
