import Json from './Json'
import MultiSelect from './MultiSelect'
import DateRange from './DateRange'

// total
// time
// right
// wrong
// hard
// ok
// easy
// learn
// review
// relearn
// cram
// decks
// noteTypes
// tags
// TODO: add note
const selectors = [
  { id: 'total', name: 'Revision Count' },
  { id: 'time', name: 'Time Taken' },
  { id: 'right', name: 'Right' },
  { id: 'wrong', name: 'Wrong' },
  { id: 'hard', name: 'Hard' },
  { id: 'ok', name: 'OK' },
  { id: 'easy', name: 'Easy' },
  { id: 'learn', name: 'Learn' },
  { id: 'review', name: 'Review' },
  { id: 'relearn', name: 'Relearn' },
  { id: 'cram', name: 'Cram' },
  { id: 'decks', name: 'Deck Names' },
  { id: 'noteTypes', name: 'Note Types' },
  { id: 'tags', name: 'Tags' }
]

// deck
// card
// noteType
// note
// tag
// suspended --- TODO < special filters
// start
// end

function objectify (arr) {
  return arr.reduce((o, i) => ({ ...o, [i]: true }), {})
}

const BuildQuery = ({ state: { info, query }, actions: { updateQuery } }) => {
  return (
    <>
      - Selectors
      <div>
        <MultiSelect items={selectors} onChange={(i) => updateQuery({ select: objectify(i) })} />
      </div>
      - Filters
      <div>
        <MultiSelect items={info.tags} onChange={(i) => updateQuery({ filter: { tags: objectify(i) } })} />
        <MultiSelect items={info.decks} onChange={(i) => updateQuery({ filter: { dekcs: objectify(i) } })} />
        <MultiSelect items={info.noteTypes} onChange={(i) => updateQuery({ filter: { noteTypes: objectify(i) } })} />
        <DateRange start={info.firstRevision} end={info.lastRevision} onChange={((res = []) => {
          updateQuery({
            filter: {
              ...(res[0] && ({ start: res[0].valueOf() })),
              ...(res[1] && ({ end: res[1].valueOf() }))
            }
          })
        })} />
      </div>
    </>
  )
}

export default BuildQuery
