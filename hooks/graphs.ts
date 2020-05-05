import { useState } from 'react'
import useQuery from './query'

import { ResponsiveLine } from '@nivo/line'
import { ResponsiveCalendar } from '@nivo/calendar'
import { ResponsiveBar } from '@nivo/bar'

const graphTypes = {
  line: { Comp: ResponsiveLine },
  calendar: { Comp: ResponsiveCalendar },
  bar: { Comp: ResponsiveBar }
}

export default function useGraphs (queryResult) {
  // const [graph, setGraph] = useState()

  // const actions = {
  //   ...queryActions
  // }

  // return [{ query, info, result, graph }, actions]
}
