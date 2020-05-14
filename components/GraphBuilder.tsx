import MultiSelect from "./MultiSelect";
import DateRange from "./DateRange";
import { periods } from "../utils/periods";
import DropdownSelect from "./Dropdown";

import { selects } from "../utils/selects";
import { objectify } from "../utils/transforms";
import { Button, Divider, Row, Col } from "antd";
import FilterSelect from "./FilterSelect";

const selectors = Object.keys(selects).map((id) => ({ ...selects[id], id }));

const BuildQuery = ({ state, actions, setShowMenu, showMenu }) => {
  const { info, query, presets, graphs, graph } = state;
  const { updateQuery, runQuery, usePreset, setGraph } = actions;
  return (
    <div
      style={{
        position: "absolute",
        display: !showMenu && "none",
        zIndex: 2,
        top: 15,
        right: 15,
        width: "400px",
        maxWidth: "90%",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,.9)",
          border: "1px solid rgba(0,0,0,0.1)",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            maxHeight: "40vh",
            overflowY: "scroll",
            overflowX: "visible",
            padding: "0 10px 20px 10px",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 90%, transparent 100%)",
          }}
        >
          <Divider orientation="left">Presets</Divider>
          <DropdownSelect
            selected={presets.selected}
            defaultText="Select Preset"
            items={presets.available}
            onChange={usePreset}
          />
          <Divider orientation="left">Graph Settings</Divider>
          <DropdownSelect
            items={graphs}
            selected={graph.type}
            onChange={(type) => setGraph({ type })}
          />
          <Divider orientation="left">Data</Divider>
          <MultiSelect
            name="Select Data Types"
            items={selectors}
            selected={Object.keys(query.select)}
            onChange={(select) => updateQuery({ select: objectify(select) })}
          />
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
          <Divider orientation="left">Filters</Divider>
          <FilterSelect
            text="Tags"
            id="tags"
            {...{ query, info, updateQuery }}
          />
          <FilterSelect
            text="Decks"
            id="decks"
            {...{ query, info, updateQuery }}
          />
          <FilterSelect
            text="Note Types"
            id="noteTypes"
            {...{ query, info, updateQuery }}
          />
        </div>
      </div>
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
    </div>
  );
};

export default BuildQuery;
