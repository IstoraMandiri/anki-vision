export const periods = {
  minute: { name: 'Minutely', format: '%Y-%m-%d-%H:%M' },
  hour: { name: 'Hourly', format: '%Y-%m-%d-%H' },
  week: { name: 'Weekly', format: '%Y-%m-%W' },
  day: { name: 'Daily', format: '%Y-%m-%d' },
  month: { name: 'Monthly', format: '%Y-%m' },
  year: { name: 'Yearly', format: '%Y' }
}

export default function getTimeQuery (period) {
  return `strftime('${periods[period].format}', revision.id / 1000, 'unixepoch', 'localtime')`
}
