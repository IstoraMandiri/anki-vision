export const periods = {
  minute: {
    margin: 120,
    name: "Minutely",
    time: 1000 * 1 * 60,
    format: "%Y-%m-%d %H:%M",
    tickValues: "every minute",
  },
  hour: {
    margin: 120,
    name: "Hourly",
    time: 1000 * 1 * 60 * 60,
    format: "%Y-%m-%d %H:00",
    tickValues: "every hour",
  },
  day: {
    margin: 80,
    name: "Daily",
    time: 1000 * 1 * 60 * 60 * 24,
    format: "%Y-%m-%d",
    tickValues: "every day",
  },
  week: {
    margin: 100,
    name: "Weekly",
    time: 1000 * 1 * 60 * 60 * 24 * 7,
    format: "wk. %-V, %Y",
    tickValues: "every week",
  },
  month: {
    margin: 100,
    name: "Monthly",
    time: 1000 * 1 * 60 * 60 * 24 * 30,
    format: "%B %Y",
    tickValues: "every month",
  },
  year: {
    margin: 60,
    name: "Yearly",
    time: 1000 * 1 * 60 * 60 * 24 * 365,
    format: "%Y",
    tickValues: "every year",
  },
  all: { margin: 100, name: "All", format: "*" },
};

export default function getTimeQuery(period) {
  const { time } = periods[period];
  return !time ? "'all'" : `CAST (revision.id / ${time} AS INT) * ${time}`;
}
