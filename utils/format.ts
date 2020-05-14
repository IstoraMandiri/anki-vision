import { timeFormat } from "d3-time-format";

export function formatDate(fmt, date) {
  return timeFormat(fmt)(date);
}
