import { Select, Tag } from "antd";
import { objectify, arrayify } from "../utils/transforms";
import { LabeledValue } from "antd/lib/select";

const { Option } = Select;

const renderOption = ({ id, name }) => (
  <Option value={`${id}`} key={`${id}`}>
    {name}
  </Option>
);

function renderTag(props, color) {
  const { label, value, closable, onClose } = props;

  return (
    <Tag color={color} closable={closable} onClose={onClose}>
      {label}
    </Tag>
  );
}

const MultiSelect = ({ name, items, onChange, color = "none", selected = [] }) => {
  return (
    <Select
      allowClear
      placeholder={name}
      mode="tags"
      value={selected}
      tagRender={color !== "none" && ((props) => renderTag(props, color))}
      onChange={onChange}
      style={{ width: "100%" }}
    >
      {items.map(renderOption)}
    </Select>
  );
};

export default MultiSelect;
