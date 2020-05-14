import { formatDate } from "./format";

const i18n = {
  tags: "Tag: ",
  decks: "Deck: ",
  noteTypes: "Note: ",
};

export function arrayify(obj, values) {
  return Object.keys(obj).map((k) => values.find((v) => v.id === k));
}
export function objectify(arr, bool = true) {
  return arr.reduce((o, i) => ({ ...o, [i.key || i]: bool }), {});
}

export function formatPeriod(data, format) {
  return data.map((o) => ({
    ...o,
    period: formatDate(format, o.period),
  }));
}

function mapNames(data, info) {
  return data.map((item) => {
    return Object.keys(item)
      .map((i) => {
        const val = item[i];
        let key = i;
        const match = ["tags", "decks", "noteTypes"].find((type) =>
          i.startsWith(`${type}_`)
        );
        if (match) {
          const [type, ..._id] = i.split("_");
          const f = _id.join("_");
          const { name: _name } =
            info[match].find((i) => `${i.id}` === f) || {};
          key = `${i18n[type] || type}${_name || _id}`;
        }
        return { key, val };
      })
      .sort((a, b) => a.key.localeCompare(b.key))
      .reduce((o, { key, val }) => ({ ...o, [key]: val }), {});
  });
}

function createSeries(data) {
  return Object.keys(data[0])
    .reduce((a, id) => {
      let hasY = false;
      const parsed = data.map((d) => {
        if (d[id]) {
          hasY = true;
        }
        return { x: d.period, y: d[id] };
      });
      return id === "period" ? a : [...a, { id, hasY, data: parsed }];
    }, [])
    .filter((d) => d.hasY);
}

function rank(series) {
  const ranks = series[0].data.map((_, i) => {
    return series
      .map((s, i2) => ({ ...s, i: i2 }))
      .sort((a, b) => b.data[i].y - a.data[i].y)
      .reduce((o, s, i3) => ({ ...o, [s.i]: i3 }), {});
  });
  return series.map((s, i) => ({
    ...s,
    data: s.data.map((d, i2) => ({ ...d, _y: d.y, y: ranks[i2][i] + 1 })),
  }));
}

export function lineTransform({ data, query }, info) {
  if (data.length <= 1) {
    return {
      error:
        "The query did not return enough time periods to render. Please reduce the period (e.g. Yearly -> Monthly).",
    };
  }
  const named = mapNames(data, info);
  return createSeries(named);
}

export function barTransform({ data, period }, info) {
  if (data.length <= 1) {
    return {
      error:
        "The query did not return enough time periods to render. Please reduce the period (e.g. Yearly -> Monthly).",
    };
  }

  const named = formatPeriod(mapNames(data, info), period.format);
  const keys = Object.keys(named[0]).filter((k) => k !== "period");
  return { keys, data: named };
}

export function calendarTransform({ data, query }) {
  if (query.period !== "day") {
    return { error: 'This graph must use the "Day" time period setting.' };
  }
  if (Object.keys(data[0]).length != 2) {
    return {
      error:
        "This graph must only return one data series. Please limit your search to one item.",
    };
  }
  const key = Object.keys(data[0])[1];
  const res = data.map((i) => ({
    day: i.period.toISOString().slice(0, 10),
    value: i[key],
  }));
  const { day: first } = res[0];
  const { day: last } = res[res.length - 1];
  return { data: res, first, last };
}

export function pieTransform({ data, query }, info) {
  if (query.period !== "all") {
    return { error: 'The time period for pie charts must be set to "All".' };
  }
  const [named] = mapNames(data, info);
  const keys = Object.keys(named).filter((k) => k !== "period");
  return keys
    .reduce((a, k) => [...a, { id: k, label: k, value: named[k] }], [])
    .sort((a, b) => a.value - b.value);
}

export function bumpTransform({ data, period }, info) {
  if (data.length <= 1) {
    return {
      error:
        "The query did not return enough time periods to render. Please reduce the period (e.g. Yearly -> Monthly).",
    };
  }

  const named = formatPeriod(mapNames(data, info), period.format);
  const series = createSeries(named);
  const ranked = rank(series);
  return ranked;
}
