import { getRepository } from 'typeorm'
import { Revlog, Cards, Col, Notes } from '../schema'
import applyFilters from './filters'

const periods = {
  minute: '%Y-%m-%d-%H:%M',
  hour: '%Y-%m-%d-%H',
  week: '%Y-%m-%W',
  day: '%Y-%m-%d',
  month: '%Y-%m',
  year: '%Y'
}

const type = {
  new: '0',
  learning: '1',
  due: '2',
  relearning: '3'
}

const queue = {
  userBuried: '-3',
  buried: '-2',
  suspended: '-1',
  new: '0',
  learning: '1',
  due: '2',
  learningNew: '3'
}

function getTimeQuery (period) {
  return `strftime('${periods[period]}', id / 1000, 'unixepoch', 'localtime')`
}

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

// --- query options
// - filters
//
// SELECTS
// - fields
// standard fields ()
// ratio
// cardTypes
//
// GROUP BYS
// - grouping
// periods
//
// cumulative
// count
// flags
// queued (q >= 0)
//

export async function getRevisions (query: Query) {
  let q = getRepository(Revlog)
    .createQueryBuilder('revisions')
    .leftJoinAndSelect('revisions.card', 'card')
    .leftJoinAndSelect('card.note', 'note')

  applyFilters(q, {})

  q = q.limit(2)
  // SPECIFIC DECK
  // NOT SUSPENDED
  // .addSelect(time, period)
  // .groupBy(time)
  // .cache(true)
  const res = await q.getMany()
  // console.log(JSON.stringify(res, null, 2))
  return res
}
