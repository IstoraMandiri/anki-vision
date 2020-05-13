const fns = {
  count(q, key) {
    q = q.addSelect("COUNT(*)", key);
  },
  case(q, key, param) {
    q = q.addSelect(`COUNT(CASE WHEN ${param} then 1 ELSE NULL END)`, key);
  },
  many(q, key, params, info, options) {
    info[key].forEach(({ id }) => {
      if (
        options === true ||
        Object.keys(options).length === 0 ||
        options[id]
      ) {
        fns.case(q, `${key}_${id}`, `${params} = ${id}`);
      }
    });
  },
  sum(q, key) {
    q = q.addSelect(`SUM(revision.${key})`, key);
  },
  fuzzy(q, key, params, info, options) {
    const scanAll = options === true || Object.keys(options).length === 0;
    // we don't have a list of tags to search
    if (scanAll) {
      info[key].forEach(({ id }) => {
        q = q.addSelect(
          `COUNT(CASE WHEN ${params} LIKE '%${id}%' then 1 ELSE NULL END)`,
          `${key}_${id}`
        );
      });
    } else {
      Object.keys(options).forEach((id) => {
        q = q.addSelect(
          `COUNT(CASE WHEN ${params} LIKE '%${id}%' then 1 ELSE NULL END)`,
          `${key}_${id}`
        );
      });
    }
  },
};

export const selects: QueryConfig = {
  total: { type: "count", name: "Revision Count" },
  tags: { type: "fuzzy", params: "note.tags", name: "Tags" },
  decks: { type: "many", params: "card.deckId", name: "Deck Names" },
  noteTypes: { type: "many", params: "note.modelId", name: "Note Types" },
  time: { type: "sum", name: "Time Taken" },
  right: { type: "case", params: "revision.ease != 1", name: "Right" },
  wrong: { type: "case", params: "revision.ease = 1", name: "Wrong" },
  hard: {
    type: "case",
    params: "(revision.type = 1 AND revision.ease = 2)",
    name: "Hard",
  },
  // TODO check these are correct
  ok: {
    type: "case",
    params:
      "(revision.type = 1 AND revision.ease = 3) OR (revision.type != 1 AND revision.ease = 2)",
    name: "OK",
  },
  easy: {
    type: "case",
    params:
      "(revision.type = 1 AND revision.ease = 4) OR (revision.type != 1 AND revision.ease = 3)",
    name: "Easy",
  },
  learn: { type: "case", params: "revision.type = 0", name: "Learn" },
  review: { type: "case", params: "revision.type = 1", name: "Review" },
  relearn: { type: "case", params: "revision.type = 2", name: "Relearn" },
  cram: { type: "case", params: "revision.type = 3", name: "Cram" },
};

export default function applySelects(q, options = {} as QuerySelect, info) {
  (Object.keys(options) || []).forEach((key) => {
    const { type, params } = selects[key] || {};
    if (!type) {
      throw new Error(`No select operation for ${key}`);
    }
    fns[type](q, key, params, info, options[key]);
  });
}
