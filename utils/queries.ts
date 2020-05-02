import { Connection } from 'typeorm'
import { Revlog } from '../schema'

const dates = {
  hour: '%Y-%m-%d-%H',
  week: '%Y-%m-%W',
  day: '%Y-%m-%d',
  month: '%Y-%m',
  year: '%Y'
}

export async function getRevisions (connection: Connection) {
  const period = 'week'
  const time = `strftime('${dates[period]}', id / 1000, 'unixepoch', 'localtime')`
  const query = connection
    .createQueryBuilder(Revlog, 'revlog')
    // .select('*')
    .select('COUNT(*)', 'count')
    .addSelect(time, period)
    .groupBy(time)
    .cache(true)
  const res = await query.getRawMany()
  console.log(res.length)
  return res
}
