import { Row, Col } from "antd";
import MultiSelect from "./MultiSelect";

function mergeFilters(updated = [], original = {}, bool) {
  const update = {};
  // remove existing of current bools
  Object.keys(original).forEach((k) => {
    if (original[k] !== bool || updated.indexOf(k) > -1) {
      update[k] = original[k];
    }
  });
  updated.forEach((k) => {
    update[k] = bool;
  });
  return update;
}

const FilterSelect = ({ text, id, info, query, updateQuery }) => {
  return (
    <Row gutter={[5, 5]}>
      <Col span={12}>
        <MultiSelect
          name={`Include ${text}`}
          color="green"
          items={info[id]}
          selected={Object.keys(query.filter[id] || {}).filter(
            (k) => query.filter[id][k] === true
          )}
          onChange={(items) =>
            updateQuery({
              filter: { [id]: mergeFilters(items, query.filter[id], true) },
            })
          }
        />
      </Col>
      <Col span={12}>
        <MultiSelect
          name={`Exclude ${text}`}
          color="red"
          items={info[id]}
          selected={Object.keys(query.filter[id] || {}).filter(
            (k) => query.filter[id][k] === false
          )}
          onChange={(items) =>
            updateQuery({
              filter: { [id]: mergeFilters(items, query.filter[id], false) },
            })
          }
        />
      </Col>
    </Row>
  );
};

export default FilterSelect;
