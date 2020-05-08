export const periods = {
  minute: { name: "Minutely", format: "%Y-%m-%d-%H:%M" },
  hour: { name: "Hourly", format: "%Y-%m-%d-%H" },
  day: { name: "Daily", format: "%Y-%m-%d" },
  week: { name: "Weekly", format: "%Y-%m-%W" },
  month: { name: "Monthly", format: "%Y-%m" },
  year: { name: "Yearly", format: "%Y" },
  all: { name: "All", format: "*" },
};

export default function getTimeQuery(period) {
  const fmt = periods[period].format;
  return fmt === "*" ? "'all'" : `strftime('${fmt}', revision.id / 1000, 'unixepoch', 'localtime')`;
}
