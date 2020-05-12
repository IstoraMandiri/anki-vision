import Json from "./Json";
import MultiSelect from "./MultiSelect";
import DateRange from "./DateRange";
import { periods } from "../utils/periods";
import DropdownSelect from "./Dropdown";

import { selects } from "../utils/selects";
import { objectify } from "../utils/transforms";
import { Button, Divider, Row, Col, Space } from "antd";
import QueryPresets from "./QueryPresets";
import FilterSelect from "./FilterSelect";

const selectors = Object.keys(selects).map((id) => ({ ...selects[id], id }));

const BuildQuery = ({ state, actions, graph, setGraph, setShowMenu }) => {
  const { info, query } = state;
  const { updateQuery, runQuery } = actions;
  const { graphTypes, type } = graph;
  return (
    <>
      <Divider orientation="left">Presets</Divider>
      <QueryPresets
        onChange={({ query, graph }) => {
          setShowMenu(false);
          setGraph(graph);
          runQuery(query);
        }}
      />
      <Divider orientation="left">Graph Settings</Divider>
      <DropdownSelect items={graphTypes} selected={type} onChange={(type) => setGraph({ type })} />
      <Divider orientation="left">Data</Divider>
      <MultiSelect
        name="Select Data Types"
        items={selectors}
        selected={Object.keys(query.select)}
        onChange={(select) => updateQuery({ select: objectify(select) })}
      />
      <Divider orientation="left">Filters</Divider>
      <FilterSelect text="Tags" id="tags" {...{ query, info, updateQuery }} />
      <FilterSelect text="Decks" id="decks" {...{ query, info, updateQuery }} />
      <FilterSelect text="Note Types" id="noteTypes" {...{ query, info, updateQuery }} />
      <Divider orientation="left">Date Range</Divider>
      <Row gutter={[5, 5]}>
        <Col flex="auto">
          <DateRange
            start={info.firstRevision}
            end={info.lastRevision}
            onChange={(_res) => {
              const res = _res || [];
              updateQuery({
                filter: {
                  time: {
                    ...(res[0] && { start: res[0].valueOf() }),
                    ...(res[1] && { end: res[1].valueOf() }),
                  },
                },
              });
            }}
          />
        </Col>
        <Col>
          <DropdownSelect
            items={periods}
            selected={query.period}
            onChange={(period) => updateQuery({ period })}
          />
        </Col>
      </Row>
      <Divider />
      <Button
        block
        size="large"
        type="primary"
        onClick={() => {
          setShowMenu(false);
          runQuery();
        }}
      >
        Run Query
      </Button>
    </>
  );
};

export default BuildQuery;
