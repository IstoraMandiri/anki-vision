import Json from './Json'
import MultiSelect from './MultiSelect'
import DateRange from './DateRange'
import PeriodSelect from './PeriodSelect'

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

// suspended --- TODO < special filters

function objectify (arr) {
  return arr.reduce((o, i) => ({ ...o, [i.key]: true }), {})
}

const BuildQuery = ({ state: { info, query }, actions: { updateQuery, runQuery } }) => {
  return (
    <>
      - Selectors
      <div>
        <MultiSelect name="Selectors" items={selectors} onChange={(i) => updateQuery({ select: objectify(i) })} />
      </div>
      - Filters
      <div>
        <MultiSelect name="Tags" items={info.tags} onChange={(i) => updateQuery({ filter: { tags: objectify(i) } })} />
        <MultiSelect name="Decks" items={info.decks} onChange={(i) => updateQuery({ filter: { decks: objectify(i) } })} />
        <MultiSelect name="Note Types" items={info.noteTypes} onChange={(i) => updateQuery({ filter: { noteTypes: objectify(i) } })} />
        <DateRange start={info.firstRevision} end={info.lastRevision} onChange={((_res) => {
          const res = _res || []
          updateQuery({
            filter: {
              time: {
                ...(res[0] && ({ start: res[0].valueOf() })),
                ...(res[1] && ({ end: res[1].valueOf() }))
              }
            }
          })
        })} />
        <PeriodSelect period={query.period} onChange={(period) => updateQuery({ period })} />
        <hr/>
        <button onClick={runQuery}>Run!</button>
      </div>
    </>
  )
}

export default BuildQuery
