import { DatePicker } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;

const DateRange = ({ start, end, onChange }) => {
  const s = moment(start);
  const e = moment(end);
  return (
    <RangePicker
      allowClear
      style={{ width: "100%" }}
      allowEmpty={[true, true]}
      defaultPickerValue={[s, e]}
      disabledDate={(current) => current.isBefore(s) || current.isAfter(e)}
      onChange={onChange}
    />
  );
};

export default DateRange;

// allowEmpty
