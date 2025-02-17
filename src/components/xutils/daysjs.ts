import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import 'dayjs/locale/ru'
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale('ru')

export { dayjs as dayjsTz }

export const toLocalTime = (t: string) => {
  return dayjs(t).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('DD-MM-YYYY HH:mm:ss')
}
