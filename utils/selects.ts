const fns = {
  count (q, key) {
    q = q.addSelect('COUNT(*)', key)
  },
  case (q, key, param) {
    q = q.addSelect(`COUNT(CASE WHEN ${param} then 1 ELSE NULL END)`, key)
  },
  many (q, key, params, info, options) {
    info[key].forEach(({ id }) => {
      if (options === true || options[id]) {
        fns.case(q, `${key}_${id}`, `${params} = ${id}`)
      }
    })
  },
  sum (q, key) {
    q = q.addSelect(`SUM(${key})`, key)
  },
  fuzzy (q, key, params, info, options) {
    info[key].forEach(({ id }) => {
      if (options === true || options[id]) {
        q = q.addSelect(`COUNT(CASE WHEN ${params} LIKE '% ${id} %' then 1 ELSE NULL END)`, `${key}_${id}`)
      }
    })
  }
}

const config: QueryConfig = {
  total: { type: 'count' },
  time: { type: 'sum' },
  right: { type: 'case', params: 'revision.ease != 1' },
  wrong: { type: 'case', params: 'revision.ease = 1' },
  hard: { type: 'case', params: '(revision.type = 1 AND revision.ease = 2)' },
  ok: { type: 'case', params: '(revision.type = 1 AND revision.ease = 3) OR (revision.type != 1 AND revision.ease = 2)' },
  easy: { type: 'case', params: '(revision.type = 1 AND revision.ease = 4) OR (revision.type != 1 AND revision.ease = 3)' },
  learn: { type: 'case', params: 'revision.type = 0' },
  review: { type: 'case', params: 'revision.type = 1' },
  relearn: { type: 'case', params: 'revision.type = 2' },
  cram: { type: 'case', params: 'revision.type = 3' },
  decks: { type: 'many', params: 'card.deckId' },
  noteTypes: { type: 'many', params: 'note.modelId' },
  tags: { type: 'fuzzy', params: 'note.tags' }
}

export default function applySelects (q, options = {} as QuerySelect, info) {
  (Object.keys(options) || []).forEach(key => {
    const { type, params } = config[key] || {}
    if (!type) {
      throw new Error(`No select operation for ${key}`)
    }
    fns[type](q, key, params, info, options[key])
  })
}
