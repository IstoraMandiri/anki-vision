import {
  lineTransform,
  barTransform,
  calendarTransform,
  pieTransform,
  bumpTransform,
} from "./transforms";

import Line from "../components/charts/Line";
import Bar from "../components/charts/Bar";
import Calendar from "../components/charts/Calendar";
import Pie from "../components/charts/Pie";
import Bump from "../components/charts/Bump";

export default {
  line: { Comp: Line, transform: lineTransform, name: "Line" },
  bar: { Comp: Bar, transform: barTransform, name: "Bar" },
  calendar: { Comp: Calendar, transform: calendarTransform, name: "Calendar" },
  pie: { Comp: Pie, transform: pieTransform, name: "Pie" },
  bump: { Comp: Bump, transform: bumpTransform, name: "Bump" },
  // TODO: add other nivo types
  // area bump
  // bubble
  // bullet
  // scatter
  // stream
  // sunburst
  // swarm plot
  // tree map
  // waffle
};
