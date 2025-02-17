import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export { dayjs as dayjsTz }

export const toLocalTime = (t: string) => {
  return dayjs(t).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('DD-MM-YYYY HH:mm:ss')
}
