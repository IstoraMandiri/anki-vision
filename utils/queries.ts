import { getRepository } from 'typeorm'
import { Revlog, Cards, Col, Notes } from '../schema'
import applyFilters from './filters'
import applySelects from './selects'
import getTimeQuery from './periods'

async function first (Repo, field) {
  return (await getRepository(Repo).createQueryBuilder().select(field).orderBy(field).limit(1).getRawOne())[field]
}

async function last (Repo, field) {
  return (await getRepository(Repo).createQueryBuilder().select(field).orderBy(field, 'DESC').limit(1).getRawOne())[field]
}

async function count (Repo): Promise<number> {
  return (await getRepository(Repo).createQueryBuilder().select('COUNT(*)', 'count').getRawOne()).count
}

export async function getCollectionInfo () {
  const col = await getRepository(Col).createQueryBuilder().getOne()
  // console.log(col)
  return {
    cards: await count(Cards),
    revisions: await count(Revlog),
    notes: await count(Notes),
    firstRevision: await first(Revlog, 'id'),
    lastRevision: await last(Revlog, 'id'),
    decks: Object.values(col.decks).map(({ id, name }) => ({ id, name })),
    tags: Object.keys(col.tags).map(t => ({ id: t, name: t })),
    noteTypes: Object.values(col.noteTypes).map(({ id, name }) => ({ id, name }))
  }
}

export async function getRevisions ({ query, info }) {
  const { period = 'month', limit = 1000 } = query
  const timeStr = getTimeQuery(period)

  let q = getRepository(Revlog)
    .createQueryBuilder('revision')
    .leftJoin('revision.card', 'card')
    .leftJoin('card.note', 'note')
    .select(timeStr, period)

  applySelects(q, query.select, info)
  applyFilters(q, query.filter)

  q = q.groupBy(timeStr).limit(limit).cache(true)

  const res = await q.getRawMany()

  return res
}
