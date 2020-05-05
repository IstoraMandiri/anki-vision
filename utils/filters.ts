import { Brackets } from 'typeorm'
import Counter from './counter'

const c = new Counter() // hack to workaround TypeORM bug

function split (items, { add, not }) {
  const res = { add: [], not: [] }
  Object.keys(items).forEach(k => {
    if (items[k]) {
      res.add.push(k)
    } else {
      res.not.push(k)
    }
  })
  if (res.add.length) {
    add(res.add)
  }
  if (res.not.length) {
    not(res.not)
  }
}

function fuzz (q, to, items, operator) {
  q = q.andWhere(new Brackets(qb => {
    const [first, ...rest] = items
    const i = c.c()
    let q2 = qb.where(`${to} ${operator} :${i}`, { [i]: `% ${first} %` })
    rest.forEach(item => {
      const i = c.c()
      q2 = q2.orWhere(`${to} ${operator} :${i}`, { [i]: `% ${item} %` })
    })
  }))
}

const fns = {
  standard: (q, val, { operator, to }) => {
    const i = c.c()
    q = q.andWhere(`${to} ${operator} :${i}`, { [i]: val })
  },
  boolean: (q, val, { on, off, to, value }) => {
    const i = c.c()
    q = q.andWhere(`${to} ${val ? on : off} :${i}`, { [i]: value })
  },
  fuzzy: (q, items, to) => {
    split(items, {
      add: (i) => fuzz(q, to, i, 'LIKE'),
      not: (i) => fuzz(q, to, i, 'NOT LIKE')
    })
  },
  array: (q, items, to) => {
    split(items, {
      add: (i2) => {
        const i = c.c()
        q = q.andWhere(`${to} IN (:...${i})`, { [i]: i2 })
      },
      not: (i2) => {
        const i = c.c()
        q = q.andWhere(`${to} NOT IN (:...${i})`, { [i]: i2 })
      }
    })
  },
  time: (q, items) => {
    Object.keys(items).forEach(i => {
      fns.standard(q, items[i], { to: 'revision.id', operator: i === 'start' ? '>' : '<' })
    })
  }
}

const config: QueryConfig = {
  decks: { type: 'array', params: 'card.deckId' },
  cards: { type: 'array', params: 'cardId' },
  noteTypes: { type: 'array', params: 'note.modelId' },
  notes: { type: 'array', params: 'card.nodeId' },
  tags: { type: 'fuzzy', params: 'note.tags' },
  suspended: { type: 'boolean', params: { to: 'card.queue', off: '>', on: '<=', value: '-1' } },
  time: { type: 'time' }
}

export default function applyFilters (q, filters = {} as QueryFilter) {
  Object.keys(filters).forEach(f => {
    const c = config[f]
    if (!c) {
      throw new Error(`No filter operation for ${f}`)
    }
    fns[c.type](q, filters[f], c.params)
  })
}
