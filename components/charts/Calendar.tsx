import { ResponsiveCalendar } from "@nivo/calendar";

const Calendar = ({ data: { data, first, last } }) => {
  if (!data) {
    return null;
  }
  console.log("rendering the calendar");
  return (
    <ResponsiveCalendar
      data={data}
      from={first}
      to={last}
      emptyColor="#eeeeee"
      monthBorderColor="#ffffff"
      dayBorderWidth={2}
      dayBorderColor="#ffffff"
    />
  );
};

export default Calendar;
