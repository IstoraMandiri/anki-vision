import presets from "../utils/presets";

import Dropdown from "./Dropdown";

const QueryPresets = ({ onChange }) => {
  return <Dropdown items={presets} selected={0} onChange={(k) => onChange(presets[k].data)} />;
};

export default QueryPresets;
