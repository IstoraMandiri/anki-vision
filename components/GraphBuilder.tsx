import Json from "./Json";
import MultiSelect from "./MultiSelect";
import DateRange from "./DateRange";
import { periods } from "../utils/periods";
import DropdownSelect from "./Dropdown";

import { selects } from "../utils/selects";
import { objectify } from "../utils/transforms";
import { Button } from "antd";
const selectors = Object.keys(selects).map((id) => ({ ...selects[id], id }));

const BuildQuery = ({ state, actions, graph, setGraph }) => {
  const { info, query } = state;
  const { updateQuery, runQuery } = actions;
  const { graphTypes, type } = graph;
  return (
    <>
      <h3>Presets</h3>
      <p>Don't forget the presets!</p>
      <h3>Custom Query</h3>
      <MultiSelect
        name="Selectors"
        items={selectors}
        onChange={(i) => updateQuery({ select: objectify(i) })}
      />
      <MultiSelect
        name="Tags"
        items={info.tags}
        onChange={(i) => updateQuery({ filter: { tags: objectify(i) } })}
      />
      <MultiSelect
        name="Decks"
        items={info.decks}
        onChange={(i) => updateQuery({ filter: { decks: objectify(i) } })}
      />
      <MultiSelect
        name="Note Types"
        items={info.noteTypes}
        onChange={(i) => updateQuery({ filter: { noteTypes: objectify(i) } })}
      />
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
      <DropdownSelect
        items={periods}
        selected={query.period}
        onChange={(period) => updateQuery({ period })}
      />
      <DropdownSelect items={graphTypes} selected={type} onChange={(type) => setGraph({ type })} />
      <br />
      <Button onClick={runQuery}>Let's Go!</Button>
    </>
  );
};

export default BuildQuery;
