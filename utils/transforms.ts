import type { Col } from '../schema'

export function colToCollectionInfo (col: Col): CollectionInfo {
  return {
    decks: Object.values(col.decks).map(({ id, name }) => ({ id, name })),
    tags: Object.keys(col.tags).map(t => ({ id: t, name: t })),
    noteTypes: Object.values(col.noteTypes).map(({ id, name }) => ({ id, name }))
  }
}
