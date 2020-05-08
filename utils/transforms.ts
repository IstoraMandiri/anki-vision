const i18n = {
  tags: "Tag: ",
  decks: "Deck: ",
  noteTypes: "Note: ",
};

export function objectify(arr) {
  return arr.reduce((o, i) => ({ ...o, [i.key]: true }), {});
}

function mapNames(data, info) {
  return data.map((item) => {
    return Object.keys(item)
      .map((i) => {
        const val = item[i];
        let key = i;
        const match = ["tags", "decks", "noteTypes"].find((type) => i.startsWith(`${type}_`));
        if (match) {
          const [type, ..._id] = i.split("_");
          const f = _id.join("_");
          const { name: _name } = info[match].find((i) => `${i.id}` === f) || {};
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

export function lineTransform({ data }, info) {
  const named = mapNames(data, info);
  return createSeries(named);
}

export function barTransform({ data }, info) {
  const named = mapNames(data, info);
  const keys = Object.keys(named[0]).filter((k) => k !== "period");
  return { keys, data: named };
}

export function calendarTransform({ data, query }) {
  if (query.period !== "day" || Object.keys(data).length < 1) {
    return null;
  }
  const key = Object.keys(data[0])[1];
  const res = data.map((i) => ({ day: i.period, value: i[key] }));
  const { day: first } = res[0];
  const { day: last } = res[res.length - 1];
  return { data: res, first, last };
}

export function pieTransform({ data, query }, info) {
  if (query.period !== "all") {
    return null;
  }
  const [named] = mapNames(data, info);
  const keys = Object.keys(named).filter((k) => k !== "period");
  return keys
    .reduce((a, k) => [...a, { id: k, value: named[k] }], [])
    .sort((a, b) => a.value - b.value);
}

export function bumpTransform({ data }, info) {
  const named = mapNames(data, info);
  const series = createSeries(named);
  const ranked = rank(series);
  return ranked;
}
