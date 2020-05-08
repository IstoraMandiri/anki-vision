import { ResponsiveCalendar } from '@nivo/calendar'

const Calendar = ({ data: { data, first, last } }) => {
  if (!data) { return null }
  return (
    <div style={{ height: '500px' }} >
      <ResponsiveCalendar
        data={data}
        from={first}
        to={last}
        emptyColor="#eeeeee"
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
      />
    </div>
  )
}

export default Calendar
