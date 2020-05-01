import { ResponsiveCalendar } from '@nivo/calendar'
import { useState } from 'react'

const filters = {
  reviews: { },
  seconds: { },
  learn: {
    fn: (d) => {
      const r = d.learn
      if (r > 25) {
        return 0
      } else {
        return r
      }
    }
  },
  review: { },
  relearn: { },
  cram: { },
  wrong: { },
  correct: { },
  ratio: {
    fn: (d) => {
      const r = d.correct / d.wrong
      if (r > 10) {
        return 0
      } else {
        return r
      }
    }
  }
}

const Heatmap = ({ data }) => {
  if (!data) { return null }
  const [filter, setFilter] = useState('review')
  const [first, last] = [data[0], data[data.length - 1]]
  const blocks = new Date(last.day).getFullYear() - new Date(first.day).getFullYear() + 1
  const height = blocks * 140
  const filtered = data.map(d => ({ day: d.day, value: filters[filter].fn ? filters[filter].fn(d) : d[filter] }))
  return (
    <>
      <select onChange={(e) => {
        setFilter(e.target.value)
      }}>
        {Object.keys(filters).map(f => <option key={f} value={f}>{f}</option>)}
      </select>
      <div style={{ height: `${height}px` }} >
        <ResponsiveCalendar
          data={filtered}
          from={first.day}
          to={last.day}
          emptyColor="#eeeeee"
          monthBorderColor="#ffffff"
          dayBorderWidth={2}
          dayBorderColor="#ffffff"
        />
      </div>
    </>
  )
}

export default Heatmap
