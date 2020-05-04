const periods = {
  minute: '%Y-%m-%d-%H:%M',
  hour: '%Y-%m-%d-%H',
  week: '%Y-%m-%W',
  day: '%Y-%m-%d',
  month: '%Y-%m',
  year: '%Y'
}

export default function getTimeQuery (period) {
  return `strftime('${periods[period]}', revision.id / 1000, 'unixepoch', 'localtime')`
}
